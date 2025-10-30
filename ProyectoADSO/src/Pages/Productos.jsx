import React from 'react';
import styles from './Productos.module.css';
import Card from '../Components/Card/Card';
import AppBox from '../Components/appBox/appBox';

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

                    <AppBox className={styles.productCard}>
                        <span>
                            <img src="https://placehold.co/125" alt="Producto 1" />
                            <span className=''> Descripción del Producto 1 </span>
                            <span className='precio'> Precio: 100.000$ </span>
                        </span>
                    </AppBox>
                    <AppBox className={styles.productCard}>
                        <span>
                            <img src="https://placehold.co/125" alt="Producto 2" />
                            <span>Descripción del Producto 2</span>
                            <span className='precio'> Precio: 100.000$ </span>
                        </span>
                    </AppBox>
                    <AppBox className={styles.productCard}>
                        <span>
                            <img src="https://placehold.co/125" alt="Producto 3" />
                            <span>Descripción del Producto 3</span>
                            <span className='precio'> Precio: 100.000$ </span>
                        </span>
                    </AppBox>
            </div>
        </div>
    );
}

export default Productos;
