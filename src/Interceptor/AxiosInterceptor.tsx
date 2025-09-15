import axios, { type InternalAxiosRequestConfig } from "axios";

import Host_Url from "../Services/HostUrl";
import { removeUser } from "../Slices/UserSlice";
import { removejwt } from "../Slices/JwtSlice";
import { notifications } from '@mantine/notifications';
import { IconX } from "@tabler/icons-react";

let sessionExpiredNotified = false;

const axiosInstance = axios.create({
    baseURL: `${Host_Url}`
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const setupResponseInterceptor = (navigate: any, dispatch: any) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            sessionExpiredNotified = false;
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {
                if (!sessionExpiredNotified) {
                    sessionExpiredNotified = true;
                    dispatch(removeUser());
                    dispatch(removejwt());                    
                    notifications.show({
                        position: 'top-center',
                        withCloseButton: true,
                        onClose: () => navigate('/login'),
                        onOpen: () => console.log('mounted'),
                        autoClose: 5000,
                        title: "Session Expired",
                        message: 'Your session has expired. Please log in again.',
                        color: 'red',
                        icon: <IconX />,
                        loading: false
                    });
                }
            }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;