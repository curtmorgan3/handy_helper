import React from 'react';
import Ajax from '../../Ajax.js';
import { connect } from 'react-redux';
import './style.scss';

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      name: '',
      skill: '',
      experience: '',
      location: ''
    }
  }

  async componentDidMount() {
    if (this.props.currentUser.user && this.props.currentUser.user.firstName) {
      const name = this.props.currentUser.user.firstName + ' ' + this.props.currentUser.user.lastName;
      const skill = this.props.currentUser.user.skill.split('#')[0];
      const experience = this.props.currentUser.user.skill.split('#')[1];
      const location = this.props.currentUser.user.location;
      await this.setState({
        name,
        skill,
        experience,
        location
      });
    }
  }

  render() {
    return(
      !this.state.name ? 
        <div></div>
       : 
        <div className="profile-container">
          <h1>My Profile</h1>

          <h3>{this.state.name}</h3>
          <span>{this.state.location}</span>

          <h4>Skill</h4>
          <p>{this.state.skill}</p>

          <h4>Experience</h4>
          <p>{this.state.experience}</p>
          
        </div>
      
    )
  }
}

ViewProfile = connect(mapStateToProps, mapDispatchToProps)(ViewProfile);