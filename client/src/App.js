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
import Home from "./pages/Home";
function App() {

  
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

       <Route path="/" element={<LoginLayout />}>
          <Route index element={<Signup/>}></Route>
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
