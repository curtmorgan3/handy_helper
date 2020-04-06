import React from 'react';
import { Jumbotron, Button, Form, Card } from 'react-bootstrap';
import './style.css';

export default function Index(props) {

  return (
    <div class='index-page'>
      <Jumbotron>
        <h1>Handy Helper</h1>
        <p>
          Find handy freelancers to help you fix life's unfixable problems.
        </p>
        <p>
          <Form className='index-search'>
            <Form.Control type='text' placeholder='try carpenter, plumber or electrician'></Form.Control>
            <Button variant="primary">Search</Button>
          </Form>
        </p>
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