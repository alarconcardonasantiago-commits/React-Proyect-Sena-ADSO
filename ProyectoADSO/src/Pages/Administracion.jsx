import React, { useState } from 'react'
import styles from './Administracion.module.css'

const Administracion = () => {
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión')

      // ✅ Guardamos el token en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      setSuccess(true)
      setCorreo('')
      setContraseña('')

      console.log('✅ Token guardado:', data.token)
      console.log('👤 Usuario:', data.usuario)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <h1>Panel de Administración</h1>

      <div className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        {error && <p className={styles.error}>❌ {error}</p>}
        {success && <p className={styles.success}>✅ Inicio de sesión exitoso</p>}
      </div>
    </div>
  )
}

export default Administracion
