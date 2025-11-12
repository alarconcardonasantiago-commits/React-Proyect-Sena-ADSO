import React, { useState } from 'react'
import ProductCard from '../Components/ProductCard/ProductCard'
import styles from './Productos.module.css'

const Productos = () => {
  const [isGrid, setIsGrid] = useState(false)

  const toggleLayout = () => setIsGrid(!isGrid)

  return (
    
    <div className={styles.page}>
          <div className={styles.searchContainer}>
                <searchbar className={styles.searchbar}>
                    <input className={styles.text } type="text" placeholder="Buscar productos..." />   
                </searchbar>
                <button className={styles.btnBuscar}>🔍</button> 
            </div>

      <div className={styles.controls}>
        <button onClick={toggleLayout} className={styles.toggleBtn}>
          Cambiar a {isGrid ? 'vista horizontal' : 'vista cuadrícula'}
        </button>
      </div>

      <div className={isGrid ? styles.gridLayout : styles.listLayout}>
        <ProductCard
          productImage="https://placehold.co/125"
          productName="Guitarra eléctrica"
          productDescription="Sonido potente y diseño clásico."
          productPrice={750000}
          layout={isGrid ? 'grid' : 'horizontal'}
        />

        <ProductCard
          productImage="https://placehold.co/125"
          productName="Teclado Yamaha"
          productDescription="Ideal para principiantes y profesionales."
          productPrice={950000}
          layout={isGrid ? 'grid' : 'horizontal'}
        />
      </div>
    </div>
  )
}

export default Productos
