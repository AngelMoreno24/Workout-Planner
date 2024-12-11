import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./css/Login.css";
import { Link } from 'react-router-dom';
import {Signin} from '../api/login.js'

const Login = () => {

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const login = async (event) =>{
      event. preventDefault()
        try{

          const user = {
            email: "angel@email.com",
            password: "123qwe123"
          }


          const response = await Signin(user);

          console.log(response.data)
        }catch(error){
          console.log(error)
        }

    };
    
    const register = () => {

      console.log("going to register page");
      
    }

  const asd = "asd";
  return (
    <div >

      <h2>Login</h2>

        <form onSubmit={login}>
          
          <div className='grid'>
            
          <p>Email:</p>
          <input type="text" />
          <p>password:</p>
          <input type="text" />
          </div>

          <button onClick={login}>Login</button>
        </form> 


          <Link style={{color: 'red'}} to="/Signup">Go to Signup Page</Link>
            
    </div>
  );
}

export default Login
