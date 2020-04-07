import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions.js';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Ajax from '../../Ajax.js';

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: '',
      phone: '',
      location: '',
      skill: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('handy_helper_token')) {
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
      this.props.setCurrentUser(response.user);
			localStorage.setItem('handy_helper_token', response.token);
			this.setState({
				loggedIn: true
			})
		}else{
			window.alert('Invalid Credentials')
		}
  }

  async handleSignup(e) {
    e.preventDefault();
    const data = {
			email: this.state.email,
      password: this.state.password,
      firstName: this.state.fName,
      lastName: this.state.lName,
      phone: this.state.phone,
      location: this.state.location,
      skill: this.state.skill
		}
    const response = await Ajax.createUser(data);
    localStorage.setItem('handy_helper_token', response.token);
    this.setState({
      loggedIn: true
    });
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
            <Button variant='primary' onClick={this.handleSubmit}>Login</Button>
            <h3 style={{textAlign: 'center'}}>or</h3>
            <Form>
              <Form.Label>First Name</Form.Label>
              <Form.Control name='fName' value={this.state.fName} onChange={this.handleChange} type='text' />

              <Form.Label>Last Name</Form.Label>
              <Form.Control name='lName' value={this.state.lName} onChange={this.handleChange} type='text' />

              <Form.Label>Phone Number</Form.Label>
              <Form.Control name='phone' value={this.state.phone} onChange={this.handleChange} type='text' />

              <Form.Label>Location</Form.Label>
              <Form.Control name='location' value={this.state.location} onChange={this.handleChange} type='text' />

              <Form.Label>Skill</Form.Label>
              <Form.Control name='skill' value={this.state.location} onChange={this.handleChange} type='text' />

              <Form.Label>Email</Form.Label>
              <Form.Control name='email' value={this.state.email} onChange={this.handleChange} type='email' />

              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
            </Form>
            <Button variant='success' onClick={this.handleSignup}>Sign Up</Button>
          </div>
        </div>
      )
    )
  }
}

SignUp = connect(null, mapDispatchToProps)(SignUp);