import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { signUserOut } from '../../redux/actions.js';

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
            <Navbar.Brand href="/">Handy Helper</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">About</Nav.Link>
                    <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">View Services</NavDropdown.Item>
                        <NavDropdown.Item href="/">Post Service</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Listings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">View Listings</NavDropdown.Item>
                        <NavDropdown.Item href="/">Post Listing</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/">Contact</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/"><FontAwesomeIcon icon={faUser}/>Profile</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link href='/' onClick={()=> props.signUserOut()}>Sign Out</Nav.Link>
                    {/*<Button variant="outline-success">Post a Listing</Button>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        ) : ( 

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Handy Helper</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">About</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">View Services</NavDropdown.Item>
                            <NavDropdown.Item href="/">Post Service</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Listings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">View Listings</NavDropdown.Item>
                            <NavDropdown.Item href="/">Post Listing</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signup">Log in</Nav.Link>
                        <Nav.Link href="/signup">Sign up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        ) 
    )
};

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);