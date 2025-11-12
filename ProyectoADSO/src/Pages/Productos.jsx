import React from 'react';
import styles from './Productos.module.css';
import Card from '../Components/Card/Card';
import AppBox from '../Components/appBox/appBox';
import ProductCard from '../Components/ProductCard/ProductCard.jsx';

const Productos = () => {
    return (
        <div>
            <div className={styles.searchContainer}>
                <searchbar className={styles.searchbar}>
                    <input className={styles.text } type="text" placeholder="Buscar productos..." />   
                </searchbar>
                <button className={styles.btnBuscar}>🔍</button> 
            </div>

            <h1>Productos</h1>
            <p>Página de productos en construcción.</p>

            <div className={styles.productContainer}>
                    <ProductCard 
                        productImage="https://placehold.co/125" 
                        productName="Producto de prueba" 
                        productDescription="Esta es una descripción de prueba para el producto." 
                        productPrice={150000} 
                    />
            </div>
        </div>
    );
}

export default Productos;