import styles from './App.module.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Contacto from './Pages/Contacto.jsx'
import Productos from './Pages/Productos.jsx';
import Administracion from './Pages/Administracion.jsx';

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
          </Routes>
      </main>
      <Footer className={styles.footer} />
    </>
  )
}

export default App

