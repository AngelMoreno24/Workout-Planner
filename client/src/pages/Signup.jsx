import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./css/Login.css"

const Login = () => {

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const Signup = () =>{
        try{

          const user = {
            email: "asd",
            password: "asdf"
          }


          axios.post(`${BASE_URL}/account/register`, { user })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })

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
          <input type="text" />
          <p>password:</p>
          <input type="text" />
          </div>

          <button onClick={Signup}>Register</button>

        </form> 

            
    </div>
  );
}

export default Login
