# Melodía Instrumental - E-Commerce y Dashboard

Este es el frontend de "Melodía Instrumental", un e-commerce y sistema de administración de inventarios desarrollado como parte integral del proyecto para el programa **Análisis y Desarrollo de Software (ADSO) - SENA**.

## 🚀 Tecnologías Utilizadas

- **React.js y Vite**: Librería base para construir interfaces de usuario reactivas y empaquetador ultrarrápido para una experiencia de desarrollo fluida.
- **React Router DOM**: Para la navegación estructurada tipo SPA (Single Page Application) entre el área pública y la de administración.
- **Context API**: Manejo de estado global para funcionalidades complejas como el Carrito de Compras.
- **CSS Modules y Diseño Premium**: Interfaces estilizadas usando enfoques de UI modernos, como tarjetas neumórficas/glassmorphism y micro-animaciones para brindar una sensación profesional.
- **Docker y Nginx**: Empaquetado multietapa (multi-stage) optimizado para servir los archivos estáticos en producción a gran velocidad.

## 🎯 Objetivo Educativo

Este frontend fue diseñado para cumplir con los estándares de usabilidad, modularidad de componentes y conexión asíncrona a APIs externas (Node.js). Demuestra la aplicación de:
- Consumo de API RESTful con manejo de tokens JWT.
- Vistas condicionales (Pública vs Administrador).
- Interfaces amigables con el usuario y adaptabilidad (Responsive Design).
- Pantalla de Checkout completa para cierre de ventas.

## ⚙️ Instalación (Con Docker)

Si utilizas el esquema unificado de orquestación, desde la raíz del proyecto (donde se ubica `docker-compose.yml`), basta con ejecutar:

```bash
docker-compose up -d --build
```

El frontend estará accesible localmente en el puerto `80`.
