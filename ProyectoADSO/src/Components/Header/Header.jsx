import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Contacto from '../../Pages/Contacto'
import Productos from '../../Pages/Productos'

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Melodía Instrumental</h1>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <Link to="/"><li className={styles.active}>Inicio</li></Link>
          <Link to="/Productos"><li className={styles.active}>Productos</li></Link>
          <Link to="/Contacto"><li className={styles.active}>Contacto</li></Link>
          <Link to="/Administracion"><li className={styles.active}>Administración</li></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
