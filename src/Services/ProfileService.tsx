import axiosInstance from '../Interceptor/AxiosInterceptor';

const path_URL = "/api/v1/profile";

const getProfile = async (id: any) => {
    return axiosInstance.get(`${path_URL}/get/${id}`)
        .then(res => {
            console.log("executed getProfile successfully, response:", res);
            return res.data;
        })
        .catch(error => {
            console.error("Error in getProfile:", error);
            throw error;
        });
}

const updateProfile = async (profile: any) => {
    return axiosInstance.put(`${path_URL}/update`, profile)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getAllProfile = async () => {
    return axiosInstance.get(`${path_URL}/getAll`)
        .then(result => result.data)
        .catch(error => { throw error })
}

const getAllStudentsProfile = async () => {
    return axiosInstance.get(`${path_URL}/getAllStudentsProfiles`)
        .then(result => result.data)
        .catch(error => { throw error });
}

export { getProfile, updateProfile, getAllProfile, getAllStudentsProfile };
