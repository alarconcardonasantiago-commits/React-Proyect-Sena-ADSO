import React from 'react';
import styles from './Contacto.module.css';

const Contacto = () => {
    return (
        <div className={styles.contacto}>
            <h1>Contacto</h1>
            <p>Página de contacto en construcción.</p>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text" id="nombre" name="nombre" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="mensaje">Mensaje: </label>
                    <textarea id="mensaje" name="mensaje" required></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
        </div>
    );
}


export default Contacto;
