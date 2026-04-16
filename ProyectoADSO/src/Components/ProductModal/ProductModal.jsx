import React from 'react';
import styles from './ProductModal.module.css';
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useCart();
    
    if (!product) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                
                <div className={styles.imageContainer}>
                    <img src={product.imagen || product.image || "https://placehold.co/400"} alt={product.nombre || product.title} className={styles.image} />
                </div>
                
                <div className={styles.content}>
                    <h2 className={styles.title}>{product.nombre || product.title}</h2>
                    <p className={styles.price}>${(product.precio || 0).toLocaleString('es-CO')}</p>
                    
                    <div className={styles.description}>
                        <h3>Descripción</h3>
                        <p>{product.descripcion || product.content || product.tipo}</p>
                    </div>
                    
                    <div className={styles.actions}>
                        <button className={styles.addToCartBtn} onClick={() => {
                            addToCart({
                                ...product,
                                // Forzar las propiedades si viene del Home
                                id_producto: product.id_producto || product.id,
                                nombre: product.nombre || product.title,
                                precio: parseFloat(product.precio) || 0
                            });
                            onClose();
                        }}>Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
