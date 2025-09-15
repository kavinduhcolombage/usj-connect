import axios from 'axios';
import Host_Url from './HostUrl';
import { removeUser } from '../Slices/UserSlice';

const base_URL = `${Host_Url}/api/v1/auth`;

const loginUser = async (login: any) => {
    return axios.post(`${base_URL}/login`, login)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const navigateToLogin=(navigate:any)=>{
    localStorage.removeItem('token');
    removeUser();
    navigate("/login");
}

export { loginUser , navigateToLogin};