import { type User } from '../types/User';
import axiosInstance from '../Interceptor/AxiosInterceptor';

const path_URL = '/api/v1/usercontroller';

const registerUser = async (user: User) => {
    return axiosInstance.post(`${path_URL}/signup`, user)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const loginUser = async (user: Pick<User, 'email' | 'password'>) => {
    return axiosInstance.post(`${path_URL}/login`, user)
        .then(res => res.data)
        .catch(error => { throw error; });
}

export { registerUser, loginUser };
