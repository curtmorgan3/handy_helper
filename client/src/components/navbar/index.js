import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <Navbar.Brand>Handy Helper</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to='/' className='nav-link'>Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/' className='nav-link'>About</Link>
                    </Nav.Link>
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
                    <Nav.Link >
                        <Link className='nav-link' to='/'>Contact</Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        <Link to='/' className='nav-link'><FontAwesomeIcon icon={faUser}/>Profile</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className='nav-link' to="/settings">Settings</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className='nav-link' to="/" onClick={()=> props.signUserOut()}>Sign Out</Link>
                    </Nav.Link>
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
                        <Nav.Link>
                            <Link to='/' className='nav-link'>Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/' className='nav-link'>About</Link>
                        </Nav.Link>
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
                        <Nav.Link >
                            <Link className='nav-link' to='/'>Contact</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link><Link className='nav-link' to="/signup">Log In</Link></Nav.Link>
                        <Nav.Link><Link className='nav-link' to="/signup">Sign Up</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        ) 
    )
};

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);