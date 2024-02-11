import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ContactIcon from '../../assets/icons/contact.svg'
import { showMessage } from '../../Utils/utils';
import './CustomNavbar.css'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false); 
  
    return ( 
            <Navbar id="custom-navbar" className='text-light pe-3 ps-3 pb-3 pt-3' color="primary" light expand="md"> 

                <NavbarBrand 
                className='text-light pe-2 ps-2 rounded' 
                href="/"
                id='navbar-brand'
                >
                    <div>
                        Contact <img width={30} src={ContactIcon} alt="Contact Icon" />
                    </div>
                    Manager
                
                </NavbarBrand> 
                <button 
                onClick={() => { setIsOpen(!isOpen) }}
                className="navbar-toggler ms-auto custom-toggler" 
                    type="button">
                <span className="navbar-toggler-icon"></span>
              </button>                        
                <Collapse isOpen={isOpen} navbar> 
                    <Nav className="ms-auto" navbar> 
                        <NavItem className='nav-item'> 
                            <NavLink className='text-light text-center navlink' href="/">Home</NavLink> 
                        </NavItem> 
                        <NavItem className='nav-item'> 
                            <NavLink className='text-light text-center navlink' href="/list">Contacts</NavLink> 
                        </NavItem> 

                         <NavItem className='nav-item'>
                            <NavLink 
                            className='text-light text-center navlink'
                            //  href=""
                             onClick={() => showMessage("I haven't implemented a authentication system yet","warning",5000)}
                             >Login</NavLink> 
                        </NavItem> 
                        <NavItem className='nav-item'>
                            <NavLink 
                            className='text-light 
                            text-center navlink'
                            //  href=""
                            onClick={() => showMessage("I haven't implemented a authentication system yet","warning",5000)}
                             >Signup</NavLink> 
                        </NavItem>  


                    </Nav> 
                </Collapse> 
            </Navbar> 
      
    ); 
} 

export default CustomNavbar
