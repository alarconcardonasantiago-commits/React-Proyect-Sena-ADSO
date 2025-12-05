import React from 'react';
import styles from './ProductModal.module.css';

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                
                <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.title} className={styles.image} />
                </div>
                
                <div className={styles.content}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <p className={styles.price}>{product.price}</p>
                    
                    <div className={styles.description}>
                        <h3>Descripción</h3>
                        <p>{product.content}</p>
                    </div>
                    
                    <div className={styles.actions}>
                        <button className={styles.addToCartBtn}>Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
