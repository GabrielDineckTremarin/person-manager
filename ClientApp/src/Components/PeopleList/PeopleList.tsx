import  { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row, Col, Button } from 'reactstrap'

import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { getPeopleList  } from '../../ApiService/ApiService'; 
import { IPersonResponse } from '../../Interfaces/IPersonResponse';
import DeleteModal from '../DeleteModal/DeleteModal';
import { Tooltip } from 'react-tooltip';

function PeopleList() {

    const [people, setPeople] = useState<IPersonResponse[]>([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [personId, setPersonId] = useState('')

    const peopleMockedData: string[] = ['Gabriel Dineck Tremarin', 'Silvio Santos', 'Rita Lee']
    
    const reload = () => {
        setTimeout(()=> {window.location.reload()},1000)
    }


    const toggleDeleteModal = () => {
        setOpenDeleteModal(!openDeleteModal)
    }

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Remove event listener when the component is unmounted
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  
      useEffect(() => {
            
        const fetchListPeople = async () => {

            const data = await getPeopleList();
            const dataFormatted = JSON.parse(JSON.stringify(data.data));
            setPeople(dataFormatted)
        } 

        fetchListPeople()
    },[windowWidth])



    return ( 
        <div
        id='container-list-contacts'
        className={`${windowWidth < 800 ?  'me-3 ms-3': 'w-75'}  m-auto mt-5`}
        >

        <Tooltip id='delete-tooltip'></Tooltip>
        <Tooltip id='edit-tooltip'></Tooltip>



        <div className='mb-5' style={{display:"flex", flexDirection: "row"}}>
            <h1 >Contacts</h1>
            <a className='ms-auto text-decoration-none text-dark d-block' href={`/edit/new`}>
                <Button className='btn-success '>New Contact</Button>
            </a>
        </div>


        {
            peopleMockedData.map((person, index) => (
                <Row  
                className='m-auto mt-2 border rounded pt-2 pb-2'>
                <Col xs={9}>
                <a  
                href="#"
                id='custom-link-list'
                className="text-decoration-none text-dark d-block  pe-1 ps-1 rounded"
                >
                <span
                style={{fontSize:`${windowWidth > 700 ? "25px" : "16px"}`}}
                >{person}</span>
                </a>
                </Col>
                <Col xs={3} className='mt-auto mb-auto'>
                    <div style={{width:60, marginLeft:"auto"}}>
                    <a href="#">
                        <Button  className='btn btn-light p-0 me-2'>
                            <img
                             width={20}
                              src={EditIcon}
                               alt="Edit Icon"
                               data-tooltip-id="edit-tooltip"
                               data-tooltip-place="top"
                               data-tooltip-html="Click here to edit this contact" />
                        </Button>
                    </a>
                    <Button className='btn-light p-0'>
                        <img 
                        width={20} 
                        src={DeleteIcon} 
                        alt="Delete Icon"
                        data-tooltip-id="delete-tooltip"
                        data-tooltip-place="top"
                        data-tooltip-html="Click here to delete this contact"
                        onClick={()=> setOpenDeleteModal(!openDeleteModal)}
                        />
                    </Button>
                    </div>
                </Col>
            </Row>
        ))}
       
       <DeleteModal isOpen={openDeleteModal} toggleModal={toggleDeleteModal} personId={personId} reloadWindow={reload}/>
        </div>


    ); 
} 

export default PeopleList
