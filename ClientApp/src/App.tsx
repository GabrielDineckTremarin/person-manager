// import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 

import './App.css'

import CustomNavbar from './Components/Navbar/CustomNavbar';
import PeopleList from './Components/PeopleList/PeopleList';


function App() {
  
    return ( 

      <>
      <CustomNavbar></CustomNavbar>
      <PeopleList></PeopleList>
      </>

    ); 
} 

export default App
