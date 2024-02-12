import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row, Col, Button, Label, Input } from 'reactstrap'
import DeleteIcon from '../../assets/icons/delete2.svg'
import QuestionMarkIcon from '../../assets/icons/question-mark.svg'

import { getPerson, createPerson, updatePerson } from '../../ApiService/ApiService'; 
import { IPersonResponse } from '../../Interfaces/IPersonResponse';
import { useParams, useNavigate  } from "react-router-dom";
import { IContactSocialMedia } from "../../Interfaces/IContact";
import { IAddress } from "../../Interfaces/IAddress";
import { showMessage }from '../../Utils/utils'
import DeleteModal from '../DeleteModal/DeleteModal';
import { Tooltip } from 'react-tooltip';



function PersonEdit() {
    const { personId } = useParams();
    const [personBirthday, setPersonBirthday] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [mediaName, setMediaName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)


    const [address, setAddress] = useState<IAddress>({
      street:"",
      postalCode:"",
      country:"",
      state:"",
      city:""
    })



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
    const navigate = useNavigate()
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

     if(personId != "new")fetchPerson()
     },[windowWidth])

     useEffect(() => {

    },[person])

    const reload = () => {
      setTimeout(()=> {
        window.location.href = `/list`
      },1000)
  }

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

  const handleAddress= () => {

    if(address.street === "" || address.postalCode === "" || address.country === "" || address.state === "" || address.city===""){
      showMessage("You need to fill out all the areas in the address form", "warning")
      return
    }
    
    const updatePerson = (prevPerson: IPersonResponse): IPersonResponse => ({
      ...prevPerson,
      addresses: [...(prevPerson.addresses || []), address],
    }) as IPersonResponse;

    setPerson(updatePerson);
    setAddress({     
      street:"",
      postalCode:"",
      country:"",
      state:"",
      city:""
  })
}

const handleSocialMedia= () => {

  if(mediaName === "Select" || mediaName === "" || username === ""){
    showMessage("You need to fill out all the areas in the Social Media form", "warning")
    return
  }

  const socialMedia: IContactSocialMedia = {mediaName:mediaName,username:username}
  
  const updatePerson = (prevPerson: IPersonResponse): IPersonResponse => ({
    ...prevPerson,
    contact: {
      ...prevPerson.contact,
      socialMedia: [...(prevPerson.contact?.socialMedia || []), socialMedia]
    },

  }) as IPersonResponse;

  setPerson(updatePerson);
  setUsername('');
  setMediaName('');
}
const toggleDeleteModal = () => {
  setOpenDeleteModal(!openDeleteModal)
}

