import React from 'react';
import Ajax from '../../Ajax.js';
import { Alert, Form, Button } from 'react-bootstrap';
import './style.scss';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: '',
      phone: '',
      location: '',
      skill: '',
      updated: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      password: this.state.password,
      firstName: this.state.fName,
      lastName: this.state.lName,
      phone: this.state.phone,
      location: this.state.location,
      skill: this.state.skill
		}
		const response = await Ajax.updateUser(data);
    if (response.Error) {
      console.log(response);
    } else {
      this.setState({
        updated: true,
        email: '',
        password: '',
        fName: '',
        lName: '',
        phone: '',
        location: '',
        skill: '',
      });
    }
  }

  closeAlert() {
    this.setState({
      updated: false,
    })
  }
  
  render() {
    return (
      this.state.updated ? (
        <div>
          <Alert variant="success" onClose={() => this.closeAlert()} dismissible>
            <Alert.Heading>Account Updated!</Alert.Heading>
          </Alert>
        </div>
      ) : (
        <div className="settings-form">
            <h2>Account Settings</h2>
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
              <Form.Control name='skill' value={this.state.skill} onChange={this.handleChange} type='text' />

              <Form.Label>Email</Form.Label>
              <Form.Control name='email' value={this.state.email} onChange={this.handleChange} type='email' />

              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
            </Form>
            <Button variant='success' onClick={this.handleSubmit}>Save</Button>
        </div>
      )
    )
  }
}