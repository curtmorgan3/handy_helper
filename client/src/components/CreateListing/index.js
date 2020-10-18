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
  }
}

const CreateListing = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const currentUser = useSelector(state => state.user.currentUser.user);

  const [form, updateForm] = React.useState({
    title: '',
    price: '',
    location: '',
    description: '',
    skill: ''
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
      const res = await Ajax.createListing({
        skill: form.skill,
        serviceDetails: form.description,
        suggestedPrice: parseFloat(form.price),
        location: form.location,
        title: form.title,
        userId: currentUser.id
      });
      if (!res) {
        window.alert('Something went wrong!');
      } else {
        setRedirect('/listings');
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
      <Typography variant='h4'>New Listing</Typography>

      <TextField 
        variant='filled'
        label='Title'
        className={classes.input}
        name='title'
        onChange={handleChange}
        value={form.title}
      />

      <Select
        label='Primary Skill'
        variant='filled'
        name='skill'
        className={classes.input}
        onChange={handleChange}
        value={form.skill}
      >
        <MenuItem value='electrician'>Electrician</MenuItem>
        <MenuItem value='plumber'>Plumber</MenuItem>
        <MenuItem value='mechanic'>Mechanic</MenuItem>
        <MenuItem value='carpenter'>Carpenter</MenuItem>
      </Select>

      <TextField 
        variant='filled'
        label='Location'
        className={classes.input}
        name='location'
        onChange={handleChange}
        value={form.location}
      />

      <TextField 
        variant='filled'
        label='Price / hr'
        className={classes.input}
        name='price'
        onChange={handleChange}
        value={form.price}
      />

      <TextField 
        variant='filled'
        label='Description'
        multiline
        rows={5}
        className={classes.input}
        name='description'
        onChange={handleChange}
        value={form.description}
      />

      <Button onClick={handleSubmit}>Submit</Button>

    </div>
  )
}

export default CreateListing;