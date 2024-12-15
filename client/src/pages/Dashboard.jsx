import React, { useEffect, useState } from 'react'
import "./css/Dashboard.css"
import { addWorkout } from '../api/workout'
import { Chart } from "react-google-charts";
import {getWorkoutsByDate} from '../api/workout'
const Home = () => {
  

  const [token, setToken] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');


  const [workouts, setWorkouts] = useState([]);
  const [workoutCards, setWorkoutCards] = useState([]);
  const [data, setData] = useState([
    ["Workouts", "Workouts today"],
  ]);
 
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // 2024
    const month = currentDate.getMonth() + 1; // 12 (January is 0)
    const day = currentDate.getDate(); // 14
    getWorkoutsData(`${year}-${month}-${day}`); // Fetch workouts for the initial date

  },[])


  const getWorkoutsData = async (selectedDate) => {
    try {
      
      console.log(selectedDate)
      const data = { date: selectedDate };
      const response = await getWorkoutsByDate(localStorage.getItem('token'), data);

      if (response.status === 200) {
        setWorkouts(response.data);
        console.log(response.data)
      }
      console.log(response.status)
    } catch (error) {
      console.error(error);
    }
  };
  
    useEffect(() => {
      setPieData();
    }, [workouts]);
  

    const setPieData = ()=>{
    
      console.log('workouts')
      console.log(workouts)
      let categoryCount = {}; // This will track the counts of each category
      workouts.map((workout)=>{

        const count = (categoryCount[workout.category] || 0) + 1;
        categoryCount[workout.category] = count;
      })

      console.log('categoryCount')
        console.log(categoryCount)
      // Convert to the desired format
      const dataa = [["Workouts", "Workouts today"]];
      for (const [category, count] of Object.entries(categoryCount)) {
        dataa.push([category, count]);
      }
      setData(dataa)
      console.log('dataa')
        console.log(dataa)
    }

  const add = async () => {

    try{

      const data = {
        category,
        name,
        sets,
        reps,
        weight,
        time
      }
      
      const response = await addWorkout(token, data)
      console.log(response.status);
      
    }catch(error){
      console.log(error);
    }

  }

  
  const options = {
    title: "Workout Categories",
    pieSliceText: "label",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 12,
      },
    },
  };



  return (

    <div className='center'>
      <div className='grid-layout'>
        

      <div className='card'>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"270px"}
        />
      </div>



        <div className='card'>

          <h2>Add new Workout</h2>
          <div className='grid-addWorkout'>
            
            <input 
              type="text" 
              placeholder="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input 
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <input type="submit" value={'Add'} onClick={add}/>
        </div>

        

      </div>
    </div>
  )
}

export default Home
