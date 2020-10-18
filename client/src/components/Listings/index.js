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

const Listings = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const currentUser = useSelector(state => state.user.currentUser.user);

  const [redirect, setRedirect] = React.useState(null);


  React.useEffect(() => {
    if (!currentUser) {
      setRedirect('/');
    }
  }, [currentUser]);


  if (redirect) {
    return (
      <Redirect to={redirect} />
    )
  }

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Listings</Typography>


    </div>
  )
}

export default Listings;