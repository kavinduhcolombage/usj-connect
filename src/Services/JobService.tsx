import axiosInstance from "../Interceptor/AxiosInterceptor";
const path_url = '/api/v1/jobs/';

const postJob = async (job: any) => {
    return axiosInstance.post(`${path_url}post`, job)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const getAllJobs = async () => {
    return axiosInstance.get(`${path_url}getAll`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const getJob = async (id: any) => {
    return axiosInstance.get(`${path_url}get/${id}`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const applyJob = async (id: any, applicant: any) => {
    return axiosInstance.post(`${path_url}apply/${id}`, applicant)
        .then(result => result.data)
        .catch(error => { throw error });
}

const getJobPostedBy = async (id: any) => {
    return axiosInstance.get(`${path_url}postedBy/${id}`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const changeAppStatus = async (application: any) => {
    return axiosInstance.post(`${path_url}changeAppStatus`, application)
        .then(result => result.data)
        .catch(error => { throw error; });
}
export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus };