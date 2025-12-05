import React, { useState } from 'react';
import styles from './AgregarProducto.module.css';
import { fetchWithAuth } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Preparar datos para enviar
            const productoData = {
                nombre: formData.nombre,
                tipo: formData.categoria, // Campo "tipo" en la BD
                marca: formData.marca,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock), // Campo "stock" en la BD
                descripcion: formData.descripcion,
                estado: formData.estado,
                // Si hay imagen, enviarla como base64 o manejar con FormData según tu backend
                ...(imagePreview && { imagen: imagePreview })
            };

            // POST a la API
            const result = await fetchWithAuth('/productos', {
                method: 'POST',
                body: JSON.stringify(productoData)
            });

            console.log('✅ Producto creado:', result);
            setSuccess(true);
            
            // Resetear formulario
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
            setImageFile(null);

            // Redirigir después de 1.5 segundos
            setTimeout(() => {
                navigate('/admin/BuscarProducto');
            }, 1500);

        } catch (err) {
            console.error('❌ Error al crear producto:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>➕ Agregar Producto</h1>
                <p className={styles.subtitle}>Registra un nuevo instrumento en el inventario</p>
            </div>

            {/* Mensajes de feedback */}
            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}
            {success && (
                <div className={styles.successBox}>
                    <p>✅ Producto agregado exitosamente! Redirigiendo...</p>
                </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    {/* Columna izquierda */}
                    <div className={styles.formColumn}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nombre">Nombre del Instrumento *</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Guitarra Acústica Yamaha C40"
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
                                    placeholder="Ej: Yamaha, Fender, Roland"
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
                                    placeholder="450000"
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
                                    placeholder="10"
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
                                placeholder="Describe las características del instrumento..."
                                rows="4"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Columna derecha - Imagen */}
                    <div className={styles.formColumn}>
                        <div className={styles.imageSection}>
                            <label>Imagen del Producto</label>
                            <div className={styles.imageUpload}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        <span className={styles.uploadIcon}>📷</span>
                                        <p>Sube una imagen del instrumento</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="imagen"
                                name="imagen"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                                disabled={loading}
                            />
                            <label htmlFor="imagen" className={styles.fileLabel}>
                                📁 Seleccionar Archivo
                            </label>
                        </div>

                        <div className={styles.infoBox}>
                            <h3>💡 Consejos</h3>
                            <ul>
                                <li>Utiliza nombres descriptivos y precisos</li>
                                <li>Verifica el stock disponible</li>
                                <li>Incluye la marca original del fabricante</li>
                                <li>Sube imágenes de alta calidad</li>
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
                        {loading ? '⏳ Agregando...' : '✅ Agregar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarProducto;
