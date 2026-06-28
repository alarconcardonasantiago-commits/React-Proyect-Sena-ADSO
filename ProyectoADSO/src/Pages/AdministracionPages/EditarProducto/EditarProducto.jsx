import React, { useState, useEffect } from 'react';
import styles from './EditarProducto.module.css';
import { fetchWithAuth } from '../../../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

const EditarProducto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [productos, setProductos] = useState([]);
    const [selectedProductoId, setSelectedProductoId] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingProductos, setLoadingProductos] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        marca: '',
        precio: '',
        stock: '',
        descripcion: '',
        estado: 'Nuevo'
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Cargar lista de productos al montar
    useEffect(() => {
        const init = async () => {
            await fetchProductos();
            if (location.state && location.state.productoId) {
                // Seleccionar el producto que viene en el state (desde BuscarProducto)
                setSelectedProductoId(location.state.productoId.toString());
                // Disparar la carga de ese producto
                handleProductoSelect({ target: { value: location.state.productoId.toString() } }, null);
            }
        };
        init();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoadingProductos(true);
            const data = await fetchWithAuth('/productos');
            setProductos(data);
        } catch (err) {
            console.error('❌ Error al cargar productos:', err);
            setError('No se pudieron cargar los productos');
        } finally {
            setLoadingProductos(false);
        }
    };

    // Cargar datos del producto seleccionado
    const handleProductoSelect = async (e) => {
        const productoId = e.target.value;
        setSelectedProductoId(productoId);
        setError(null);
        setSuccess(false);

        if (!productoId) {
            setFormData({
                nombre: '',
                categoria: '',
                marca: '',
                precio: '',
                stock: '',
                descripcion: '',
                estado: 'Nuevo'
            });
            setImagePreview(null);
            return;
        }

        // Asegurarse de que usemos el ID correcto si estamos iniciando desde useEffect o onChange
        const prodId = e ? e.target.value : selectedProductoId;
        
        // Si el estado de productos aún no carga y venimos del state, no hacemos nada todavía
        const producto = productos.find(p => p.id_producto === parseInt(prodId));
        
        if (producto) {
            setFormData({
                nombre: producto.nombre || '',
                categoria: producto.tipo || producto.categoria || '',
                marca: producto.marca || '',
                precio: producto.precio || '',
                stock: producto.stock || '',
                descripcion: producto.descripcion || '',
                estado: producto.estado || 'Nuevo'
            });
            setImagePreview(producto.imagen || null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setImagePreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedProductoId) {
            setError('Debe seleccionar un producto para editar');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const spinnerTimer = setTimeout(() => setShowSpinner(true), 400);

        try {
            const productoData = {
                nombre: formData.nombre,
                tipo: formData.categoria,
                marca: formData.marca,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                descripcion: formData.descripcion,
                estado: formData.estado,
                ...(imagePreview && { imagen: imagePreview })
            };

            const result = await fetchWithAuth(`/productos/${selectedProductoId}`, {
                method: 'PUT',
                body: JSON.stringify(productoData)
            });

            clearTimeout(spinnerTimer);
            setShowSpinner(false);
            console.log('✅ Producto actualizado:', result);
            setSuccess(true);

            await fetchProductos();

            setTimeout(() => {
                navigate('/admin/BuscarProducto');
            }, 1500);

        } catch (err) {
            clearTimeout(spinnerTimer);
            setShowSpinner(false);
            console.error('❌ Error al actualizar producto:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>✏️ Editar Producto</h1>
                <p className={styles.subtitle}>Modifica la información de un instrumento existente</p>
            </div>

            <div className={styles.selectorCard}>
                <label htmlFor="productoSelector">Seleccionar Producto a Editar:</label>
                <select
                    id="productoSelector"
                    value={selectedProductoId}
                    onChange={handleProductoSelect}
                    className={styles.productSelector}
                    disabled={loadingProductos}
                >
                    <option value="">-- Seleccione un producto --</option>
                    {productos.map(producto => (
                        <option key={producto.id_producto} value={producto.id_producto}>
                            {producto.nombre} - ${parseFloat(producto.precio).toLocaleString('es-CO')}
                        </option>
                    ))}
                </select>
            </div>

            {selectedProductoId && (
                <div className={styles.editingBadge}>
                    ✏️ Editando: <strong>{formData.nombre}</strong>
                </div>
            )}

            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}
            {success && (
                <div className={styles.successBox}>
                    <p>✅ Producto actualizado exitosamente! Redirigiendo...</p>
                </div>
            )}

            {selectedProductoId ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formColumn}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nombre">Nombre del Instrumento *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="categoria">Categoría *</label>
                                    <select
                                        id="categoria"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="Cuerdas">🎸 Cuerdas</option>
                                        <option value="Viento">🎷 Viento</option>
                                        <option value="Percusión">🥁 Percusión</option>
                                        <option value="Electrónicos">🎹 Electrónicos</option>
                                        <option value="Accesorios">🎵 Accesorios</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="marca">Marca *</label>
                                    <input
                                        type="text"
                                        id="marca"
                                        name="marca"
                                        value={formData.marca}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="precio">Precio (COP) *</label>
                                    <input
                                        type="number"
                                        id="precio"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        min="0"
                                        step="1000"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="stock">Stock *</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="estado">Estado del Producto</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="estado"
                                            value="Nuevo"
                                            checked={formData.estado === 'Nuevo'}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        <span>✨ Nuevo</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="estado"
                                            value="Usado"
                                            checked={formData.estado === 'Usado'}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        <span>🔄 Usado</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows="4"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className={styles.formColumn}>
                            <div className={styles.imageSection}>
                                <label>Imagen del Producto</label>
                                <div className={styles.imageUpload}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>
                                            <span className={styles.uploadIcon}>🔗</span>
                                            <p>Sin imagen</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="url"
                                    id="imagen"
                                    name="imagen"
                                    value={imagePreview || ''}
                                    onChange={handleImageChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    className={styles.urlInput}
                                    disabled={loading}
                                />
                                <p className={styles.helperText}>
                                    Pega un enlace de imagen (Unsplash, Imgur, etc.)
                                </p>
                            </div>

                            <div className={styles.infoBox}>
                                <h3>💡 Consejos</h3>
                                <ul>
                                    <li>Verifica los cambios antes de guardar</li>
                                    <li>Actualiza el stock si es necesario</li>
                                    <li>Revisa que el precio sea correcto</li>
                                    <li>Mantén la información actualizada</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button 
                            type="button" 
                            className={styles.btnCancel}
                            onClick={() => navigate('/admin/BuscarProducto')}
                            disabled={loading}
                        >
                            ❌ Cancelar
                        </button>
                        <button type="submit" className={styles.btnSubmit} disabled={loading}>
                            {loading ? '⏳ Actualizando...' : '💾 Guardar Cambios'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.emptyState}>
                    <p>Selecciona un producto de la lista para comenzar a editar</p>
                </div>
            )}

            {showSpinner && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Actualizando producto...</span>
                </div>
            )}
        </div>
    );
};

export default EditarProducto;
