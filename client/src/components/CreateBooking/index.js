import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Select, Button, MenuItem, TextField } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    height: '100vh',
    margin: 'auto',
    paddingTop: '5%'
  },
  input: {
    width: '50%',
    marginTop: '2%'
  },
  listings: {
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listing: {
    width: '100%',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    backgroundColor: '#E9ECEF',
    padding: '5%',
    borderRadius: '15px',
    overflowY: 'scroll'
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    width: '50%',
    margin: 'auto',
    marginBottom: '5%',
    '& div': {
      marginTop: '2%'
    }
  }
}

const CreateBooking = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Redux
  const currentUser = useSelector(state => state.user.currentUser.user);
  const bookingDetails = useSelector(state => state.bookings.newBooking);
  /////////


  const [form, updateForm] = React.useState({
    title: bookingDetails.title,
    price: '',
    location: bookingDetails.location,
    description: bookingDetails.serviceDetails,
    skill: bookingDetails.skill
  });

  const [redirect, setRedirect] = React.useState(null);

  const handleChange = (e) => {
    const update = {...form};
    update[e.target.name] = e.target.value;
    updateForm(update);
  }

  React.useEffect(() => {
    if (!currentUser) {
      setRedirect('/');
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    try {
      const res = await Ajax.createBooking({
        skill: form.skill,
        serviceDetails: form.description,
        suggestedPrice: parseFloat(form.price),
        location: form.location,
        title: form.title,
        customer: bookingDetails.userId
      });


      if (!res) {
        window.alert('Error connecting to server.');
      } else {
        setRedirect('/bookings');
      }
    } catch (e) {
      window.alert(e);
    }
  }

  if (redirect) {
    return (
      <Redirect to={redirect} />
    )
  }

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Review Booking and Set Fee</Typography>

      <div className={classes.listing}>
        <Typography variant='h5' style={{marginBottom: '5%'}}>{bookingDetails.title}</Typography>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='body1'>Location: {bookingDetails.location}</Typography>
          <Typography variant='body1'>Skill: {bookingDetails.skill}</Typography>
        </div>

        <Typography style={{marginTop: '2%'}} variant='body1'>{bookingDetails.serviceDetails}</Typography>
      </div>

      <Typography>Suggested Price</Typography>
      <Typography>{bookingDetails.suggestedPrice} / hr</Typography>

      <TextField 
        variant='filled'
        label='Price / hr'
        className={classes.input}
        name='price'
        onChange={handleChange}
        value={form.price}
      />


      <Button onClick={handleSubmit}>Take Job</Button>

    </div>
  )
}

export default CreateBooking;