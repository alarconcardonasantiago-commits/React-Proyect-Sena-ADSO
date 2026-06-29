import React, { useState, useEffect } from 'react';
import styles from './Usuarios.module.css';
import { fetchWithAuth } from '../../../utils/api';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Estados de modales
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        rol: 'empleado',
        estado: 'Activo'
    });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const spinnerTimer = setTimeout(() => setShowSpinner(true), 400);

            try {
                const data = await fetchWithAuth('/usuarios');
                clearTimeout(spinnerTimer);
                setShowSpinner(false);
                setUsuarios(data);
            } catch (apiError) {
                clearTimeout(spinnerTimer);
                setShowSpinner(false);
                throw apiError; // Re-lanzar error para mostrar el cartel de error si no conecta
            }
        } catch (err) {
            setError(err.message);
            setShowSpinner(false);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Funciones para abrir modales
    const openAddModal = () => {
        setFormData({ nombre: '', correo: '', contraseña: '', rol: 'empleado', estado: 'Activo' });
        setError(null);
        setShowAddModal(true);
    };

    const openEditModal = (user) => {
        setUserToEdit(user);
        setFormData({ 
            nombre: user.nombre, 
            correo: user.correo || user.email, 
            contraseña: '', // se deja vacía por seguridad
            rol: user.rol, 
            estado: user.estado 
        });
        setError(null);
        setShowEditModal(true);
    };

    const openDeleteModal = (user) => {
        setUserToEdit(user);
        setError(null);
        setShowDeleteModal(true);
    };

    // Peticiones a la API
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = { ...formData, correo: formData.correo.trim() };
            // Intentamos llamar a /usuarios o /auth/register
            await fetchWithAuth('/usuarios', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            setSuccessMessage("Usuario agregado correctamente");
            setShowAddModal(false);
            fetchUsuarios();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = { ...formData };
            if (!payload.contraseña) {
                delete payload.contraseña; // No actualizar contraseña si se dejó en blanco
            }
            
            const userId = userToEdit.id_usuario || userToEdit.id;
            await fetchWithAuth(`/usuarios/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            setSuccessMessage("Usuario actualizado correctamente");
            setShowEditModal(false);
            fetchUsuarios();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async () => {
        try {
            setLoading(true);
            const userId = userToEdit.id_usuario || userToEdit.id;
            // Endpoint para cambiar estado o el mismo PUT /usuarios/:id con estado Inactivo
            await fetchWithAuth(`/usuarios/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({ estado: 'Inactivo' })
            });
            
            setSuccessMessage(`El usuario ${userToEdit.nombre} ha sido suspendido/desactivado`);
            setShowDeleteModal(false);
            fetchUsuarios();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const totalUsuarios = usuarios.length;
    const usuariosActivos = usuarios.filter(u => u.estado === 'Activo').length;
    const admins = usuarios.filter(u => u.rol === 'admin' || u.rol === 'Admin').length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>👥 Gestión de Usuarios</h1>
                    <p className={styles.subtitle}>Administra los niveles de acceso del sistema</p>
                </div>
                <button className={styles.btnAdd} onClick={openAddModal}>➕ Agregar Usuario</button>
            </div>

            {error && !showAddModal && !showEditModal && !showDeleteModal && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}
            
            {successMessage && (
                <div className={styles.successBox}>
                    <p>✅ {successMessage}</p>
                </div>
            )}

            <div className={styles.miniStats}>
                <div className={styles.miniStat}>
                    <span className={styles.miniStatValue}>{totalUsuarios}</span>
                    <span className={styles.miniStatLabel}>Total Usuarios</span>
                </div>
                <div className={styles.miniStat}>
                    <span className={styles.miniStatValue}>{usuariosActivos}</span>
                    <span className={styles.miniStatLabel}>Activos</span>
                </div>
                <div className={styles.miniStat}>
                    <span className={styles.miniStatValue}>{admins}</span>
                    <span className={styles.miniStatLabel}>Administradores</span>
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={usuario.id_usuario || usuario.id || index}>
                                <td>#{usuario.id_usuario || usuario.id || index + 1}</td>
                                <td className={styles.userName}>{usuario.nombre}</td>
                                <td>{usuario.correo || usuario.email}</td>
                                <td>
                                    <span className={`${styles.roleBadge} ${
                                        usuario.rol.toLowerCase() === 'admin' ? styles.roleAdmin : styles.roleVendedor
                                    }`}>
                                        {usuario.rol}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.statusBadge} ${
                                        usuario.estado === 'Activo' ? styles.statusActivo : styles.statusInactivo
                                    }`}>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td>{usuario.fecha_creacion ? new Date(usuario.fecha_creacion).toLocaleDateString() : 'N/A'}</td>
                                <td className={styles.actions}>
                                    <button className={styles.btnEdit} onClick={() => openEditModal(usuario)} title="Editar">✏️</button>
                                    <button 
                                        className={styles.btnDeactivate} 
                                        onClick={() => openDeleteModal(usuario)} 
                                        title={usuario.estado === 'Activo' ? "Desactivar" : "Mantener Inactivo"}
                                        disabled={usuario.estado !== 'Activo'}
                                    >
                                        🚫
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modales Compartidos: Usamos un Overlay global */}
            {(showAddModal || showEditModal || showDeleteModal) && (
                <div className={styles.modalOverlay}>
                    
                    {/* Modal Eliminar/Desactivar */}
                    {showDeleteModal && (
                        <div className={styles.modalCard}>
                            <h2 className={styles.modalTitleAlert}>⚠️ Confirmar Acción</h2>
                            <p>¿Estás seguro que deseas suspender/desactivar el usuario <strong>{userToEdit?.nombre}</strong>?</p>
                            <p className={styles.warningText}>
                                Este usuario ya no podrá iniciar sesión en el panel de administración. Podrás reactivarlo más adelante editándolo.
                            </p>
                            {error && <div className={styles.errorBox}><p>{error}</p></div>}
                            <div className={styles.modalActions}>
                                <button className={styles.btnCancel} onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                                <button className={styles.btnConfirmAlert} onClick={handleDeactivate} disabled={loading}>
                                    {loading ? 'Procesando...' : 'Sí, desactivar'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal Crear / Editar */}
                    {(showAddModal || showEditModal) && (
                        <div className={styles.modalCard}>
                            <h2 className={styles.modalTitle}>
                                {showAddModal ? '➕ Añadir Nuevo Usuario' : '✏️ Editar Usuario'}
                            </h2>
                            {error && <div className={styles.errorBox}><p>{error}</p></div>}
                            
                            <form onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit} className={styles.modalForm}>
                                <div className={styles.formGroup}>
                                    <label>Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required 
                                        placeholder="Ej: Laura Martínez"
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label>Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        name="correo" 
                                        value={formData.correo}
                                        onChange={handleInputChange}
                                        required 
                                        placeholder="usuario@ejemplo.com"
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label>Contraseña {showEditModal && '(Déjala vacía para conservar actual)'}</label>
                                    <input 
                                        type="password" 
                                        name="contraseña" 
                                        value={formData.contraseña}
                                        onChange={handleInputChange}
                                        required={showAddModal} 
                                        placeholder="••••••••"
                                    />
                                </div>
                                
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Rol del Sistema</label>
                                        <select name="rol" value={formData.rol} onChange={handleInputChange}>
                                            <option value="empleado">Empleado (Limitado)</option>
                                            <option value="admin">Administrador (Total)</option>
                                        </select>
                                    </div>
                                    
                                    <div className={styles.formGroup}>
                                        <label>Estado</label>
                                        <select name="estado" value={formData.estado} onChange={handleInputChange}>
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo / Suspendido</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button 
                                        type="button" 
                                        className={styles.btnCancel} 
                                        onClick={() => { setShowAddModal(false); setShowEditModal(false); }}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={styles.btnSubmit} disabled={loading}>
                                        {loading ? 'Guardando...' : (showAddModal ? 'Crear Usuario' : 'Guardar Cambios')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {showSpinner && (
                <div className={styles.loadingOverlaySpinner}>
                    <div className={styles.spinner}></div>
                    <span>Cargando datos...</span>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
