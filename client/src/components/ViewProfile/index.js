import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#E9ECEF',
    borderRadius: '15px',
    padding: '2%',
    marginBottom: '10px',
  },
  button: {
    textTransform: 'none',
    width: '45%',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    marginTop: '15px',
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

  const handleChange = (e) => {
    // TODO
  }

  return (
    <div className={classes.profileContainer}>
      <h1>My Profile</h1>
      <div className={classes.infoContainer}>
        <h2>Basic Information</h2>
        <form>
          <label htmlFor='name'>Name</label><br />
          <input type='text' name='name' id='name' value={currentUser.firstName + ' ' + currentUser.lastName} onChange={handleChange} /><br />
          <label htmlFor='name'>Location</label><br />
          <input type='text' name='location' id='location' value={currentUser.location} onChange={handleChange} /><br />
          <label htmlFor='name'>Phone Number</label><br />
          <input type='text' name='phone' id='phone' value={currentUser.phone} onChange={handleChange} /><br />
          {currentUser.isHelper ?
            <div>
              <label htmlFor='name'>Skill</label><br />
              <input type='text' name='skill' id='skill' value={currentUser.skill} onChange={handleChange} /><br />
            </div> : null
          }
        </form>
      </div>

      <div className={classes.infoContainer}>
        <h2>Account Management</h2>
        <h3>Preferences</h3>
        <h3>Change Password</h3>
        <form>
          <label htmlFor='name'>Old Password</label><br />
          <input type='text' name='oldPassword' id='oldPassword' value='' onChange={handleChange} /><br />
          <label htmlFor='name'>New Password</label><br />
          <input type='text' name='newPassword' id='newPassword' value='' onChange={handleChange} /><br />
        </form>
        <div>
          <Button className={classes.button}>Reset Password</Button>
        </div>

        <h3>Transactions</h3>
        <h3>Deactivate Account</h3>
      </div>

      <div className={classes.infoContainer}>
        <h2>Customer Support</h2>
      </div>

    </div>
  )
}

export default ViewProfile;