import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions.js';
import { Jumbotron, Button, Form, Card } from 'react-bootstrap';
import Ajax from '../../Ajax.js';
import './style.css';

const mapDispatchToProps = (dispatch)=> {
	return {
		setCurrentUser: (user) => dispatch(setCurrentUser(user))
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.currentUser
	}
}

export default class Index extends React.Component {

  async componentDidMount() {
    if(localStorage.getItem('handy_helper_token')){
      let user = await Ajax.getCurrentUser(localStorage.getItem('handy_helper_token'));
      user.token = localStorage.getItem('handy_helper_token');
			this.props.setCurrentUser(user);
    }
  }

  render() {
    return (
      <div className='index-page'>
        <Jumbotron>
          <h1>Handy Helper</h1>
          <p>
            Find handy freelancers to help you fix life's unfixable problems.
          </p>        
          <Form className='index-search'>
            <Link to='/helpers'>
              <Button variant="primary">Find a Helper</Button>
            </Link>
          </Form>
        </Jumbotron>
        <div className='index-tagline'>
          <p>Here are some of our most popular services</p>
        </div>
        <div className='index-services'>
          <Button variant='success'>Plumbing</Button>
          <Button variant='success'>Electrical</Button>
          <Button variant='success'>Carpentry</Button>
          <Button variant='success'>Mechanical</Button>
          <Button variant='success'>Repair</Button>
        </div>
  
        <div className='index-cards'>
          <Card>
            <Card.Img variant='top' src={require('../../images/services.png')} />
            <Card.Body>
              <Card.Title>Book a Service</Card.Title>
              <Card.Text>
                Search for Helpers who are skilled in the services that align with your problem.
              </Card.Text>
              <Button variant="primary">Search for a Helper</Button>
            </Card.Body>
          </Card>
  
          <Card>
            <Card.Img variant='top' src={require('../../images/helper.png')} />
            <Card.Body>
              <Card.Title>Sign Up As a Helper</Card.Title>
              <Card.Text>
                Got a skill that makes you handy? Share it! There's plenty of work to go around.
              </Card.Text>
              <Button variant="primary">Sign Up</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

Index = connect(mapStateToProps, mapDispatchToProps)(Index);