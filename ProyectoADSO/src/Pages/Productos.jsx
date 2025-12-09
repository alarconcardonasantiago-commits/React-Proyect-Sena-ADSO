import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard/ProductCard'
import SearchBar from '../Components/SearchBar/SearchBar'
import ProductModal from '../Components/ProductModal/ProductModal'
import styles from './Productos.module.css'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [isGrid, setIsGrid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(12)
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
      setVisibleCount(PRODUCTS_PER_PAGE); // Reset scroll on category change
      if (categoria === 'Todos') {
          navigate('/Productos');
      } else {
          navigate(`/Productos?categoria=${categoria}`);
      }
  };

  // 🔹 Función principal de carga (con spinner inteligente)
  const fetchProductos = async (query = '') => {
    try {
      // Solo mostramos loading si es la carga inicial o si cambiamos de categoría, no en búsqueda en vivo
      // Para búsqueda, usamos el spinner pero mantenemos la lista visible sin opacidad
      const isSearch = query.trim() !== ''
      
      if (!isSearch) {
          setLoading(true)
      }
      
      setError(null)

      // ⏳ Timer: solo mostramos el spinner si la petición tarda más de 400 ms
      const spinnerTimer = setTimeout(() => setShowSpinner(true), 400)

      let url = 'http://localhost:3000/api/productos'
      if (query.trim() !== '') {
        url = `http://localhost:3000/api/productos/buscar?nombre=${encodeURIComponent(query)}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
      const data = await res.json()

      clearTimeout(spinnerTimer)
      setShowSpinner(false)
      setProductos(data)
    } catch (err) {
      console.error('❌ Error al obtener productos:', err)
      setError(err.message)
      setShowSpinner(false)
    } finally {
      setLoading(false)
    }
  }

  // 🔸 Cargar productos al montar
  useEffect(() => {
    fetchProductos()
  }, [])

  // Infinite Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. Filtrar productos según la categoría seleccionada
  const productosFiltrados = productos.filter(producto => {
      if (selectedCategory === 'Todos') return true;
      return producto.tipo === selectedCategory || producto.categoria === selectedCategory;
  });

  const visibleProducts = productosFiltrados.slice(0, visibleCount)

  const handleViewProduct = (product) => {
    // Map product data to modal format
    setSelectedProduct({
        image: "https://placehold.co/400", // Placeholder for now as API might not return image URL yet
        title: product.nombre,
        price: `$${product.precio.toLocaleString()}`,
        content: product.descripcion || product.tipo || 'Sin descripción disponible.'
    })
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

  return (
    <div className={styles.page}>
      {/* 🔍 Barra de búsqueda arriba */}
      <div className={styles.searchSection}>
        <SearchBar onSearch={fetchProductos} placeholder="Buscar productos..." delay={500} />
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

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  )
}

export default Productos
