import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import Ajax from '../../Ajax.js';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Alert, Form, Button } from 'react-bootstrap';
import Modal from '@material-ui/core/Modal';

const styles = {
  settingsForm: {
    width: '40vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& form': {
      width: '100%'
    },
    '& button': {
      marginTop: '10px',
      width: '200px'
    }
  },
  modal: {
    position: 'absolute',
    top: '15%',
    left: '40%',
    width: '20vw',
    height: '250px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const Settings = () => {
  const isSmallDevice = useMediaQuery('@media only screen and (min-device-width: 250px) and (max-device-width: 1024px)');
  if (isSmallDevice) styles.settingsForm.width = '90vw';
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Redux Store
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser.user);
  /////////////

  // Component State
  const [updated, setUpdated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  //////////////////

  React.useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        location: currentUser.location,
        email: currentUser.email,
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    const updates = {...form};
    updates[e.target.name] = e.target.value;

    setForm(form => {
      return {...form, ...updates}
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {...form};

		const response = await Ajax.updateUser(data);
    if (response.Error) {
      console.error(response);
    } else {
      setUpdated(true);
      setForm({});
      dispatch(setCurrentUser(response));
    }
  }

  const handleDelete = async () => {
    try {
      await Ajax.deleteUser();
      localStorage.removeItem('handy_helper_token');
      dispatch(setCurrentUser({}));
    } catch(e) {
      console.error(e);
    }
  }

  const passwordModal = (
    <div className={classes.modal}>
      <Form>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' name='password' value={form.password} onChange={handleChange}/>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type='password' name='passwordConfirm' value={form.passwordConfirm} onChange={handleChange}/>
      </Form>
      <Button variant={form.password && form.password === form.passwordConfirm ? 'success' : 'danger'} 
              onClick={form.password === form.passwordConfirm ? handleSubmit : () => console.log('pw dont match')}>
        {form.password && form.password === form.passwordConfirm ? 'Save' : ' Passwords Must Match '}
      </Button>
    </div>
  )

  const deleteModal = (
    <div className={classes.modal}>
      <h2>Are you sure you want to delete your account?</h2>
      <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
    </div>
  )

  if (!currentUser) {
    return (
      <Redirect to='/' />
    )
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger" onClose={() => setError(false)} dismissible>
          <Alert.Heading>Oh no! Something went wrong.</Alert.Heading>
        </Alert>
      </div>
    )
  }

  if (updated) {
    return (
      <div>
        <Alert variant="success" onClose={() => setUpdated(false)} dismissible>
          <Alert.Heading>Account Updated!</Alert.Heading>
        </Alert>
      </div>
    )
  }

  return (
    <div className={classes.settingsForm}>
      <Modal open={modal === 'password'} onClose={() => setModal(null)}>{passwordModal}</Modal>
      <Modal open={modal === 'delete'} onClose={() => setModal(null)}>{deleteModal}</Modal>
      <h2>Account Settings</h2>
      <Form>
        <Form.Label>First Name</Form.Label>
        <Form.Control name='firstName' value={form.firstName || ''} onChange={handleChange} type='text' />

        <Form.Label>Last Name</Form.Label>
        <Form.Control name='lastName' value={form.lastName || ''} onChange={handleChange} type='text' />

        <Form.Label>Phone Number</Form.Label>
        <Form.Control name='phone' value={form.phone || ''} onChange={handleChange} type='text' />

        <Form.Label>Location</Form.Label>
        <Form.Control name='location' value={form.location || ''} onChange={handleChange} type='text' />

        <Form.Label>Email</Form.Label>
        <Form.Control name='email' value={form.email || ''} onChange={handleChange} type='email' />
      </Form>

      <Button variant='success' onClick={handleSubmit}>Save</Button>
      <Button variant='secondary' onClick={() => setModal('password')}>Reset Password</Button>
      <Button variant='danger' onClick={() => setModal('delete')}>Delete Account</Button>
    </div>
  )
}

export default Settings;