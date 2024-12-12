import React, {useEffect, useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import LoginLayout from "./components/LoginLayout";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
function App() {

  
  return (
    
    <div>
      <BrowserRouter>
      <Routes >

        <Route path="/Dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        
       <Route path="/Workouts" element={<Layout />}>
          <Route index element={<Workouts/>}></Route>
       </Route>

        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login/>}></Route>
       </Route>

       <Route path="/Signup" element={<LoginLayout />}>
          <Route index element={<Signup/>}></Route>
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
