import React, { useState, useEffect } from 'react';
import styles from './BuscarProducto.module.css';
import { fetchPublic } from '../../../utils/api';

const BuscarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);

    const categorias = ['Todos', 'Cuerdas', 'Viento', 'Percusión', 'Electrónicos'];

    // 🔹 Función principal de carga (con spinner inteligente como en Productos.jsx)
    const fetchProductos = async (query = '') => {
        try {
            setLoading(true);
            setError(null);

            // ⏳ Timer: solo mostramos el spinner si la petición tarda más de 400 ms
            const spinnerTimer = setTimeout(() => setShowSpinner(true), 400);

            let data;
            if (query.trim() !== '') {
                // Búsqueda por nombre
                data = await fetchPublic(`/productos/buscar?nombre=${encodeURIComponent(query)}`);
            } else {
                // Cargar todos los productos
                data = await fetchPublic('/productos');
            }

            clearTimeout(spinnerTimer);
            setShowSpinner(false);
            setProductos(data);
        } catch (err) {
            console.error('❌ Error al obtener productos:', err);
            setError(err.message);
            setShowSpinner(false);
        } finally {
            setLoading(false);
        }
    };

    // 🔸 Cargar productos al montar
    useEffect(() => {
        fetchProductos();
    }, []);

    // 🔸 Debounce para búsqueda (como en SearchBar)
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProductos(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Filtrar por categoría localmente
    const productosFiltrados = productos.filter(producto => {
        if (selectedCategory === 'Todos') return true;
        return producto.tipo === selectedCategory || producto.categoria === selectedCategory;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🔍 Buscar Productos</h1>
                <p className={styles.subtitle}>Explora nuestro inventario de instrumentos musicales</p>
            </div>

            {/* Barra de búsqueda */}
            <div className={styles.searchSection}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar por nombre de instrumento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filtros de categoría */}
            <div className={styles.filters}>
                {categorias.map(categoria => (
                    <button
                        key={categoria}
                        className={`${styles.filterChip} ${selectedCategory === categoria ? styles.active : ''}`}
                        onClick={() => setSelectedCategory(categoria)}
                    >
                        {categoria}
                    </button>
                ))}
            </div>

            {/* ⚠️ Mensaje de error */}
            {error && (
                <div className={styles.errorBox}>
                    <p>❌ Error: {error}</p>
                </div>
            )}

            {/* Resultados */}
            <div className={styles.results}>
                <p className={styles.resultCount}>
                    {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
                </p>

                <div className={`${styles.productsGrid} ${loading ? styles.loadingState : ''}`}>
                    {productosFiltrados.map(producto => (
                        <div key={producto.id_producto} className={styles.productCard}>
                            <div className={styles.productIcon}>
                                {producto.imagen ? (
                                    <img src={producto.imagen} alt={producto.nombre} style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px'}} />
                                ) : (
                                    <span style={{fontSize: '3rem'}}>🎵</span>
                                )}
                            </div>
                            <h3 className={styles.productName}>{producto.nombre}</h3>
                            <p className={styles.productCategory}>{producto.tipo || producto.categoria || 'Sin categoría'}</p>
                            <div className={styles.productInfo}>
                                <p className={styles.price}>${parseFloat(producto.precio).toLocaleString('es-CO')}</p>
                                <p className={styles.stock}>Stock: {producto.stock || 0}</p>
                            </div>
                            <div className={styles.cardActions}>
                                <button className={styles.btnEdit}>✏️ Editar</button>
                                <button className={styles.btnView}>👁️ Ver</button>
                            </div>
                        </div>
                    ))}
                </div>

                {productosFiltrados.length === 0 && !loading && (
                    <div className={styles.noResults}>
                        <p>😔 No se encontraron productos que coincidan con tu búsqueda</p>
                    </div>
                )}
            </div>

            {/* 🔁 Spinner inteligente */}
            {showSpinner && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Cargando productos...</span>
                </div>
            )}
        </div>
    );
}

export default BuscarProducto;
