import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  // Estado local para el formulario de registro
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ⚠️ Asegúrate que esta URL sea la correcta en tu backend
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al registrarse');

      setSuccess(true);
      
      // Opcional: Redirigir al Login después de registrarse
      setTimeout(() => {
        navigate('/Administracion/LoginForm');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre"
            value={formData.nombre} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Correo:</label>
          <input 
            type="email" 
            name="correo"
            value={formData.correo} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="contraseña"
            value={formData.contraseña} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {error && <p className={styles.error}>❌ {error}</p>}
      {success && <p className={styles.success}>✅ Usuario creado con éxito. Ir al Login.</p>}
    </div>
  );
};

export default RegisterForm;