import React from 'react';
import './style.scss';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Ajax from '../../Ajax.js';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('handy_helpers_token')) {
      this.setState({
        loggedIn: true
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const data = {
			email: this.state.email,
			password: this.state.password
		}
		const response = await Ajax.userLogin(data);
		if(response.user){
			localStorage.setItem('handy_helper_token', response.token);
			this.setState({
				loggedIn: true
			})
		}else{
			window.alert('Invalid Credentials')
		}
  }

  render() {
    return(
      this.state.loggedIn ? (<Redirect to='/' />) : (
        <div className='login-form-wrapper'>
          <div className='login-form'>
            <Form>
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' value={this.state.email} onChange={this.handleChange} type='email' />
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
            </Form>
            <Button variant='success' onClick={this.handleSubmit}>Login</Button>
            <div className='login-links'>
              <Link to='/contact-us'><Button>Contact Us</Button></Link>
              <Link to='/signup'><Button>Sign Up</Button></Link>
            </div>
          </div>
        </div>
      )
    )
  }
}