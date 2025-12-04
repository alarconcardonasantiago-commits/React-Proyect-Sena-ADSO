import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css'; // Asumiendo que tengas estilos propios o usa los de Administracion

const LoginForm = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');

      // Guardar sesión
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      setSuccess(true);
      console.log('✅ Login exitoso');

      // Pequeño delay para mostrar el mensaje de éxito antes de redirigir
      setTimeout(() => {
        navigate('/Administracion/BuscarProducto');
      }, 1000); // 1 segundo de delay visual

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required 
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required 
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      {/* Mensajes de feedback */}
      {error && <p className={styles.error}>❌ {error}</p>}
      {success && <p className={styles.success}>✅ Redirigiendo...</p>}
    </div>
  );
};

export default LoginForm;