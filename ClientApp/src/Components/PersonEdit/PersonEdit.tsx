import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row, Col, Button, Label, Input, FormGroup } from 'reactstrap'

import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { getPerson } from '../../ApiService/ApiService'; 
import { IPersonResponse } from '../../Interfaces/IPersonResponse';
import { useParams } from "react-router-dom";


// import CustomNavbar from './Components/Navbar/CustomNavbar';

function PersonEdit() {
    const { personId } = useParams();


    const [person, setPerson] = useState<IPersonResponse>()
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


     useEffect(() => {
        
     const fetchPerson = async () => {
         const data = await getPerson(personId || "");
         const dataFormatted = JSON.parse(JSON.stringify(data.data));
         setPerson(dataFormatted)
     } 
     fetchPerson()
     },[windowWidth])


  



    return ( 
        <div
        id='container-list-contacts'
        className={` w-75 m-auto`}
        >
          <div className='w-100 d-flex mt-3'>
          <a className='ms-auto text-decoration-none text-dark d-block' href={`/view/${personId}`}>
            <Button className='btn-success '>Save Contact</Button>
          </a>
          </div>


        <Row className='mt-5 mb-5'>
          <h4 className='mb-4'>Personal Information</h4>
          <Col md={3}>
            <span><strong>Name:</strong> </span>
            <Input type='text'></Input>
          </Col>
          <Col md={3}>
          <span><strong>Age:</strong></span>
          <Input type='text'></Input>

          </Col>
          <Col md={3}>
          <span><strong>Birthday:</strong> </span>
          <Input type='date'></Input>
          </Col>
        </Row>
        <hr />
        <Row className='mt-5 mb-5'>
          <h4 className='mb-4'>Contact Information</h4>
          <Col md={3}>
            <span><strong>Phone Numbers:</strong></span>
            <ul style={{listStyle:"none"}}>
            {
              person?.contact?.phones?.map((phone, index) => (
                <li key={index}>
                  <strong>
                    Phone {index+1}:
                  </strong>
                  <span> {phone || ""}</span>
                </li>

              ))
            }
          </ul>

          </Col>
          <Col md={3}>
          <span><strong>Emails:</strong></span>
          <ul style={{listStyle:"none"}}>
            {
              person?.contact?.emails?.map((email, index) => (
                <li key={index}>
                  <strong>
                    Email {index+1}:
                  </strong>
                  <span> {email || ""}</span>
                </li>

              ))
            }
          </ul>

          </Col>
          <Col md={3}>
          <span><strong>Social Media:</strong>  </span>
          <ul style={{listStyle:"none"}}>
            {
              person?.contact?.socialMedia?.map((socialMedia, index) => (
                <li key={index}>
                  <strong>
                    {socialMedia?.mediaName}:
                  </strong>
                  <span> {socialMedia?.username}</span>
                </li>

              ))
            }
          </ul>
          </Col>
        </Row>


        <hr />
        <h4 className='mb-4 mt-5'>Address Information</h4>

        {
          person?.addresses?.map((address, index) => (
            <Row className='mt-0 mb-5'>
            <h5 className='mb-3'>Address {index+1}</h5>
            <Col md={2}>
              <span><strong>Street:</strong> {address?.street || ""}</span>
  
            </Col>
            <Col md={2}>
            <span><strong>City:</strong> {address?.city || ""}</span>
            </Col>
  
            <Col md={2}>
            <span><strong>State:</strong> {address?.state || ""}</span>
            </Col>

            <Col md={2}>
            <span><strong>Postal Code:</strong> {address?.postalCode || ""}</span>
            </Col>

            <Col md={2}>
            <span><strong>Country:</strong> {address?.country || ""}</span>
            </Col>
          </Row>

          ))
        }

        </div>


    ); 
} 

export default PersonEdit