const handleNewPerson = async ()  => {
      try {
        const data = 
        personId === "new" || personId === "" ?
          await createPerson(person) :
          await updatePerson(person)


        if(data.success){
          showMessage(`${data.message}`, "success")
          setTimeout(()=> {
            if(personId === "new" || personId === "" ){

              window.location.href = `/edit/${data.data.id}`
            }else {
              window.location.reload()
            }
            
          },1000)
        } else {
          const messages = data.message.split(";")
          messages.forEach(msg => {
            showMessage(`${msg}`, "error", 5000)
          })
        }
      }
      catch(err) {
        console.log(err)
        showMessage("Unfortunately, the backend isn't deployed", "warning")
      }
}



    return ( 
        <div
        id='container-list-contacts'
        className={` w-75 m-auto`}
        >
      <Tooltip id="phone-tooltip"></Tooltip>
      <Tooltip id="email-tooltip"></Tooltip>
      <Tooltip id="social-media-tooltip"></Tooltip>
      <Tooltip id="address-tooltip"></Tooltip>



          <div className='w-100 d-flex mt-3'>

            <Button
            className='btn-success ms-auto'
            onClick={handleNewPerson}
            >Save Contact</Button>
          
            {
              personId != "" && personId != "new" &&
              <Button
              className='btn-danger ms-2'
              onClick={toggleDeleteModal}
              >Delete Contact</Button>
            }

          </div>

        <Row className='mt-5 mb-5'>
          <h4 className='mb-4'>Personal Information</h4>
          <Col md={4}>
          <Label for='firstName' style={{fontWeight:"bold"}}>First Name: </Label>
            <Input
            id='firstName'
             placeholder="Person's first name" 
             type='text'
             value={person?.name }
             onChange={(e)=> {setPerson({ ...person, name: e.target.value })}}

             ></Input>
          </Col>
          <Col md={4}>
          <Label for='lastName' style={{fontWeight:"bold"}}>Last Name: </Label>
            <Input
            id='lastName' 
             placeholder="Person's last name" 
             type='text'
             value={person.lastName}
             onChange={(e)=> {setPerson({ ...person, lastName: e.target.value })}}
             ></Input>
          </Col>

          <Col md={4}>
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
          <Label for='phone' style={{fontWeight:"bold"}}>
            <img src={QuestionMarkIcon}
            className='mb-1 me-1'
            width={19}
            data-tooltip-id="phone-tooltip"
            data-tooltip-place="top"
            data-tooltip-html="Enter a phone number and click the '+' button"
          /> Phone Numbers: 
          </Label>

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
          <Label for='email' 
          style={{fontWeight:"bold"}}>
            <img src={QuestionMarkIcon}
              className='mb-1 me-1'
              width={19}
              data-tooltip-id="email-tooltip"
              data-tooltip-place="top"
              data-tooltip-html="Enter an email and click the '+' button"
            />
            
            Emails: </Label>
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
                  <Button 
                  style={{fontSize:16, fontWeight:"bold"}} 
                  className='btn-danger ms-2 p-0 pe-1 ps-1 pb-1'
                  onClick={() => {
                    const updateEmails = person?.contact?.emails?.filter((p, i) => i !== index);
                    setPerson({
                      ...person,
                      contact: {
                        ...person.contact!,
                        emails: updateEmails ?? [],
                      },
                    });
                   }}                   >
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
                </li>

              ))
            }
          </ul>

          </Col>
          <Col md={4}>
          <Label style={{fontWeight:"bold"}}>
            <img src={QuestionMarkIcon}
              className='mb-1 me-1'
              width={19}
              data-tooltip-id="social-media-tooltip"
              data-tooltip-place="top"
              data-tooltip-html="Select a social media and enter your username in the chosen social media, then click the '+' button"
            />
            
            Social Media: </Label>
          <div className='d-flex flex-row'>
            <Input 
            className='w-75' 
            type='select' 
            value={mediaName}
            onChange={(e) => {setMediaName(e.target.value)}}>
            <option value="Select">Select</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Snapchat</option>              
            </Input>
            <Input 
            className='ms-2' 
            placeholder="Person's username" 
            type='text'
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            >
            
            </Input>
            <Button 
            style={{fontSize:20, fontWeight:"bold"}} 
            className='btn-success ms-2 pe-2 ps-2 pt-0 pb-0'
            onClick={handleSocialMedia}
            >+
            </Button>
          </div>
          <ul style={{listStyle:"none"}}>
            {
              person?.contact?.socialMedia?.map((socialMedia, index) => (
                <li key={index} className='mb-2 mt-2'>
                  <strong>
                    {socialMedia?.mediaName}:
                  </strong>
                  <span> {socialMedia?.username}</span>
                  <Button 
                  style={{fontSize:16, fontWeight:"bold"}} 
                  className='btn-danger ms-2 p-0 pe-1 ps-1 pb-1'
                  onClick={() => {
                    const updatedSocialMedia = person?.contact?.socialMedia?.filter((p, i) => i !== index);
                    setPerson({
                      ...person,
                      contact: {
                        ...person.contact!,
                        socialMedia: updatedSocialMedia ?? [],
                      },
                    });
                   }}                  >
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
                </li>

              ))
            }
          </ul>
          </Col>
        </Row>


        <hr />
        <span className='d-block mb-4 mt-5'>
        <img src={QuestionMarkIcon}
              className='mb-1 me-1'
              width={19}
              data-tooltip-id="address-tooltip"
              data-tooltip-place="top"
              data-tooltip-html="Fill out all the fields and  then click the '+' button<br/> to add an address to the address list"
            />
          <h4 className=' d-inline'>Address Information</h4>
        </span>
        <Row className='mt-0 mb-5'>
            <h5 className='mb-3'>New Address </h5>
            <Col md={2}>
            <Label for='street' style={{fontWeight:"bold"}}>Street: </Label>
            <Input 
            id='street' 
            type='text'
            placeholder="Enter a street name"  
            value={address?.street || ""}
            onChange={(e) => {
              setAddress({
                ...address,
                street: e.target.value,
              });
            }}
            ></Input>
  
            </Col>
            <Col md={2}>
            <Label for='city' style={{fontWeight:"bold"}}>City: </Label>
              <Input  
              id='city'
              type='text'
              placeholder="Enter a city name"  
              value={address?.city || ""}
              onChange={(e) => {
                setAddress({
                  ...address,
                  city: e.target.value,
                });
              }}
              ></Input>

            </Col>
  
            <Col md={2}>
             <Label for='state' style={{fontWeight:"bold"}}>State: </Label>
              <Input 
              id='state'
              type='text'
              placeholder="Enter a state name"  
              value={address?.state || ""}
              onChange={(e) => {
                setAddress({
                  ...address,
                  state: e.target.value,
                });
              }}
              ></Input>
            </Col>

            <Col md={2}>

            <Label for='postalCode' style={{fontWeight:"bold"}}>Postal Code: </Label>
              <Input  
              id='postalCode'
              type='text'
              placeholder="Enter a postal code"  
              value={address?.postalCode || ""}
              onChange={(e) => {
                setAddress({
                  ...address,
                  postalCode: e.target.value,
                });
              }}
              ></Input>
            </Col>

            <Col md={2}>
            <Label 
            for='country'
            style={{fontWeight:"bold"}}>Country: </Label>
              <Input  
              id='country'
              type='text'
              placeholder='Enter a country name'
              value={address?.country || ""}
              onChange={(e) => {
                setAddress({
                  ...address,
                  country: e.target.value,
                });
              }}
              ></Input>
            </Col>

            <Col md={2} className='mt-auto'>
            <Button 
            style={{fontSize:20, fontWeight:"bold"}} 
            className='btn-success pe-2 ps-2 pt-1 pb-1'
            onClick={handleAddress}
            >+</Button>
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

                <Button 
                style={{fontSize:22, fontWeight:"bold"}}
                 className='btn-danger pe-2 ps-2 pt-0 pb-1'
                 onClick={() => {
                  const updatedAddress = person?.addresses?.filter((p, i) => i !== index);
                  console.log(updatedAddress)
                  const updatePerson = (prevPerson: IPersonResponse): IPersonResponse => ({
                    ...prevPerson,
                    addresses: updatedAddress,
                  }) as IPersonResponse;
                  setPerson(updatePerson)
                 }}>
                  <img width={18} src={DeleteIcon} alt="" />
                </Button>
              </Col>
            

          </Row>

          ))
        }
        <DeleteModal isOpen={openDeleteModal} toggleModal={toggleDeleteModal} personId={personId ?? ""} reloadWindow={reload}/>


        </div>


    ); 
} 

export default PersonEdit
