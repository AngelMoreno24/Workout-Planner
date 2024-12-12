import React, {useEffect} from 'react'

const Workouts = () => {


  useEffect( () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0
    const day = currentDate.getDate();
  
  console.log(`${year}-${month}-${day}`); // Output: 2024-12-11
  })

  return (
    <div>
      
    </div>
  )
}

export default Workouts
