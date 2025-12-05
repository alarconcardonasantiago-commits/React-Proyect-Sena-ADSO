// src/Components/SideMenu/SideMenu.jsx (Actualizado)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 💡 Importar Link y useNavigate
import styles from './SideMenu.module.css';

const SideMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            navigate('/Administracion'); // Redirigir al login
        }
    };

    return (
        // 💡 Contenedor principal del menú lateral
        <nav className={styles.sideMenu}>
            
            {/* 💡 Sección del Logo/Título del Dashboard */}
            <div className={styles.header}>
                <span className={styles.logo}>⚙️ Panel ADSO</span>
            </div>

            <div className={styles.menuGroups}>
                
                {/* 0. Grupo: Navegación */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Navegación</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/" className={styles.menuLink}>🏠 Volver a la Tienda</Link>
                        </li>
                    </ul>
                </div>

                {/* 1. Grupo: Gestión de Productos */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Gestión de Productos</span>
                    <ul className={styles.sideMenuList}>
                        {/* Usar Link para navegación */}
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/BuscarProducto" className={styles.menuLink}>Buscar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/AgregarProducto" className={styles.menuLink}>Agregar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/EditarProducto" className={styles.menuLink}>Editar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/EliminarProducto" className={styles.menuLink}>Eliminar Producto</Link>
                        </li>
                    </ul>
                </div>

                {/* 2. Grupo: Estadísticas */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Estadísticas</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Ventas" className={styles.menuLink}>Ventas</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Usuarios" className={styles.menuLink}>Usuarios</Link>
                        </li>
                    </ul>
                </div>
                
                {/* 3. Grupo: Configuración y Salir (Alineado al final) */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Configuración</span> 
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/Perfil" className={styles.menuLink}>Perfil</Link>
                        </li>
                        {/* Botón de Cerrar Sesión con lógica */}
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