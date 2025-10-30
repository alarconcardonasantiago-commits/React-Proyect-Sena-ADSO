import styles from './Footer.module.css'

function Footer () {
    return (
        <>
            <div className={styles.footer}>
                <p>© 2023 Proyecto ADSO. Todos los derechos reservados.</p>
                <p>Desarrollado por Santiago Alarcon</p>
            </div>
        </>
    )
}

export default Footer