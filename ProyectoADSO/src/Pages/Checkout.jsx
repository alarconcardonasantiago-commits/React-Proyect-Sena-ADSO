import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { fetchWithAuth } from '../utils/api';
import styles from './Checkout.module.css';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        tarjeta: '',
        expiracion: '',
        cvv: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setLoading(true);

        try {
            const payload = {
                // Si el usuario está logueado, el backend toma su id del token, o lo crea/asigna.
                detalles: cart.map(item => ({
                    id_producto: item.id_producto || item.id,
                    cantidad: item.quantity,
                    precio_unitario: item.precio,
                    subtotal: item.precio * item.quantity
                })),
                total: cartTotal
            };
            
            await fetchWithAuth('/ventas', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            
            setSuccess(true);
            clearCart();
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert("Hubo un error al procesar tu compra. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <h2>¡Pago Exitoso! 🎉</h2>
                    <p>Gracias por tu compra. Tu orden ha sido registrada.</p>
                    <button onClick={() => window.location.href = '/'} className={styles.btnPrimary}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Tu carrito está vacío</h2>
                <p>Agrega algunos instrumentos antes de proceder al pago.</p>
                <button onClick={() => window.location.href = '/Productos'} className={styles.btnPrimary}>
                    Ver Productos
                </button>
            </div>
        );
    }

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutGrid}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Detalles de Pago</h2>
                    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                        <div className={styles.formGroup}>
                            <label>Nombre Completo</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Juan Pérez" />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Dirección de Envío</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required placeholder="Calle 123 #45-67" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Ciudad</label>
                                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required placeholder="Bogotá" />
                            </div>
                        </div>
                        
                        <h3 className={styles.subTitle}>Información de Tarjeta</h3>
                        <div className={styles.formGroup}>
                            <label>Número de Tarjeta</label>
                            <input type="text" name="tarjeta" value={formData.tarjeta} onChange={handleChange} required placeholder="0000 0000 0000 0000" maxLength="16" />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Expiración (MM/AA)</label>
                                <input type="text" name="expiracion" value={formData.expiracion} onChange={handleChange} required placeholder="12/25" maxLength="5" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>CVV</label>
                                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required placeholder="123" maxLength="4" />
                            </div>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Procesando...' : `Pagar $${cartTotal.toLocaleString('es-CO')}`}
                        </button>
                    </form>
                </div>
                
                <div className={styles.summarySection}>
                    <h2 className={styles.sectionTitle}>Resumen de Orden</h2>
                    <div className={styles.summaryItems}>
                        {cart.map(item => (
                            <div key={item.id_producto || item.id} className={styles.summaryItem}>
                                <img src={item.imagen && item.imagen.startsWith('http') ? item.imagen : 'https://placehold.co/50x50?text=Inst'} alt={item.nombre} />
                                <div className={styles.itemInfo}>
                                    <h4>{item.nombre}</h4>
                                    <p>Cant: {item.quantity}</p>
                                </div>
                                <span className={styles.itemTotal}>
                                    ${(item.precio * item.quantity).toLocaleString('es-CO')}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.summaryFooter}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toLocaleString('es-CO')}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString('es-CO')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
