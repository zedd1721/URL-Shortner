import axios from "axios";

const BACKEND_API = "http://localhost:5000";

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_API}/api/auth/login`,
      { email, password },
      { withCredentials: true }
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
    const { data } = await axios.post(
      `${BACKEND_API}/api/auth/register`,
      { name, email, password },
      { withCredentials: true }
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
  const { data } = await axios.get(`${BACKEND_API}/api/auth/logout`);
  return data;
};
