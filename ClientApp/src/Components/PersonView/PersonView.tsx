import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row, Col, Button } from 'reactstrap'

import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { getPeopleList  } from '../../ApiService/ApiService'; 
import { IPersonResponse } from '../../Interfaces/IPersonResponse';
import { useParams } from "react-router-dom";


// import CustomNavbar from './Components/Navbar/CustomNavbar';

function PersonView() {
    const { personId } = useParams();


    const [people, setPeople] = useState<IPersonResponse[]>([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        console.log(personId)
        window.addEventListener('resize', handleResize);
    
        // Remove event listener when the component is unmounted
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    // useEffect(() => {
        
    // const fetchListPeople = async () => {
    //     const data = await getPeopleList();
    //     const dataFormatted = JSON.parse(JSON.stringify(data.data));
    //     setPeople(dataFormatted)
    // } 

    // fetchListPeople()
    // },[windowWidth])


  



    return ( 
        <div
        id='container-list-contacts'
        className={`${windowWidth < 800 ?  'me-3 ms-3': 'w-75'}  m-auto mt-5`}
        >
        <h1>Ola mundo</h1>
       
        </div>


    ); 
} 

export default PersonView
