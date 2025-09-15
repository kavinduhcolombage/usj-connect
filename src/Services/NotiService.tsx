import axiosInstance from '../Interceptor/AxiosInterceptor';

const path_URL = "/api/v1/notification";

const getNotifications = async (id: any) => {
    return axiosInstance.get(`${path_URL}/get/${id}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const readNotification = async (id: any) => {
    return axiosInstance.put(`${path_URL}/read/${id}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

export { getNotifications, readNotification };