import axios from "axios";

// Pre-configured axios instance with the backend's base URL, so components can call api.get("/tours") directly
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;