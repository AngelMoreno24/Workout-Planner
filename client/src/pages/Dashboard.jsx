import React, { useEffect } from 'react'
import "./css/Dashboard.css"

const Home = () => {
  
  return (

    <div className='center'>
      <div className='grid-layout'>
        
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
