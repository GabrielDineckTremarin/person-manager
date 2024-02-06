// import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import CustomNavbar from './Components/Navbar/CustomNavbar';
import PeopleList from './Components/PeopleList/PeopleList';
import ContactEdit from './Components/ContactEdit/ContactEdit';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';



function App() {
  
    return ( 

      <>
      <CustomNavbar></CustomNavbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />}></Route>

          <Route path="/list" element={ <PeopleList />}></Route>
           
          <Route path="/edit/:id" element={ <ContactEdit />}></Route>

          <Route path="/login" element={ <Login />}></Route>

          <Route path="/signup" element={ <Signup />}></Route>

           
        </Routes>
      </BrowserRouter>
      </>

    ); 
} 

export default App
