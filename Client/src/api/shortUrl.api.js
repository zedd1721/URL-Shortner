import axiosInstance from '../utils/axiosInstance';
export const createShortUrl = async(originalUrl, slug) =>{

    const {data}=await axiosInstance.post(`/api/create`, {originalUrl, slug});
    return data;
}
