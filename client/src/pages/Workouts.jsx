import React, { useEffect, useState } from 'react';
import "./css/Workouts.css";
import { getWorkoutsByDate } from '../api/workout';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
const Workouts = () => {
  const [value, setValue] = useState(dayjs('2024-12-11'));
  const [token, setToken] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [workoutCards, setWorkoutCards] = useState([]);

  // Function to create workout cards
  const createWorkoutCards = () => {
    const cards = workouts.map((exercise) => (
      <div
        key={exercise._id}
        className="card"
      >
        <h2>{exercise.name}</h2>
        <p>
          <strong>Category:</strong> {exercise.category}
        </p>
        <p>
          <strong>Sets/Reps:</strong> {`${exercise.sets} x ${exercise.reps}`}
        </p>
        <p>
          <strong>Weight:</strong> {exercise.weight} kg
        </p>
        <p>
          <strong>Time:</strong> {exercise.time} mins
        </p>
      </div>
    ));
    setWorkoutCards(cards);
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    getWorkouts(`${value.$y}-${value.$M + 1}-${value.$D}`); // Fetch workouts for the initial date
  }, []);

  useEffect(() => {
    const formattedDate = `${value.$y}-${value.$M + 1}-${value.$D}`;
    getWorkouts(formattedDate);
  }, [value]);

  const getWorkouts = async (selectedDate) => {
    try {
      const data = { date: selectedDate };
      const response = await getWorkoutsByDate(localStorage.getItem('token'), data);

      if (response.status === 200) {
        setWorkouts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    createWorkoutCards();
  }, [workouts]);

  return (
    <div className="center">
      <div className="grid-layout">
        <div className="calenderCard">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
          </LocalizationProvider>
        </div>
        
        {workoutCards}
      </div>
    </div>
  );
};

export default Workouts;