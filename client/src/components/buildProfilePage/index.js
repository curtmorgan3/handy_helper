import React from 'react';
import Ajax from '../../Ajax.js';
import { connect } from 'react-redux';
import { Alert, Form, Button } from 'react-bootstrap';
import './style.scss';

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default class BuildProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      location: '',
      // Adjust later - temporary hack to store skills and experience descripiton in one field
      skill1: '',
      experience: '',
      skill: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const data = {
      location: this.state.location,
      skill: this.state.skill1 + '#' + this.state.experience,
    }
    const response = await Ajax.updateUser(data);
    if (response.Error) {
      console.log(response);
    } else {
      this.setState({
        updated: true,
        location: '',
        skill1: '',
        experience: '',
        skill: ''
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
          <div className="profile-form">
            <h2>Build your Profile</h2>
            <Form>
              <Form.Label>Location</Form.Label>
              <Form.Control name='location' value={this.state.location} onChange={this.handleChange} type='text' />
              {
                this.props.currentUser.user?.isHelper
                  ? (
                    <div>
                      <Form.Label>Skills</Form.Label>
                      <Form.Control name='skill1' value={this.state.skill1} onChange={this.handleChange} type='text' />

                      <Form.Label>Experience</Form.Label>
                      <Form.Control name='experience' value={this.state.experience} onChange={this.handleChange} type='text' />
                    </div>
                  )
                  : null
              }
            </Form>
            <Button variant='success' onClick={this.handleSubmit}>Save</Button>
          </div>
        )
    )
  }
};

BuildProfile = connect(mapStateToProps, mapDispatchToProps)(BuildProfile);