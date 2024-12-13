import React, { useEffect, useState } from 'react'
import "./css/Dashboard.css"
import { addWorkout } from '../api/workout'

const Home = () => {
  

  const [token, setToken] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');


  useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[])


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


  return (

    <div className='center'>
      <div className='grid-layout'>
        
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

        
        <div className='card'>

          <h2>Add new Workout</h2>
          <div className='grid-addWorkout'>
            
            <input type="text" placeholder="category"/>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="sets"/>
            <input type="text" placeholder="reps"/>
            <input type="text" placeholder="weight"/>
            <input type="text" placeholder="time"/>
          </div>
          <input type="submit" value={'Add'}/>
        </div>
        <div className='card'>

          <h2>Add new Workout</h2>
          <div className='grid-addWorkout'>
            
            <input type="text" placeholder="category"/>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="sets"/>
            <input type="text" placeholder="reps"/>
            <input type="text" placeholder="weight"/>
            <input type="text" placeholder="time"/>
          </div>
          <input type="submit" value={'Add'}/>
        </div>
        <div className='card'>

          <h2>Add new Workout</h2>
          <div className='grid-addWorkout'>
            
            <input type="text" placeholder="category"/>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="sets"/>
            <input type="text" placeholder="reps"/>
            <input type="text" placeholder="weight"/>
            <input type="text" placeholder="time"/>
          </div>
          <input type="submit" value={'Add'}/>
        </div>

      </div>
    </div>
  )
}

export default Home
