// En producción usa URLs relativas, en desarrollo usa localhost
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5001');

export { API_URL };
