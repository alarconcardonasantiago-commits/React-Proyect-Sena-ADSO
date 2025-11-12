import React, { useState, useEffect } from 'react'
import ProductCard from '../Components/ProductCard/ProductCard'
import SearchBar from '../Components/SearchBar/SearchBar'
import styles from './Productos.module.css'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [isGrid, setIsGrid] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const toggleLayout = () => setIsGrid(!isGrid)

  const fetchProductos = async (query = '') => {
    try {
      setLoading(true)
      let url = 'http://localhost:3000/api/productos'

      if (query.trim() !== '') {
        url = `http://localhost:3000/api/productos/buscar?nombre=${encodeURIComponent(query)}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
      const data = await res.json()
      setProductos(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar: {error}</p>

  return (
    <div className={styles.page}>
      {/* 🔍 Usamos el nuevo componente */}
      <SearchBar onSearch={fetchProductos} placeholder="Buscar productos..." />

      <div className={styles.controls}>
        <button onClick={toggleLayout} className={styles.toggleBtn}>
          Cambiar a {isGrid ? 'vista horizontal' : 'vista cuadrícula'}
        </button>
      </div>

      <div className={isGrid ? styles.gridLayout : styles.listLayout}>
        {productos.length > 0 ? (
          productos.map((p) => (
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
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  )
}

export default Productos
