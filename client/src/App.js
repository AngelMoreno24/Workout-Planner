import React, {useEffect, useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  const [backend, setBackend] = useState([{}]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackend(data)
      }
    )
  },[])
  return (
    
    <div>
      <BrowserRouter>
      <Routes >

        <Route path="/Home" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login/>}></Route>
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
