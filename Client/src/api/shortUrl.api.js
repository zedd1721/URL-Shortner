import axios from 'axios'


const BACKEND_API = "http://localhost:5000";
export const createShortUrl = async(originalUrl) =>{

    const {data}=await axios.post(`${BACKEND_API}/api/create`, {originalUrl});
    return data;
}
