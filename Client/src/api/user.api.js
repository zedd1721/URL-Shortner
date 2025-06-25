import axiosInstance from "../utils/axiosInstance";


export const loginUser = async (email, password) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login',
      { email, password }

    );
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Login failed");
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/auth/register`,
      { name, email, password }
    );
    return data;
  } catch (error) {
    // Axios errors
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    // Network or unexpected errors
    throw new Error(error.message || "Signup failed");
  }
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post(`/api/auth/logout`);
  return data;
};

export const getUser = async() =>{
  const {data} = await axiosInstance.get('/api/auth/me');
  return data;
}

export const getUserUrls = async () => {
  try {
    const { data } = await axiosInstance.get("/api/user/urls"); 
    return data.urls;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Failed to fetch URLs");
  }
};