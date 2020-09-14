import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl } from '@material-ui/core';
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
  buttonContainer: {
    display: 'flex',
  },
  button: {
    textTransform: 'none',
    width: '45%',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    marginTop: '5px',
    marginRight: '15px',
  },
  p: {
    marginBottom: '0px',
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
        <h2>Account Settings</h2>
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
        <div className="buttonContainer">
          <Button className={classes.button}>Booking History</Button>
          <Button className={classes.button}>Income Statements</Button>
        </div>
        <h3>Email Notifications</h3>
        <FormControl component="fieldset">
          <RadioGroup aria-label="emailNotifications" name="emailNotifications" value={"transactions"} onChange={handleChange}>
            <FormControlLabel value="news" control={<Radio />} label="News and updates" />
            <FormControlLabel value="deals" control={<Radio />} label="Deals" />
            <FormControlLabel value="transactions" control={<Radio />} label="Transactions" />
          </RadioGroup>
        </FormControl>
        <h3>Deactivate Account</h3>
        <FormControlLabel
          control={<Checkbox checked={false} onChange={handleChange} name="accountDeactivated" />}
          label="Deactivate Account"
        />
      </div>

      <div className={classes.infoContainer}>
        <h2>Customer Support</h2>
        <p className={classes.p}><b>Phone</b></p>
        <p>(333)333-3333</p>
        <p className={classes.p}><b>Hours of Operation</b></p>
        <p>9 AM - 5 PM EST</p>
        <p className={classes.p}><b>Email</b></p>
        <p>info@handyhelper.com</p>
      </div>

    </div>
  )
}

export default ViewProfile;