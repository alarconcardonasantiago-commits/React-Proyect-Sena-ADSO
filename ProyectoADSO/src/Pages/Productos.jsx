import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard/ProductCard'
import SearchBar from '../Components/SearchBar/SearchBar'
import styles from './Productos.module.css'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [isGrid, setIsGrid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
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
      if (categoria === 'Todos') {
          navigate('/Productos');
      } else {
          navigate(`/Productos?categoria=${categoria}`);
      }
  };

  // 🔹 Función principal de carga (con spinner inteligente)
  const fetchProductos = async (query = '') => {
    try {
      setLoading(true)
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

  // 3. Filtrar productos según la categoría seleccionada
  const productosFiltrados = productos.filter(producto => {
      if (selectedCategory === 'Todos') return true;
      return producto.tipo === selectedCategory || producto.categoria === selectedCategory;
  });

  return (
    <div className={styles.page}>
      {/* 🔍 Barra de búsqueda con debounce aumentado */}
      <SearchBar onSearch={fetchProductos} placeholder="Buscar productos..." delay={800} />

      {/* Filtros de Categoría */}
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

      <div className={styles.controls}>
        <button onClick={toggleLayout} className={styles.toggleBtn}>
          Cambiar a {isGrid ? 'vista horizontal' : 'vista cuadrícula'}
        </button>
      </div>

      {/* ⚠️ Mensaje de error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* 🧱 Contenedor de productos */}
      <div className={`${isGrid ? styles.gridLayout : styles.listLayout} ${loading ? styles.loadingState : ''}`}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((p) => (
            <ProductCard
              key={p.id_producto}
              productImage="https://placehold.co/125"
              productName={p.nombre}
              productDescription={p.tipo || 'Sin descripción'}
              productPrice={p.precio}
              layout={isGrid ? 'grid' : 'horizontal'}
            />
          ))
        ) : (
          !loading && <p>No se encontraron productos en esta categoría.</p>
        )}
      </div>

      {/* 🔁 Spinner inteligente */}
      {showSpinner && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <span>Cargando...</span>
        </div>
      )}
    </div>
  )
}

export default Productos
