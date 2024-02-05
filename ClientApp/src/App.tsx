// import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import CustomNavbar from './Components/Navbar/CustomNavbar';
import PeopleList from './Components/PeopleList/PeopleList';
import ContactEdit from './Components/ContactEdit/ContactEdit';



function App() {
  
    return ( 

      <>
      <CustomNavbar></CustomNavbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <PeopleList />}>
           
          </Route>
          <Route path="/ContactEdit" element={ <ContactEdit />}>
           
          </Route>

        </Routes>
      </BrowserRouter>
      </>

    ); 
} 

export default App
