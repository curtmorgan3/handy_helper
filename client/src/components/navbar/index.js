import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavBar(props) {
    return (
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
                    <Nav.Link href="/"><FontAwesomeIcon icon={faUser}/>Profile</Nav.Link>
                    {/*<Button variant="outline-success">Post a Listing</Button>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};