import React, {useState, useEffect} from 'react'

const Login = () => {

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [dbMessage, setDbMessage] = useState('');
    const [dbState, setDbState] = useState('');
  
    useEffect(() => {
      fetch(`http://localhost:5000/api`).then(
        response => response.json()
      ).then(
        data => {
          setDbMessage(data.users)
        }
      )
    },[])

  const asd = "asd";
  return (
    <div>
      <h1>Backend Connectivity Test</h1>
      <p><strong>Message:</strong> {dbMessage}</p>
      <p><strong>Database State:</strong> {dbState}</p>
      <p>(0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)</p>
    </div>
  );
}

export default Login
