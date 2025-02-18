import axios from "axios";

// ✅ API Base URL
const BASE_URL = "https://api.areafiftysix.com/api";

// ✅ Create Axios Instance with Global Config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor to Automatically Attach Token to Requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ Auto-add Bearer Token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor to Handle Unauthorized Errors Globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // ✅ Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiClient;
