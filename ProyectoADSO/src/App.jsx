import styles from './App.module.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Contacto from './Pages/Contacto.jsx'
import Productos from './Pages/Productos.jsx';
import Administracion from './Pages/Administracion.jsx';
import BuscarProducto from './Pages/AdministracionPages/BuscarProducto.jsx';
// import Login from './Pages/AdministracionPages/Login.jsx';
// import Register from './Pages/AdministracionPages/Register.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Contacto' element={<Contacto />}/>
            <Route path='/Productos' element={<Productos />}/>
            <Route path='/Administracion' element={<Administracion />}/>
            <Route path='/Administracion/BuscarProducto' element={<BuscarProducto />}/>
            {/* <Route path='/Administracion/Login' element={<Login />}/>
            <Route path='/Administracion/Register' element={<Register />}/> */}
          </Routes>
      </main>
      <Footer className={styles.footer} />
    </>
  )
}

export default App

