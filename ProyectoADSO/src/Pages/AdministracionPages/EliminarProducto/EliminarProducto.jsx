import React, { useState, useEffect } from 'react';
import styles from './EliminarProducto.module.css';
import { fetchWithAuth } from '../../../utils/api';

const EliminarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const spinnerTimer = setTimeout(() => setShowSpinner(true), 400);
            
            const data = await fetchWithAuth('/productos');
            
            clearTimeout(spinnerTimer);
            setShowSpinner(false);
            setProductos(data);
        } catch (err) {
            console.error('❌ Error al cargar productos:', err);
            setError(err.message);
            setShowSpinner(false);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarClick = (producto) => {
        setModalData(producto);
    };

    const handleConfirmarEliminar = async () => {
        if (!modalData) return;

        try {
            setLoading(true);
            await fetchWithAuth(`/productos/${modalData.id_producto}`, {
                method: 'DELETE'
            });

            console.log('✅ Producto eliminado:', modalData.id_producto);
            
            // Actualizar lista local
            setProductos(prev => prev.filter(p => p.id_producto !== modalData.id_producto));
            setModalData(null);
            
        } catch (err) {
            console.error('❌ Error al eliminar producto:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelar = () => {
        setModalData(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🗑️ Eliminar Producto</h1>
                <p className={styles.subtitle}>Gestiona y elimina productos del inventario</p>
            </div>

            <div className={styles.warningBox}>
                <h3>⚠️ Advertencia</h3>
                <p>La eliminación de productos es permanente. Asegúrate de verificar antes de confirmar.</p>
            </div>

            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id_producto}>
                                <td>#{producto.id_producto}</td>
                                <td>{producto.nombre}</td>
                                <td>
                                    <span className={styles.categoryBadge}>
                                        {producto.tipo || producto.categoria || 'Sin categoría'}
                                    </span>
                                </td>
                                <td className={styles.price}>${parseFloat(producto.precio).toLocaleString('es-CO')}</td>
                                <td className={styles.stock}>{producto.stock || 0} unidades</td>
                                <td>
                                    <button
                                        className={styles.btnEliminar}
                                        onClick={() => handleEliminarClick(producto)}
                                        disabled={loading}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {productos.length === 0 && !loading && (
                    <div className={styles.emptyState}>
                        <p>No hay productos en el inventario</p>
                    </div>
                )}
            </div>

            {/* Modal de confirmación */}
            {modalData && (
                <div className={styles.modalOverlay} onClick={handleCancelar}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>⚠️ Confirmar Eliminación</h2>
                        <div className={styles.modalContent}>
                            <p>¿Estás seguro que deseas eliminar el siguiente producto?</p>
                            <div className={styles.productInfo}>
                                <p><strong>Nombre:</strong> {modalData.nombre}</p>
                                <p><strong>Categoría:</strong> {modalData.tipo || modalData.categoria}</p>
                                <p><strong>Precio:</strong> ${parseFloat(modalData.precio).toLocaleString('es-CO')}</p>
                                <p><strong>Stock:</strong> {modalData.stock} unidades</p>
                            </div>
                            <p className={styles.warningText}>⚠️ Esta acción no se puede deshacer</p>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.btnCancelarModal}
                                onClick={handleCancelar}
                                disabled={loading}
                            >
                                ❌ Cancelar
                            </button>
                            <button
                                className={styles.btnConfirmar}
                                onClick={handleConfirmarEliminar}
                                disabled={loading}
                            >
                                {loading ? '⏳ Eliminando...' : '🗑️ Confirmar Eliminación'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Spinner inteligente */}
            {showSpinner && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Cargando productos...</span>
                </div>
            )}
        </div>
    );
};

export default EliminarProducto;
