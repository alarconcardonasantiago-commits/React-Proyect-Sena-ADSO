// src/Components/SideMenu/SideMenu.jsx (Actualizado)

import React from 'react';
import { Link } from 'react-router-dom'; // 💡 Importar Link
import styles from './SideMenu.module.css';

const SideMenu = () => {
    return (
        // 💡 Contenedor principal del menú lateral
        <nav className={styles.sideMenu}>
            
            {/* 💡 Sección del Logo/Título del Dashboard */}
            <div className={styles.header}>
                <span className={styles.logo}>⚙️ Panel ADSO</span>
            </div>

            <div className={styles.menuGroups}>
                
                {/* 1. Grupo: Gestión de Productos */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Gestión de Productos</span>
                    <ul className={styles.sideMenuList}>
                        {/* Usar Link para navegación */}
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/buscarproducto" className={styles.menuLink}>Buscar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/agregarproducto" className={styles.menuLink}>Agregar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/editarproducto" className={styles.menuLink}>Editar Producto</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/eliminarproducto" className={styles.menuLink}>Eliminar Producto</Link>
                        </li>
                    </ul>
                </div>

                {/* 2. Grupo: Estadísticas */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Estadísticas</span>
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/ventas" className={styles.menuLink}>Ventas</Link>
                        </li>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/usuarios" className={styles.menuLink}>Usuarios</Link>
                        </li>
                    </ul>
                </div>
                
                {/* 3. Grupo: Configuración y Salir (Alineado al final) */}
                <div className={styles.menuGroup}>
                    <span className={styles.menuTitle}>Configuración</span> 
                    <ul className={styles.sideMenuList}>
                        <li className={styles.sideMenuItem}>
                            <Link to="/admin/perfil" className={styles.menuLink}>Perfil</Link>
                        </li>
                        {/* Esto no es un Link, sino una acción (pendiente de implementar la lógica de logout) */}
                        <li className={`${styles.sideMenuItem} ${styles.logout}`}>
                            Cerrar Sesión
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideMenu;