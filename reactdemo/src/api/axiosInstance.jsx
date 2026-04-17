import axios from 'axios';
import { store } from '../redux/store';
import { logoutUser } from '../redux/actions/authAction';
import { updateTokens } from '../redux/slices/authSlice';
import { ROUTE_PATH } from '../utils/constants';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state?.auth?.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use((response) => {
    console.log('AxiosInstance Response ===> ', response.data);
    return response.data;
}, async (error) => {
    const originalRequest = error?.config;
    console.log('AxiosInstance Error Response ===> ', error?.response);
    // Handle session expiration or unauthorized access
    if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log('Unauthorized access - potential session expiration');
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        const dispatch = store?.dispatch;
        try {
            const state = store.getState();
            const refresh_token = state?.auth?.refreshToken; // Retrieve the stored refresh token.
            // Make a request to your auth server to refresh the token.
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/refresh-token`, {
                refreshToken: refresh_token,
            });
            const { accessToken, refreshToken } = response.data;
            dispatch(updateTokens({
                accessToken,
                refreshToken,
            }));
            // Update the authorization header with the new access token.
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
            // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
            console.error('Get new refresh token failed ===> ', refreshError);
            window.location.href = ROUTE_PATH.LOGIN;
            dispatch(logoutUser());
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
});

export default axiosInstance;