import React, { useState, useEffect } from 'react';
import styles from './Ventas.module.css';
import { fetchWithAuth } from '../../../utils/api';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [stats, setStats] = useState({
        totalVentas: 0,
        productosVendidos: 0,
        ventasHoy: 0,
        clientesNuevos: 0
    });
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            setLoading(true);
            const spinnerTimer = setTimeout(() => setShowSpinner(true), 400);

            try {
                const data = await fetchWithAuth('/ventas');
                
                clearTimeout(spinnerTimer);
                setShowSpinner(false);
                
                setVentas(data);
                calcularEstadisticas(data);
            } catch (apiError) {
                clearTimeout(spinnerTimer);
                setShowSpinner(false);
                throw apiError; // Re-lanzar el error para que sea capturado por el bloque catch principal
            }
        } catch (err) {
            console.error('❌ Error al cargar ventas:', err);
            setError(err.message);
            setShowSpinner(false);
        } finally {
            setLoading(false);
        }
    };

    const calcularEstadisticas = (data) => {
        const total = data.reduce((sum, v) => sum + parseFloat(v.total || 0), 0);
        const productos = data.reduce((sum, v) => sum + parseInt(v.cantidad || 0), 0);
        const hoy = new Date().toISOString().split('T')[0];
        const ventasHoy = data
            .filter(v => v.fecha === hoy)
            .reduce((sum, v) => sum + parseFloat(v.total || 0), 0);
        
        setStats({
            totalVentas: total,
            productosVendidos: productos,
            ventasHoy: ventasHoy,
            clientesNuevos: 3 // Estimado
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>📊 Ventas</h1>
                <p className={styles.subtitle}>Panel de control de ventas e ingresos</p>
            </div>

            {error && (
                <div className={styles.errorBox}>
                    <p>❌ {error}</p>
                </div>
            )}

            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.cardPrimary}`}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>Total Ventas</p>
                        <h3 className={styles.statValue}>${stats.totalVentas.toLocaleString('es-CO')}</h3>
                        <span className={styles.statMeta}>Últimos 30 días</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.cardSuccess}`}>
                    <div className={styles.statIcon}>🎸</div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>Productos Vendidos</p>
                        <h3 className={styles.statValue}>{stats.productosVendidos}</h3>
                        <span className={styles.statMeta}>Unidades totales</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.cardWarning}`}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>Ventas Hoy</p>
                        <h3 className={styles.statValue}>${stats.ventasHoy.toLocaleString('es-CO')}</h3>
                        <span className={styles.statMeta}>+15% vs ayer</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.cardInfo}`}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>Clientes Nuevos</p>
                        <h3 className={styles.statValue}>{stats.clientesNuevos}</h3>
                        <span className={styles.statMeta}>Esta semana</span>
                    </div>
                </div>
            </div>

            <div className={styles.tableCard}>
                <h2>Ventas Recientes</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.id}>
                                <td>#{venta.id}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.cliente}</td>
                                <td>{venta.producto}</td>
                                <td>{venta.cantidad}</td>
                                <td className={styles.price}>${parseFloat(venta.total).toLocaleString('es-CO')}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${
                                        venta.estado === 'Completado' ? styles.statusSuccess : styles.statusPending
                                    }`}>
                                        {venta.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showSpinner && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Cargando ventas...</span>
                </div>
            )}
        </div>
    );
};

export default Ventas;
