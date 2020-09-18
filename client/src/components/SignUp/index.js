import React from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/actions.js';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Ajax from '../../Ajax.js';

const SignUp = () => {
  // Redux Store
  const dispatch = useDispatch();
  /////////////

  // Component State
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    loginEmail: '',
    loginPassword: '',
  })
  const [signUpForm, setSignUpForm] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    type: 'Customer', // Customer set as default, because this is what is displayed initially in the type dropdown
  })
  ///////////////////

  const handleChange = (e) => {
    if(e.target.name==='loginEmail'||e.target.name==='loginPassword'){
      const updates = {...loginForm};
      updates[e.target.name] = e.target.value;
      setLoginForm({...updates});
    } else {
      const updates = {...signUpForm};
      updates[e.target.name] = e.target.value;
      setSignUpForm({...updates});
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {...signUpForm};
    data.isHelper = data.type === 'Helper';
    
    let allFilled = true;
    for (let field in data) {
      if (!data[field] && field !== 'isHelper') {
        allFilled = false;
      }
    }
    if (!allFilled) {
      window.alert('Cannot leave any fields blank');
    } else {
      const response = await Ajax.createUser(data);
  
      if (response.Error) {
        window.alert('Email already registered to an account.');
      } else {
        const loginResponse = await Ajax.userLogin(data);
        localStorage.setItem('handy_helper_token', loginResponse.token);
        setLoggedIn(true);
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
			email: loginForm.loginEmail,
			password: loginForm.loginPassword
    }

		const response = await Ajax.userLogin(data);
		if(response.user){
      dispatch(setCurrentUser(response.user));
			localStorage.setItem('handy_helper_token', response.token);
      setLoggedIn(true);
      
		}else{
			window.alert('Invalid Credentials')
		}
  }

  React.useEffect(() => {
    if (localStorage.getItem('handy_helper_token')) {
      setLoggedIn(true);
    }
  }, [])

  if (loggedIn) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className='login-form-wrapper'>
      <div className='login-form'>
        <Form>
          <Form.Label>Email</Form.Label>
          <Form.Control id='login-email' name='loginEmail' value={loginForm.loginEmail} onChange={handleChange} type='email' />
          <Form.Label>Password</Form.Label>
          <Form.Control id='login-pw' type='password' name='loginPassword' value={loginForm.loginPassword} onChange={handleChange}/>
        </Form>
        <Button id='login-btn' variant='primary' onClick={handleLogin}>Login</Button>
        <h3 style={{textAlign: 'center'}}>or</h3>
        <Form>
          <Form.Label>First Name</Form.Label>
          <Form.Control name='firstName' value={signUpForm.firstName} onChange={handleChange} type='text' />

          <Form.Label>Last Name</Form.Label>
          <Form.Control name='lastName' value={signUpForm.lastName} onChange={handleChange} type='text' />

          <Form.Label>Email</Form.Label>
          <Form.Control name='email' value={signUpForm.email} onChange={handleChange} type='email' />

          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={signUpForm.password} onChange={handleChange}/>

          <Form.Label>Phone Number</Form.Label>
          <Form.Control name='phone' value={signUpForm.phone} onChange={handleChange} type='text' />

          <Form.Label>Location</Form.Label>
          <Form.Control name='location' value={signUpForm.location} onChange={handleChange} type='text' />

          <Form.Label>I am a...</Form.Label>
          <Form.Control as='select' name='type' value={signUpForm.type} onChange={handleChange}>
            <option>Customer</option>
            <option>Helper</option>
          </Form.Control>

        </Form>
        <Button id='signup-btn' variant='success' onClick={handleSignup}>Sign Up</Button>
      </div>
    </div>
  )
}

export default SignUp;