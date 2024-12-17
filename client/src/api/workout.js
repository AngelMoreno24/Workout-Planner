import axios from "axios";


const URL =  process.env.REACT_APP_API_BASE_URL;
 
export const getWorkouts = async (token, date) =>
  await axios.get(`${URL}/workout/get${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) => {
  return await axios.post(
      `${URL}/workout/add`, 
      {
      category: data.category,
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      weight: data.weight,
      time: data.time,
      },
      {
      headers: { Authorization: `Bearer ${token}` },
      }
);
};


export const getWorkoutsByDate = async (token, data) => {
  return await axios.post(
      `${URL}/workout/getDate`, 
      {
        date: data.date,
      },
      {
      headers: { Authorization: `Bearer ${token}` },
      }
);
};