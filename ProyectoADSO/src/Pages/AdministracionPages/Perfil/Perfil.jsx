import React, { useState, useEffect } from 'react';
import styles from './Perfil.module.css';
import { fetchWithAuth } from '../../../utils/api';

const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    // Obtener datos del usuario desde localStorage
    const [formData, setFormData] = useState(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        return {
            nombre: usuario.nombre || usuario.name || '',
            email: usuario.correo || usuario.email || '',
            telefono: usuario.telefono || '',
            cargo: usuario.cargo || usuario.rol || '',
            departamento: usuario.departamento || '',
            fechaIngreso: usuario.fecha_ingreso || usuario.fecha_registro || ''
        };
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
            const usuarioId = usuario.id || usuario.id_usuario;

            if (!usuarioId) {
                throw new Error('No se encontró el ID del usuario');
            }

            // PUT al endpoint de usuarios
            const result = await fetchWithAuth(`/usuarios/${usuarioId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    telefono: formData.telefono,
                    departamento: formData.departamento
                })
            });

            console.log('✅ Perfil actualizado:', result);
            
            // Actualizar localStorage
            const updatedUsuario = { ...usuario, ...formData };
            localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
            
            setSuccess(true);
            setIsEditing(false);
        } catch (err) {
            console.error('❌ Error al actualizar perfil:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // PUT al endpoint de cambio de contraseña
            await fetchWithAuth('/auth/cambiar-contrasena', {
                method: 'PUT',
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            console.log('✅ Contraseña actualizada');
            setSuccess(true);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error('❌ Error al cambiar contraseña:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>👤 Mi Perfil</h1>
                <p className={styles.subtitle}>Gestiona tu información personal y configuración</p>
            </div>

            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}
            {success && (
                <div className={styles.successBox}>
                    <p>✅ Cambios guardados exitosamente!</p>
                </div>
            )}

            <div className={styles.profileLayout}>
                <div className={styles.profileCard}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            <span className={styles.avatarIcon}>👤</span>
                        </div>
                        <button className={styles.btnChangePhoto}>📷 Cambiar Foto</button>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Nombre:</span>
                            <span className={styles.infoValue}>{formData.nombre || 'No especificado'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Email:</span>
                            <span className={styles.infoValue}>{formData.email || 'No especificado'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Teléfono:</span>
                            <span className={styles.infoValue}>{formData.telefono || 'No especificado'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Cargo:</span>
                            <span className={styles.infoBadge}>{formData.cargo || 'Usuario'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Departamento:</span>
                            <span className={styles.infoValue}>{formData.departamento || 'No especificado'}</span>
                        </div>
                        {formData.fechaIngreso && (
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Fecha de Ingreso:</span>
                                <span className={styles.infoValue}>{formData.fechaIngreso}</span>
                            </div>
                        )}
                    </div>

                    {!isEditing && (
                        <button 
                            className={styles.btnEdit}
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️ Editar Perfil
                        </button>
                    )}
                </div>

                <div className={styles.formsColumn}>
                    {isEditing && (
                        <div className={styles.editCard}>
                            <h2>✏️ Editar Información</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="nombre">Nombre Completo</label>
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

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="departamento">Departamento</label>
                                    <input
                                        type="text"
                                        id="departamento"
                                        name="departamento"
                                        value={formData.departamento}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div className={styles.formActions}>
                                    <button 
                                        type="button" 
                                        className={styles.btnCancel}
                                        onClick={() => setIsEditing(false)}
                                        disabled={loading}
                                    >
                                        ❌ Cancelar
                                    </button>
                                    <button type="submit" className={styles.btnSave} disabled={loading}>
                                        {loading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={styles.passwordCard}>
                        <h2>🔒 Cambiar Contraseña</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="currentPassword">Contraseña Actual</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className={styles.btnPassword} disabled={loading}>
                                {loading ? '⏳ Actualizando...' : '🔐 Actualizar Contraseña'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
