import React from 'react';
import styles from './Administracion.module.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Administracion = () => {
  const location = useLocation(); // Hook para saber en qué URL estamos

  // Función auxiliar para saber si el link está activo (para estilos CSS)
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={styles.page}>
      <h1>Panel de Administración</h1>    
      
      <div>
        <nav>
           {/* Usa una lista UL para mejor semántica */}
           <ul style={{ display: 'flex', listStyle: 'none', padding: 0, gap: '20px' }}>
              
              <Link to="/Administracion/LoginForm" className={styles.linkText}>
                <li className={`${styles.Login} ${isActive('LoginForm') ? styles.active : ''}`}>
                  Login
                </li>
              </Link>
              
              <Link to="/Administracion/RegisterForm" className={styles.linkText}>
                <li className={`${styles.Register} ${isActive('RegisterForm') ? styles.active : ''}`}>
                  Registrar
                </li>
              </Link>

           </ul>
        </nav>
        <hr className={styles.separator}/>
      </div> 
      
      {/* AQUÍ ES LA MAGIA: 
         El Outlet renderizará <LoginForm /> o <RegisterForm /> 
         dependiendo de la URL, sin que tengas que poner condicionales.
      */}
      <Outlet /> 

    </div>
  )
}

export default Administracion;