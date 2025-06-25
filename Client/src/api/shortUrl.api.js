import axiosInstance from '../utils/axiosInstance';
export const createShortUrl = async(originalUrl) =>{

    const {data}=await axiosInstance.post(`/api/create`, {originalUrl});
    return data;
}
