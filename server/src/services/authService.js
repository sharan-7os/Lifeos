import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

export const loginUser = async (email, password) => {
  const response = await API.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};