// src/Components/SideMenu/SideMenu.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';

const SideMenu = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            navigate('/Administracion');
        }
    };

    const handleLink = () => {
        // Cierra el menú en móvil al navegar
        if (onClose) onClose();
    };

    return (
        <nav className={`${styles.sideMenu} ${isOpen ? styles.sideMenuOpen : ''}`}>

            {/* Header con botón de cierre en móvil */}
            <div className={styles.header}>
                <span className={styles.logo}>⚙️ Panel ADSO</span>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Cerrar menú"
                >
                    ✕
                </button>
            </div>

            <div className={styles.menuGroups}>

                {/* 0. Navegación */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Navegación</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/" className={styles.menuLink} onClick={handleLink}>🏠 Volver a la Tienda</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin" className={styles.menuLink} onClick={handleLink}>🏡 Inicio del Panel</Link>
                        </li>
                    </ul>
                </div>

                {/* 1. Gestión de Productos */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Gestión de Productos</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/BuscarProducto" className={styles.menuLink} onClick={handleLink}>🔍 Buscar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/AgregarProducto" className={styles.menuLink} onClick={handleLink}>➕ Agregar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/EditarProducto" className={styles.menuLink} onClick={handleLink}>✏️ Editar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/EliminarProducto" className={styles.menuLink} onClick={handleLink}>🗑️ Eliminar Producto</Link>
                        </li>
                    </ul>
                </div>

                {/* 2. Estadísticas */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Estadísticas</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Ventas" className={styles.menuLink} onClick={handleLink}>📊 Ventas</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Usuarios" className={styles.menuLink} onClick={handleLink}>👥 Usuarios</Link>
                        </li>
                    </ul>
                </div>

                {/* 3. Configuración */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Configuración</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Perfil" className={styles.menuLink} onClick={handleLink}>👤 Perfil</Link>
                        </li>
                        <li
                            className={`${styles.sideMenuItem} ${styles.logout}`}
                            onClick={handleLogout}
                        >
                            🚪 Cerrar Sesión
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideMenu;