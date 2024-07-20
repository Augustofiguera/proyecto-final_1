const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'https://salud360.onrender.com' 
  : 'http://localhost:3003';

  const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URL_PROD
  : process.env.MONGO_URL_TEST

module.exports = { PAGE_URL, MONGO_URI };