import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Productos from '../../Pages/Productos'
import Home from '../../Pages/Home'

function Header() {
  return (
    <header className={styles.header}>
      <a href="/"className={styles.linkText}><h1 className={styles.logo}>Melodía Instrumental</h1></a>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <Link to="/" className={styles.linkText}><li className={styles.active}>Inicio</li></Link>
          <Link to="/Productos" className={styles.linkText}><li className={styles.active}>Productos</li></Link>
          <Link to="/Nosotros" className={styles.linkText}><li className={styles.active}>Nosotros</li></Link>
          <Link to="/Administracion" className={styles.linkText}><li className={styles.active}>Administración</li></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
