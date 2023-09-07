import React from 'react';
import './Header.css';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const mapStateToProps = (state)=>{
    return {
        token: state.token
    }
}

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/login" className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/" className="NavLink">Burger Builder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{marginLeft:'10px'}} to="/orders" className="NavLink">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{marginLeft:'10px'}} to="/logout" className="NavLink">Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar expand="lg" className="Navbar">
                <Navbar.Brand href="/" className='Brand' ><img src={Logo} alt="Logo" width="70px" height='60'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='text-center'>
                <Nav className="ms-auto">
                    {links}
                </Nav>
               </Navbar.Collapse>
     
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps) (Header);