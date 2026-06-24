// src/layouts/Dashboard.jsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../Components/SideMenu/SideMenu.jsx';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={styles.dashboardContainer}>
            {/* Overlay oscuro para cerrar el menú en móvil */}
            {sidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <SideMenu
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className={styles.mainContent}>
                {/* Botón hamburguesa visible solo en móvil */}
                <button
                    className={styles.hamburgerBtn}
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Abrir menú"
                >
                    ☰
                </button>
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;