import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw',
    height: '100%',
  },
}

const ViewProfile = () => {
  // Redux Store
  const currentUser = useSelector(state => state.user.currentUser.user);
  //////////////
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  if (!currentUser) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className={classes.profileContainer}>
      <h1>My Profile</h1>

      <h3>{currentUser.firstName} {currentUser.lastName}</h3>
      <span>{currentUser.location}</span>

      <h4>Skill</h4>
      <p>{currentUser.skill}</p>

      <h4>Experience</h4>
      <p>{currentUser.experience}</p>
    </div>
  )
}

export default ViewProfile;