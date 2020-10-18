import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUserOut } from '../../redux/actions.js';
import './style.scss';

const mapStateToProps = (state) => {
	return{
		currentUser: state.user.currentUser
	}
}
const mapDispatchToProps = (dispatch) => {
	return{
		signUserOut: ()=> dispatch(signUserOut())
	}
}

export default function NavBar(props) {
    return (
        props.currentUser.token
        ? (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>Handy Helper</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/' className='nav-link'>About</Link>
                    <NavDropdown className='nav-link' title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item>View Services
                            <Link to='/' className='nav-link'></Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>Post Service
                            <Link to='/' className='nav-link'></Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Link to='/listings' className='nav-link'>View Listings</Link>
                    <Link to='/listings/new' className='nav-link'>Post Listing</Link>
                    <Link className='nav-link' to='/'>Contact</Link>
                </Nav>
                <Nav>
                    <Link to='/profile' className='nav-link'><FontAwesomeIcon icon={faUser}/>Profile</Link>
                    <Link to='/buildprofile' className='nav-link'><FontAwesomeIcon icon={faUser}/>Edit</Link>
                    <Link className='nav-link' to="/settings">Settings</Link>
                    <Link className='nav-link' to="/" onClick={()=> props.signUserOut()}>Sign Out</Link>
                    {/*<Button variant="outline-success">Post a Listing</Button>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        ) : ( 

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Handy Helper</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to='/' className='nav-link'>Home</Link>
                        <Link to='/' className='nav-link'>About</Link>
                        <NavDropdown className='nav-link' title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item>View Services
                                <Link to='/' className='nav-link'></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>Post Service
                                <Link to='/' className='nav-link'></Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className='nav-link' title="Listings" id="basic-nav-dropdown">
                            <NavDropdown.Item> View Listings
                                <Link to='/' className='nav-link'></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>Post Listing
                                <Link to='/' className='nav-link'></Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Link className='nav-link' to='/'>Contact</Link>
                    </Nav>
                    <Nav>
                        <Link className='nav-link' to="/signup">Log In</Link>
                        <Link className='nav-link' to="/signup">Sign Up</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        ) 
    )
};

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);