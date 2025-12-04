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

            {/* Recordar como hacer anidamiento de rutas en ReactRouter con index este
            lo que hace es que pone unas rutas dentro de otras en donde tengamos colocado todas nuestras rutas */}
            
            <Route path='/Administracion' element={<Administracion />}>            
                <Route index element={<LoginForm />} />
                <Route path='LoginForm' element={<LoginForm />} />
                <Route path='RegisterForm' element={<RegisterForm />} />                
            </Route>

            <Route path='/Administracion/BuscarProducto' element={<BuscarProducto />}/>

          </Routes>
      </main>
      <Footer className={styles.footer} />
    </>
  )
}

export default App