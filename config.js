const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'placeholder' // Cambia 'placeholder' por la URL de tu sitio en producción
  : 'http://localhost:3003';

module.exports = { PAGE_URL };