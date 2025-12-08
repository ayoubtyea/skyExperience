// For local development, default to the local API unless REACT_APP_API_URL is set.
// In production, set REACT_APP_API_URL to your deployed API URL.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://skyexperience-1.onrender.com';

export default API_BASE_URL;