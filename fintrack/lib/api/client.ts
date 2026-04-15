import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                const redirectUrl = window.location.pathname
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = `/login?redirect${redirectUrl}`;
            }
        }

        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient;