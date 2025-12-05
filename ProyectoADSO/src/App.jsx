import styles from './App.module.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Contacto from './Pages/Contacto.jsx'
import Productos from './Pages/Productos.jsx';

// 1. Unificamos la importación del Layout de Administración
import AdministracionLayout from './Pages/Administracion.jsx';

import LoginForm from './Components/LoginForm/LoginForm.jsx'; 
import RegisterForm from './Components/RegisterForm/RegisterForm.jsx';

// 2. CORRECCIÓN AQUÍ: Agregamos la carpeta a la ruta
import BuscarProducto from './Pages/AdministracionPages/BuscarProducto/BuscarProducto.jsx';

import PublicLayout from './layouts/PublicLayout.jsx'; 
import Dashboard from './layouts/Dashboard.jsx'; 
import EditarProducto from "./Pages/AdministracionPages/EditarProducto/EditarProducto.jsx";
import EliminarProducto from './Pages/AdministracionPages/EliminarProducto/EliminarProducto.jsx';
import AgregarProducto from './Pages/AdministracionPages/AgregarProducto/AgregarProducto.jsx';
import Ventas from './Pages/AdministracionPages/Ventas/Ventas.jsx';
import Usuarios from './Pages/AdministracionPages/Usuarios/Usuarios.jsx';
import Perfil from './Pages/AdministracionPages/Perfil/Perfil.jsx';

function App() {
  return (
      <Routes>          
          {/* 1. RUTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
              <Route path='/' element={<Home />}/>
              <Route path='/Contacto' element={<Contacto />}/>
              <Route path='/Productos' element={<Productos />}/>
              
              {/* Rutas de Login/Register */}
              {/* Usamos AdministracionLayout aquí */}
              <Route path='/Administracion' element={<AdministracionLayout />}>
                  <Route index element={<LoginForm />} />
                  <Route path='LoginForm' element={<LoginForm />} />
                  <Route path='RegisterForm' element={<RegisterForm />} />
              </Route>
          </Route>
          
          {/* 3. RUTAS PROTEGIDAS/DASHBOARD */}
          <Route path='/admin' element={<Dashboard />}>
              <Route path='BuscarProducto' element={<BuscarProducto />}/>
              <Route path='EditarProducto' element={<EditarProducto />}/>
              <Route path='EliminarProducto' element={<EliminarProducto />}/>
              <Route path='AgregarProducto' element={<AgregarProducto />}/>
              <Route path='Ventas' element={<Ventas />}/>
              <Route path='Usuarios' element={<Usuarios />}/>
              <Route path='Perfil' element={<Perfil />}/>
          </Route>

      </Routes>
  )
}
export default App