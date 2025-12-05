import React from 'react';
import styles from './Nosotros.module.css';

const Nosotros = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Sobre Nosotros</h1>
                
                <div className={styles.projectInfo}>
                    <p className={styles.description}>
                        Bienvenido a <strong>Melodía Instrumental</strong>. Este sitio web es un proyecto académico desarrollado como parte del programa de 
                        Análisis y Desarrollo de Software (ADSO) del SENA.
                    </p>
                    
                    <div className={styles.studentInfo}>
                        <h3>Desarrollado por:</h3>
                        <p>Santiago Alarcon</p>
                        <span className={styles.badge}>Estudiante ADSO</span>
                    </div>
                </div>

                <div className={styles.constructionNotice}>
                    <span className={styles.icon}>🚧</span>
                    <h2>Sitio en Construcción</h2>
                    <p>
                        Actualmente estamos trabajando en mejorar la experiencia de nuestra tienda. 
                        Algunas funcionalidades pueden no estar disponibles o estar sujetas a cambios.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Nosotros;
