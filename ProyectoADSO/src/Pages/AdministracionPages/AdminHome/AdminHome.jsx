// src/Pages/AdministracionPages/AdminHome/AdminHome.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminHome.module.css';

const QUICK_LINKS = [
    { emoji: '🔍', label: 'Buscar Producto',   desc: 'Consulta el inventario actual',       path: '/admin/BuscarProducto',  color: '#4f8ef7' },
    { emoji: '➕', label: 'Agregar Producto',   desc: 'Registra un nuevo instrumento',       path: '/admin/AgregarProducto', color: '#10b981' },
    { emoji: '✏️', label: 'Editar Producto',    desc: 'Modifica los datos de un producto',   path: '/admin/EditarProducto',  color: '#f59e0b' },
    { emoji: '🗑️', label: 'Eliminar Producto',  desc: 'Retira un producto del catálogo',     path: '/admin/EliminarProducto',color: '#ef4444' },
    { emoji: '📊', label: 'Ver Ventas',         desc: 'Consulta el historial de ventas',     path: '/admin/Ventas',          color: '#8b5cf6' },
    { emoji: '👥', label: 'Usuarios',           desc: 'Gestiona los usuarios del sistema',   path: '/admin/Usuarios',        color: '#06b6d4' },
    { emoji: '👤', label: 'Mi Perfil',          desc: 'Actualiza tu información personal',   path: '/admin/Perfil',          color: '#f97316' },
    { emoji: '🏠', label: 'Ver Tienda',         desc: 'Vuelve al sitio público',             path: '/',                      color: '#6366f1' },
];

const AdminHome = () => {
    const navigate = useNavigate();

    const usuario = (() => {
        try {
            return JSON.parse(localStorage.getItem('usuario'));
        } catch {
            return null;
        }
    })();

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <div className={styles.welcomeIcon}>⚙️</div>
                <div>
                    <h1 className={styles.title}>
                        Bienvenido{usuario?.nombre ? `, ${usuario.nombre}` : ''} 👋
                    </h1>
                    <p className={styles.subtitle}>
                        Panel de Administración · Melodía Instrumental
                    </p>
                </div>
            </div>

            <p className={styles.hint}>¿Qué deseas hacer hoy?</p>

            <div className={styles.grid}>
                {QUICK_LINKS.map(({ emoji, label, desc, path, color }) => (
                    <button
                        key={path}
                        className={styles.card}
                        style={{ '--accent': color }}
                        onClick={() => navigate(path)}
                    >
                        <span className={styles.cardEmoji}>{emoji}</span>
                        <span className={styles.cardLabel}>{label}</span>
                        <span className={styles.cardDesc}>{desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
