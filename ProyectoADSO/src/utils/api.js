// API Utility - Manejo de peticiones con autenticación JWT
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Función helper para hacer peticiones autenticadas a la API
 * @param {string} endpoint - Ruta del endpoint (ej: '/productos')
 * @param {object} options - Opciones de fetch (method, body, etc.)
 * @returns {Promise} - Respuesta JSON de la API
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Si el token expiró o no es válido
    if (response.status === 401) {
      console.warn('⚠️ Token expirado o inválido');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/Administracion/LoginForm';
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en fetchWithAuth:', error);
    throw error;
  }
};

/**
 * Función para hacer peticiones GET sin autenticación (endpoints públicos)
 * @param {string} endpoint - Ruta del endpoint
 * @returns {Promise} - Respuesta JSON de la API
 */
export const fetchPublic = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en fetchPublic:', error);
    throw error;
  }
};

/**
 * Función para subir archivos (FormData)
 * @param {string} endpoint - Ruta del endpoint
 * @param {FormData} formData - Datos del formulario
 * @returns {Promise} - Respuesta JSON de la API
 */
export const uploadFile = async (endpoint, formData) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...(token && { 'Authorization': `Bearer ${token}` })
    // No incluir Content-Type para FormData, el navegador lo establece automáticamente
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/Administracion/LoginForm';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en uploadFile:', error);
    throw error;
  }
};

export default { fetchWithAuth, fetchPublic, uploadFile };
