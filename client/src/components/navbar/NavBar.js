import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default function NavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Handy Helper</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#home">About</Nav.Link>
                    <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#viewServices">View Services</NavDropdown.Item>
                        <NavDropdown.Item href="#postService">Post Service</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Listings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#viewListings">View Listings</NavDropdown.Item>
                        <NavDropdown.Item href="#postListing">Post Listing</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#home">Contact</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#login">LOG IN</Nav.Link>
                    <Nav.Link href="#signup">SIGN UP</Nav.Link>
                    <Button variant="outline-success">Post a Listing</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};