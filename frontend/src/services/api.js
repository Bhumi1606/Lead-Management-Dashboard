import axios from 'axios';

// Replace with your ACTUAL Render backend URL
const RENDER_BACKEND_URL = 'https://lead-management-dashboard-ea18.onrender.com/api';

const api = axios.create({
  // This ensures that even if Vercel fails to read the ENV, it hits your live backend
  baseURL: process.env.REACT_APP_API_URL || RENDER_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;