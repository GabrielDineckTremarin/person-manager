import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row, Col, Button, Label, Input, FormGroup } from 'reactstrap'

import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete2.svg'
import { getPerson } from '../../ApiService/ApiService'; 
import { IPersonResponse } from '../../Interfaces/IPersonResponse';
import { useParams } from "react-router-dom";
import { IContact } from "../../Interfaces/IContact";
import { IAddress } from "../../Interfaces/IAddress";
import { showMessage }from '../../Utils/utils'
import { ToastContainer } from 'react-toastify';





function PersonEdit() {
    const { personId } = useParams();
    const [personBirthday, setPersonBirthday] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [person, setPerson] = useState<IPersonResponse>({
      id: personId || "",
      name: "",
      lastName:"",
      fullName:"",
      birthday:new Date(),
      age: 0,
      contact: {phones: [], socialMedia: [], emails: []},
      addresses: []

    })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


     useEffect(() => {
        
     const fetchPerson = async () => {
         const data = await getPerson(personId || "");
         const dataFormatted = JSON.parse(JSON.stringify(data.data));
         setPerson(dataFormatted)
         setPersonBirthday(new Date(dataFormatted?.birthday).toISOString().split('T')[0])   
     } 
     fetchPerson()
     },[windowWidth])

     useEffect(() => {

    },[person])

    const handlePhoneNumber = () => {
        if(phone === ''){
          showMessage('You need to enter a phone number', 'warning')
          return;
        }
        setPerson({
          ...person,
          contact: {
            ...person.contact!,
            phones: [...(person.contact?.phones ?? []), phone],
          },
        });
        setPhone('')
    }
  
    const handleEmail = () => {
      if(email === ''){
        showMessage('You need to enter a email', 'warning')
        return;
      }
      setPerson({
        ...person,
        contact: {
          ...person.contact!,
          emails: [...(person.contact?.emails ?? []), email],
        },
      });
      setEmail('')
  }


    return ( 
        <div
        id='container-list-contacts'
        className={` w-75 m-auto`}
        >
          <div className='w-100 d-flex mt-3'>
          <a className='ms-auto text-decoration-none text-dark d-block' href={`/view/${personId}`}>
            <Button
            className='btn-success '>Save Contact</Button>
          </a>
          </div>

        <Row className='mt-5 mb-5'>
          <h4 className='mb-4'>Personal Information</h4>
          <Col md={3}>
          <Label for='firstName' style={{fontWeight:"bold"}}>First Name: </Label>
            <Input
            id='firstName'
             placeholder="Person's first name" 
             type='text'
             value={person.name}
             onChange={(e)=> {setPerson({ ...person, name: e.target.value })}}

             ></Input>
          </Col>
          <Col md={3}>
          <Label for='lastName' style={{fontWeight:"bold"}}>Last Name: </Label>
            <Input
            id='lastName' 
             placeholder="Person's last name" 
             type='text'
             value={person.lastName}
             onChange={(e)=> {setPerson({ ...person, lastName: e.target.value })}}
             ></Input>
          </Col>
          <Col md={3}>
          <Label for='age' placeholder="Person's age" style={{fontWeight:"bold"}}>Age: </Label>
          <Input id='age' 
          value={person.age} 
          type='number'
          onChange={(e)=> {setPerson({ ...person, age: parseInt(e.target.value) })}}
          ></Input>

          </Col>
          <Col md={3}>
          <Label for='birthday' placeholder="Person's birthday" style={{fontWeight:"bold"}}>Birthday: </Label>
          <Input 
          id='birthday' 
          defaultValue={person?.name != "" ? personBirthday : ""} 
          type='date'
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const timeZoneOffset = selectedDate.getTimezoneOffset();
            selectedDate.setMinutes(selectedDate.getMinutes() + timeZoneOffset);
            setPerson({ ...person, birthday: selectedDate });
          }}
          ></Input>
          </Col>
        </Row>
        <hr />
        <Row className='mt-5 mb-5'>
          <h4 className='mb-4'>Contact Information</h4>
          <Col md={4}>
          <Label for='phone' style={{fontWeight:"bold"}}>Phone Numbers: </Label>

          <div className='d-flex flex-row'>
            <Input 
            id='phone'
            placeholder="Person's number"  
            className='w-75' 
            type='number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}

            ></Input>
            <Button 
            style={{fontSize:20, fontWeight:"bold"}} 
            className='btn-success ms-2 pe-2 ps-2 pt-0 pb-0'
            onClick={handlePhoneNumber}
            >+</Button>

          </div>

            <ul style={{listStyle:"none"}}>
            {
              person.contact?.phones?.map((phone, index) => (
                <li key={index} className='mb-2 mt-2'>
                  <strong>
                    Phone {index+1}:
                  </strong>
                  <span> {phone || ""}</span>
                  <Button 
                  style={{fontSize:16, fontWeight:"bold"}}
                   className='btn-danger ms-2 p-0 pe-1 ps-1 pb-1'
                   onClick={() => {
                    const updatedPhones = person?.contact?.phones.filter((p, i) => i !== index);
                    setPerson({
                      ...person,
                      contact: {
                        ...person.contact!,
                        phones: updatedPhones ?? [],
                      },
                    });
                   }}
                   >
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
                </li>

              ))
            }
          </ul>

          </Col>
          <Col md={4}>
          <Label for='email' style={{fontWeight:"bold"}}>Emails: </Label>
          <div className='d-flex flex-row'>
            <Input  
            id='email'
            placeholder="Person's email"  
            className='w-75' type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Input>


            <Button style={{fontSize:20, fontWeight:"bold"}} 
            className='btn-success ms-2 pe-2 ps-2 pt-0 pb-0'
            onClick={handleEmail}
            >+</Button>
          </div>
          <ul style={{listStyle:"none"}}>
            {
              person?.contact?.emails?.map((email, index) => (
                <li key={index} className='mb-2 mt-2'>
                  <strong>
                    Email {index+1}:
                  </strong>
                  <span> {email || ""}</span>
                  <Button style={{fontSize:16, fontWeight:"bold"}} className='btn-danger ms-2 p-0 pe-1 ps-1 pb-1'>
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
                </li>

              ))
            }
          </ul>

          </Col>
          <Col md={4}>
          <Label style={{fontWeight:"bold"}}>Social Media: </Label>
          <div className='d-flex flex-row'>
            <Input className='w-75' type='select'>
            <option value="Select">Select</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
            </Input>
            <Input className='ms-2' placeholder="Person's username" type='text'></Input>
            <Button style={{fontSize:20, fontWeight:"bold"}} className='btn-success ms-2 pe-2 ps-2 pt-0 pb-0'>+</Button>
          </div>
          <ul style={{listStyle:"none"}}>
            {
              person?.contact?.socialMedia?.map((socialMedia, index) => (
                <li key={index} className='mb-2 mt-2'>
                  <strong>
                    {socialMedia?.mediaName}:
                  </strong>
                  <span> {socialMedia?.username}</span>
                  <Button style={{fontSize:16, fontWeight:"bold"}} className='btn-danger ms-2 p-0 pe-1 ps-1 pb-1'>
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
                </li>

              ))
            }
          </ul>
          </Col>
        </Row>


        <hr />
        <h4 className='mb-4 mt-5'>Address Information</h4>
        <Row className='mt-0 mb-5'>
            <h5 className='mb-3'>New Address </h5>
            <Col md={2}>
            <Label style={{fontWeight:"bold"}}>Street: </Label>
            <Input  type='text'></Input>
  
            </Col>
            <Col md={2}>
            <Label style={{fontWeight:"bold"}}>City: </Label>
              <Input  type='text'></Input>

            </Col>
  
            <Col md={2}>
             <Label style={{fontWeight:"bold"}}>State: </Label>
              <Input  type='text'></Input>
            </Col>

            <Col md={2}>

            <Label style={{fontWeight:"bold"}}>Postal Code: </Label>
              <Input  type='text'></Input>
            </Col>

            <Col md={2}>
            <Label style={{fontWeight:"bold"}}>Street: </Label>
              <Input  type='text'></Input>
            </Col>

            <Col md={2} className='mt-auto'>
            <Button style={{fontSize:20, fontWeight:"bold"}} className='btn-success pe-2 ps-2 pt-1 pb-1'>+</Button>
            </Col>
          </Row>
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
            
              <Col md={2} className='mt-auto'>

                <Button style={{fontSize:22, fontWeight:"bold"}} className='btn-danger pe-2 ps-2 pt-0 pb-1'>
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
              </Col>
            

          </Row>

          ))
        }
        </div>


    ); 
} 

export default PersonEdit
