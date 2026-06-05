import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export async function registerUser(name, email, password) {
  const response = await axios.post(
    `${API_URL}/register`,
    { name, email, password },
    { withCredentials: true }
  );
  return response.data;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
}

export async function getProfile() {
  const response = await axios.get(`${API_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
}
