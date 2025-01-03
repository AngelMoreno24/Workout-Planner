import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./css/Login.css";
import { Link } from 'react-router-dom';
import {Signin} from '../api/account.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      navigate("/dashboard")
    }
  },[])

  const login = async (event) =>{
    event. preventDefault()
      try{

        const user = {
          email,
          password
        }


        const response = await Signin(user);

        if(response.status == 200) {

          const {accessToken} = response.data;
          await localStorage.setItem("token", accessToken);
          
          const token = localStorage.getItem("token");
          console.log(token)
          navigate('/dashboard');
        }

        console.log(response.status)
      }catch(error){
        console.log(error)
      }

  };
  
  return (
    <div >

      <h2>Login</h2>

        <form onSubmit={login}>
          
          <div className='grid'>
            
          <p>Email:</p>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>password:</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <input type="submit" />
        </form> 


          <Link style={{color: 'red'}} to="/Signup">Go to Signup Page</Link>
            
    </div>
  );
}

export default Login
