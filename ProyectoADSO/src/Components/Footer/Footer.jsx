import styles from './Footer.module.css'

function Footer () {
    return (
        <footer className={styles.footer}> {/* Usamos <Footer> semántico */}
            
            <div className={styles.footerContent}> {/* Nuevo contenedor Grid */}
                
                {/* COLUMNA 1: Copyright e Info Legal */}
                <div className={styles.col}>
                    <p>© 2023 Proyecto ADSO.</p>
                    <p>Todos los derechos reservados.</p>
                    <p>Desarrollado por Santiago Alarcon</p>
                </div>
                
                {/* COLUMNA 2: Enlaces Rápidos */}
                <div className={styles.col}>
                    <h4>Navegación</h4>
                    <a href="/">Inicio</a>
                    <a href="/Productos">Productos</a>
                    <a href="/Contacto">Contacto</a>
                    <a href="/Administracion/LoginForm">Administración</a>
                </div>

                {/* COLUMNA 3: Información de Contacto */}
                <div className={styles.col}>
                    <h4>Contáctanos</h4>
                    <span>📧 correo@example.com</span>
                    <span>📞 +57 300 123 4567</span>
                    <span>📍 Calle Falsa 123</span>
                </div>

                {/* COLUMNA 4: Redes Sociales / Horario (Ejemplo) */}
                <div className={styles.col}>
                    <h4>Síguenos</h4>
                    <span>Facebook</span>
                    <span>Instagram</span>
                    <span>Twitter/X</span>
                    <span>Horario: Lunes a Viernes 9am-7pm</span>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer