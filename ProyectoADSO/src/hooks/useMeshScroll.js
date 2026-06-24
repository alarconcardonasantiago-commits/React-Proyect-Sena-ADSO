// src/hooks/useMeshScroll.js
// Hook que actualiza CSS custom properties al hacer scroll
// para dar vida al mesh gradient de fondo.
import { useEffect } from 'react';

/**
 * Enlaza el scroll de la página con variables CSS en el elemento raíz.
 * Esto permite que los gradientes de fondo reaccionen al desplazamiento.
 *
 * Variables CSS generadas:
 *  --scroll-y  : progreso vertical 0-1 del viewport
 */
const useMeshScroll = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
            document.documentElement.style.setProperty('--scroll-y', progress.toFixed(4));
        };

        // Inicializar
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};

export default useMeshScroll;
