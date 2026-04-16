import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';
import { fetchWithAuth } from '../../utils/api';

const Cart = () => {
    const { 
        cart, 
        isCartOpen, 
        toggleCart, 
        removeFromCart, 
        updateQuantity, 
        cartTotal,
        clearCart 
    } = useCart();

    if (!isCartOpen) return null;

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        
        try {
            // Lógica de integración con la API para POST /ventas
            const payload = {
                // El backend debería tomar el id del cliente del Token JWT
                detalles: cart.map(item => ({
                    id_producto: item.id_producto || item.id,
                    cantidad: item.quantity,
                    precio_unitario: item.precio,
                    subtotal: item.precio * item.quantity
                })),
                total: cartTotal
            };
            
            // Intento de llamar a la API
            await fetchWithAuth('/ventas', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            
            alert(`¡Gracias por tu compra por un total de $${cartTotal.toLocaleString('es-CO')}!`);
            clearCart();
            toggleCart();
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert("Hubo un error al procesar tu compra. Es probable que necesites iniciar sesión o el endpoint backend aún no exista.");
        }
    };

    return (
        <div className={styles.cartOverlay} onClick={toggleCart}>
            <div className={styles.cartContainer} onClick={e => e.stopPropagation()}>
                <div className={styles.cartHeader}>
                    <h2>Tu Carrito</h2>
                    <button className={styles.closeBtn} onClick={toggleCart}>✖</button>
                </div>

                <div className={styles.cartItems}>
                    {cart.length === 0 ? (
                        <p className={styles.emptyMessage}>No hay productos en tu carrito.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id_producto} className={styles.cartItem}>
                                <div className={styles.itemImageContainer}>
                                    {/* Usa un placeholder si no hay imagen válida */}
                                    <img 
                                        src={item.imagen && item.imagen.startsWith('http') ? item.imagen : 'https://placehold.co/100x100?text=Instrumento'} 
                                        alt={item.nombre} 
                                        className={styles.itemImage}
                                    />
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3>{item.nombre}</h3>
                                    <p className={styles.itemPrice}>${parseFloat(item.precio).toLocaleString('es-CO')}</p>
                                    
                                    <div className={styles.quantityControls}>
                                        <button 
                                            onClick={() => updateQuantity(item.id_producto, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id_producto, 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className={styles.removeBtn} 
                                    onClick={() => removeFromCart(item.id_producto)}
                                    title="Eliminar producto"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.cartFooter}>
                    <div className={styles.totalRow}>
                        <span>Total:</span>
                        <span>${cartTotal.toLocaleString('es-CO')}</span>
                    </div>
                    <button 
                        className={styles.checkoutBtn} 
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
