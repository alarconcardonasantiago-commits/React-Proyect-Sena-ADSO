import React, { useState, useEffect } from 'react';
import styles from './Usuarios.module.css';
import { fetchWithAuth } from '../../../utils/api';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);

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
                
                console.warn('⚠️ Endpoint /usuarios no disponible, usando datos de ejemplo');
                const datosEjemplo = [
                    { id: 1, nombre: 'María González', email: 'maria@example.com', rol: 'Admin', estado: 'Activo', fecha_registro: '2024-01-15' },
                    { id: 2, nombre: 'Carlos Pérez', email: 'carlos@example.com', rol: 'Vendedor', estado: 'Activo', fecha_registro: '2024-02-20' },
                    { id: 3, nombre: 'Ana López', email: 'ana@example.com', rol: 'Vendedor', estado: 'Activo', fecha_registro: '2024-03-10' },
                    { id: 4, nombre: 'Juan Martínez', email: 'juan@example.com', rol: 'Cliente', estado: 'Activo', fecha_registro: '2024-11-01' },
                    { id: 5, nombre: 'Laura Ruiz', email: 'laura@example.com', rol: 'Cliente', estado: 'Inactivo', fecha_registro: '2024-10-15' }
                ];
                setUsuarios(datosEjemplo);
            }
        } catch (err) {
            console.error('❌ Error al cargar usuarios:', err);
            setError(err.message);
            setShowSpinner(false);
        } finally {
            setLoading(false);
        }
    };

    const totalUsuarios = usuarios.length;
    const usuariosActivos = usuarios.filter(u => u.estado === 'Activo').length;
    const admins = usuarios.filter(u => u.rol === 'Admin').length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>👥 Gestión de Usuarios</h1>
                    <p className={styles.subtitle}>Administra los usuarios del sistema</p>
                </div>
                <button className={styles.btnAdd}>➕ Agregar Usuario</button>
            </div>

            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
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
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>#{usuario.id}</td>
                                <td className={styles.userName}>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <span className={`${styles.roleBadge} ${
                                        usuario.rol === 'Admin' ? styles.roleAdmin :
                                        usuario.rol === 'Vendedor' ? styles.roleVendedor :
                                        styles.roleCliente
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
                                <td>{usuario.fecha_registro}</td>
                                <td className={styles.actions}>
                                    <button className={styles.btnView} title="Ver">👁️</button>
                                    <button className={styles.btnEdit} title="Editar">✏️</button>
                                    <button className={styles.btnDeactivate} title="Desactivar">🚫</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showSpinner && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Cargando usuarios...</span>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
