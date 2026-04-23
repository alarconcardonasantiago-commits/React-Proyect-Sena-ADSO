import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard/ProductCard'
import SearchBar from '../Components/SearchBar/SearchBar'
import ProductModal from '../Components/ProductModal/ProductModal'
import styles from './Productos.module.css'
import { useCart } from '../context/CartContext'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [isGrid, setIsGrid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  const { addToCart } = useCart()
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const PRODUCTS_PER_PAGE = 12

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const location = useLocation()
  const navigate = useNavigate()
  
  const categorias = ['Todos', 'Cuerdas', 'Viento', 'Percusión', 'Electrónicos']

  const toggleLayout = () => setIsGrid(!isGrid)

  // 1. Leer parámetro de URL al montar o cambiar
  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const catParam = params.get('categoria');
      if (catParam && categorias.includes(catParam)) {
          setSelectedCategory(catParam);
      } else {
          setSelectedCategory('Todos');
      }
  }, [location.search]);

  // 2. Función para cambiar categoría (actualiza URL)
  const handleCategoryChange = (categoria) => {
      setSelectedCategory(categoria);
      setCurrentPage(1); // Reset page on category change
      if (categoria === 'Todos') {
          navigate('/Productos');
      } else {
          navigate(`/Productos?categoria=${categoria}`);
      }
  };

  const [searchQuery, setSearchQuery] = useState('')

  // 🔹 Función principal de carga (con spinner inteligente)
  const fetchProductos = async (query = searchQuery, page = currentPage, category = selectedCategory) => {
    try {
      const isSearch = query.trim() !== ''
      if (!isSearch) setLoading(true)
      setError(null)

      const spinnerTimer = setTimeout(() => setShowSpinner(true), 400)
      const BASE = import.meta.env.VITE_API_URL || 'https://api-inventario-onxl.onrender.com/api'
      
      // Siempre usamos /buscar ya que soporta todos los filtros y paginación global
      let url = `${BASE}/productos/buscar?page=${page}&limit=${PRODUCTS_PER_PAGE}`
      
      if (query.trim() !== '') {
        url += `&nombre=${encodeURIComponent(query)}`
      }
      if (category !== 'Todos') {
        url += `&tipo=${encodeURIComponent(category)}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
      const data = await res.json()

      clearTimeout(spinnerTimer)
      setShowSpinner(false)
      
      if (data.datos) {
        setProductos(data.datos)
        setTotalPages(data.totalPages)
      } else {
        setProductos(Array.isArray(data) ? data : [])
        setTotalPages(1)
      }
    } catch (err) {
      console.error('❌ Error al obtener productos:', err)
      setError(err.message)
      setShowSpinner(false)
    } finally {
      setLoading(false)
    }
  }

  // Ejecutar búsqueda cuando el usuario escribe (viene del SearchBar)
  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset a la primera página al buscar
  }, [])

  // 🔸 Cargar productos cada vez que cambie la página, la categoría o la búsqueda
  useEffect(() => {
    fetchProductos(searchQuery, currentPage, selectedCategory)
  }, [currentPage, selectedCategory, searchQuery])

  // Ya no filtramos localmente, el backend devuelve los productos correctos
  const visibleProducts = productos

  const handleViewProduct = (product) => {
    // Pasar el producto entero
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1).replace(/\.0$/, '')}M`
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1).replace(/\.0$/, '')}K`
    }
    return `$${price.toLocaleString()}`
  }

  const renderPagination = () => {
    if (loading || totalPages <= 1) return null;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button 
          className={styles.pageButton} 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        
        <div className={styles.pageNumbers}>
          {pages}
        </div>
        
        <button 
          className={styles.pageButton} 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      {/* 🔍 Barra de búsqueda arriba */}
      <div className={styles.searchSection}>
        <SearchBar onSearch={handleSearch} placeholder="Buscar productos..." delay={500} />
      </div>

      {/* Header Controls: Filters + View Switcher */}
      <div className={styles.headerControls}>
        <div className={styles.filters}>
            {categorias.map(cat => (
                <button
                    key={cat}
                    className={`${styles.filterChip} ${selectedCategory === cat ? styles.active : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>

        <button onClick={toggleLayout} className={styles.viewSwitcher} title={isGrid ? "Vista de lista" : "Vista de cuadrícula"}>
          {isGrid ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          )}
        </button>
      </div>

      {/* ⚠️ Mensaje de error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Paginación Superior */}
      {renderPagination()}

      {/* 🧱 Contenedor de productos */}
      <div className={`${isGrid ? styles.gridLayout : styles.listLayout} ${loading ? styles.loadingState : ''}`}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((p) => (
            <ProductCard
              key={p.id_producto}
              productImage="https://placehold.co/300"
              productName={p.nombre}
              productDescription={p.tipo || 'Sin descripción'}
              productPrice={p.precio}
              formattedPrice={formatPrice(p.precio)}
              layout={isGrid ? 'grid' : 'horizontal'}
              onView={() => handleViewProduct(p)}
              onAddToCart={() => addToCart(p)}
            />
          ))
        ) : (
          !loading && <p className={styles.noResults}>No se encontraron productos en esta categoría.</p>
        )}
      </div>

      {/* 🔁 Spinner inteligente */}
      {showSpinner && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <span>Cargando...</span>
        </div>
      )}

      {/* Paginación Inferior */}
      {renderPagination()}

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  )
}

export default Productos
