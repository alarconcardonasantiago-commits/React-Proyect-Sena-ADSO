import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Nosotros from '../../Pages/Nosotros'
import Productos from '../../Pages/Productos'
import Home from '../../Pages/Home'
import { useCart } from '../../context/CartContext'

import { useState } from 'react'

function Header() {
  const { cartCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <a href="/"className={styles.linkText}><h1 className={styles.logo}>Melodía Instrumental</h1></a>
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={handleMenuToggle}>
          ☰
        </div>
        <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
          <Link to="/" className={styles.linkText} onClick={() => setMenuOpen(false)}><li className={styles.active}>Inicio</li></Link>
          <Link to="/Productos" className={styles.linkText} onClick={() => setMenuOpen(false)}><li className={styles.active}>Productos</li></Link>
          <Link to="/Nosotros" className={styles.linkText} onClick={() => setMenuOpen(false)}><li className={styles.active}>Nosotros</li></Link>
          <Link to="/Administracion" className={styles.linkText} onClick={() => setMenuOpen(false)}><li className={styles.active}>Administración</li></Link>
          
          <button onClick={() => { toggleCart(); setMenuOpen(false); }} className={styles.cartButton} aria-label="Abrir carrito">
            🛒
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </ul>
      </nav>
    </header>
  )
}

export default Header
