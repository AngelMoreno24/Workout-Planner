import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./css/Signup.css"
import {Signup} from '../api/account.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
    
    
  const register = async (event) =>{
    event.preventDefault()
      try{

        const user = {
          firstName,
          lastName,
          email,
          password
        }


        const response = await Signup(user);
        if(response.status == 201){
          
          navigate('/');
        }
      }catch(error){
        console.log(error)
      }

  };

  return (
    <div >

      <h2>Signup</h2>

      
      <form onSubmit={register}>
          
        <div className='grid2'>
            
          <p>firstName:</p>
          <input 
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
          <p>lastName:</p>
          <input 
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
          <p>Email:</p>
          <input 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <p>password:</p>
          <input 
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <input type="submit" />
      </form> 

            
    </div>
  );
}

export default Login
