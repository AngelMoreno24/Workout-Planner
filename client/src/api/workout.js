import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const Signin = async (info) =>
  await API.post("/account/login", {
    email: info.email,
    password: info.password
  });
  

export const Signup = async (info) =>
  

  API.post("/account/register", {
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    password: info.password
  });



export const getWorkouts = async (token, date) =>
  await API.get(`/workout/get${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/workout/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
    category: info.category,
    name: info.name,
    sets: info.sets,
    reps: info.reps,
    weight: info.weight,
    time: info.time
  });