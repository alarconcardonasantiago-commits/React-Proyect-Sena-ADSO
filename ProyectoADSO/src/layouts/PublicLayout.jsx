// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import Footer from '../Components/Footer/Footer.jsx';

// Puedes usar un archivo CSS si lo necesitas, pero por ahora no es estrictamente necesario
// import styles from './PublicLayout.module.css'; 

const PublicLayout = () => {
    const location = useLocation();
    
    // 1. Detección de la Zona de Autenticación
    // Identifica si la URL empieza con /Administracion (incluye Login y Register)
    const isAuthArea = location.pathname.startsWith('/Administracion');
    
    // 2. Definición del texto condicional del Footer
    // const footerText = isAuthArea 
    //     ? 'Volver a la tienda' 
    //     : '© 2023 Proyecto ADSO. Todos los derechos reservados.';

    return (
        <>
            <Header />          
            <main>
                {/* El Outlet renderiza la página que corresponde a la ruta actual 
                  (Home, Contacto, Productos, o los formularios de Login/Register 
                  si los mantienes aquí, pero según la última refactorización,
                  solo renderizará Home, Contacto y Productos).
                */}
                <Outlet /> 
            </main>
            <Footer 
                // conditionalText={footerText} 
                // isAuthArea={isAuthArea} 
            />
        </>
    );
}

export default PublicLayout;