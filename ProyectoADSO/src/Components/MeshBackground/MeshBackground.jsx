// src/Components/MeshBackground/MeshBackground.jsx
// Fondo mesh gradient oscuro reutilizable con reacción al scroll.
// Úsalo en cualquier página agregando <MeshBackground /> como primer hijo.
import React from 'react';
import styles from './MeshBackground.module.css';

const MeshBackground = () => (
    <div className={styles.meshWrapper} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
        <div className={`${styles.orb} ${styles.orb5}`} />
        <div className={styles.noise} />
    </div>
);

export default MeshBackground;
