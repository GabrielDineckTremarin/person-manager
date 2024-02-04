import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
            <Navbar className='text-light' color="success" light expand="md"> 
                <NavbarBrand className='text-light' href="/">Person Manager</NavbarBrand> 
                <button 
                onClick={() => { setIsOpen(!isOpen) }}
                className="navbar-toggler ms-auto custom-toggler" 
                    type="button">
                <span className="navbar-toggler-icon"></span>
              </button>                        
                <Collapse isOpen={isOpen} navbar> 
                    <Nav className="ms-auto" navbar> 
                        <NavItem > 
                            <NavLink className='text-light' href="#">Home</NavLink> 
                        </NavItem> 
                        <NavItem> 
                            <NavLink className='text-light' href="#">Login</NavLink> 
                        </NavItem> 
                        <NavItem> 
                            <NavLink className='text-light' href="#">Signup</NavLink> 
                        </NavItem> 
                    </Nav> 
                </Collapse> 
            </Navbar> 
      
    ); 
} 

export default CustomNavbar
