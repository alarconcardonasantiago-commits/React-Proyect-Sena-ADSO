import styles from './App.module.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Contacto from './Pages/Contacto.jsx'
import Productos from './Pages/Productos.jsx';
import Administracion from './Pages/Administracion.jsx';
import LoginForm from './Components/LoginForm/LoginForm.jsx'; 
import RegisterForm from './Components/RegisterForm/RegisterForm.jsx';
import BuscarProducto from './Pages/AdministracionPages/BuscarProducto.jsx';
import PublicLayout from './layouts/PublicLayout.jsx'; 
import Dashboard from './layouts/Dashboard.jsx'; // Nuevo layout para la zona protegida
import AdministracionLayout from './Pages/Administracion.jsx';

function App() {
  return (
      <Routes>          
          {/* 1. RUTAS PÚBLICAS: USAN EL LAYOUT CON HEADER Y FOOTER */}
          <Route element={<PublicLayout />}>
              <Route path='/' element={<Home />}/>
              <Route path='/Contacto' element={<Contacto />}/>
              <Route path='/Productos' element={<Productos />}/>
              <Route path='/Administracion' element={<Administracion />}>
              <Route index element={<LoginForm />} />
              <Route path='LoginForm' element={<LoginForm />} />
              <Route path='RegisterForm' element={<RegisterForm />} />
          </Route>
          </Route>
          
          {/* 2. RUTAS DE AUTENTICACIÓN: SOLO EL CONTENEDOR DE LOGIN/REGISTER */}
          {/* AdministracionLayout ya maneja las pestañas y el footer condicional */}
          

          {/* 3. RUTAS PROTEGIDAS/DASHBOARD: USAN EL LAYOUT SIN HEADER/FOOTER */}
          <Route path='/admin' element={<Dashboard />}>
              <Route path='BuscarProducto' element={<BuscarProducto />}/>
              {/* <Route path='CrearProducto' element={<CrearProducto />}/> */}
          </Route>

      </Routes>
  )
}
export default App