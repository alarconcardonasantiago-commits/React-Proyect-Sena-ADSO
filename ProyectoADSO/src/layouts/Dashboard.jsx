// src/layouts/Dashboard.jsx (Modificado)

import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../Components/SideMenu/SideMenu.jsx'; // 💡 Importar el menú
import styles from './Dashboard.module.css'; // 💡 Crear un archivo CSS para el layout

const Dashboard = () => {
    return (
        // Contenedor que maneja el layout de dos columnas
        <div className={styles.dashboardContainer}> 
            
            <SideMenu /> {/* 1. El menú fijo */}
            
            {/* 2. El área principal de contenido */}
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            
        </div>
    );
}

export default Dashboard;