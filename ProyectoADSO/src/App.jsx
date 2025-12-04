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
                {/* Otras rutas protegidas pueden ir aquí */}
                

          </Route>

      </Routes>
  )
}
export default App