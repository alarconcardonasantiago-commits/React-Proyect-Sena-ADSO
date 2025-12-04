import styles from './App.module.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Contacto from './Pages/Contacto.jsx'
import Productos from './Pages/Productos.jsx';

// Importa el Layout (El esqueleto con los botones)
import Administracion from './Pages/Administracion.jsx';

// Importa los componentes refactoreados
// Asegúrate de que la ruta de importación sea la correcta donde guardaste los archivos
import LoginForm from './Components/LoginForm/LoginForm.jsx'; 
import RegisterForm from './Components/RegisterForm/RegisterForm.jsx';
import BuscarProducto from './Pages/AdministracionPages/BuscarProducto.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Contacto' element={<Contacto />}/>
            <Route path='/Productos' element={<Productos />}/>
            
            {/* 🔴 CAMBIO IMPORTANTE AQUÍ: RUTAS ANIDADAS 
                La ruta 'Administracion' ahora tiene etiqueta de apertura y cierre.
                Dentro de ella van sus "hijos" que se verán en el <Outlet />.
            */}
            <Route path='/Administracion' element={<Administracion />}>
                
                {/* 'index' significa: Si entran a "/Administracion" pelado, 
                   muéstrame el LoginForm por defecto.
                */}
                <Route index element={<LoginForm />} />
                
                {/* Las rutas hijas (se suman a la del padre) */}
                <Route path='LoginForm' element={<LoginForm />} />
                <Route path='RegisterForm' element={<RegisterForm />} />
                
            </Route>

            {/* NOTA: Dejamos 'BuscarProducto' FUERA del anidamiento anterior.
               ¿Por qué? Porque cuando el usuario entre aquí, NO queremos 
               que vea las pestañas de Login/Register arriba. Queremos que vea
               la pantalla de buscar producto limpia.
            */}
            <Route path='/Administracion/BuscarProducto' element={<BuscarProducto />}/>

          </Routes>
      </main>
      <Footer className={styles.footer} />
    </>
  )
}

export default App