import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const login = async (token, info) =>{
  
  const {firstName, lastName, email, password } = info;

  API.get("/account/login", {
    headers: { Authorization: `Bearer ${token}` },
  });

}

export const getWorkouts = async (token, date) =>
  await API.get(`/workout/get${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/workout/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });