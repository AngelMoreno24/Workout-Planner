import React, { useEffect, useState } from 'react'
import "./css/Workouts.css"
import { getWorkoutsByDate } from '../api/workout'

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
const Workouts = () => {


  const [value, setValue] = React.useState(dayjs('2024-12-10'));
  const [token, setToken] = useState('');
  const [date, setDate] = useState('');
  const [workouts, setWorkouts] = useState([]);


  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  },[])



  useEffect(()=>{
    console.log(value.$y);
    console.log(value.$M+1);
    console.log(value.$D);
    setDate(`${value.$y}-${value.$M+1}-${value.$D}`);
    getWorkouts()
  },[value])



  const getWorkouts = async () =>{
      try{

        const data = {
          date
        }


        console.log(token)
        const response = await getWorkoutsByDate(token, data);

        if(response.status == 200) {
          console.log(response.data)
          await setWorkouts(response.data)
          workouts.map((item, index)=>{

            console.log("asddasdsa")
            console.log(item.category)

          })

        }
        console.log(response.status)
      }catch(error){
        console.log(error)
      }

  };

  const createWorkoutCards = () => {

  }


  return (

    <div className='center'>
      <div className='grid-layout'>
        
        <div className='card'>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
          </LocalizationProvider>
        </div>

        

        <div className='card'>

          <h2>Add new Workout</h2>
          
          <div>
          {workouts.map((exercise) => (
                    <div key={exercise._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        <h2>{exercise.name}</h2>
                        <p><strong>Category:</strong> {exercise.category}</p>
                        <p><strong>Sets:</strong> {exercise.sets}</p>
                        <p><strong>Reps:</strong> {exercise.reps}</p>
                        <p><strong>Weight:</strong> {exercise.weight} kg</p>
                        <p><strong>Time:</strong> {exercise.time} mins</p>
                    </div>
                ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Workouts
