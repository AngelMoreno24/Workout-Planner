import React, { useEffect, useState } from 'react'
import "./css/Workouts.css"
import { addWorkout } from '../api/workout'

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
const Workouts = () => {


  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  useEffect(()=>{
    console.log(value.$y);
    console.log(value.$M+1);
    console.log(value.$D);
  },[value])
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
        </div>
      </div>

    </div>
  )
}

export default Workouts
