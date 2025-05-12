import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials:true,   //This will help us to pass the cookies
})
export default axiosInstance;