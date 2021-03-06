import React from 'react';
import { setCurrentUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Ajax from '../../Ajax';
import { Button, FormControlLabel, Checkbox, FormGroup, FormControl } from '@material-ui/core';
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
    width: '20%',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    marginTop: '10px',
    marginBottom: '15px',
    marginRight: '15px',
  },
  p: {
    marginBottom: '0px',
  },
  passwordAlert: {
    color: 'red',
  },
  passwordSuccess: {
    color: 'green',
  },
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

let ManageAccount = (props) => {
  const { currentUser: { user } } = props;
  const [passwordUpdated, setPasswordUpdated] = React.useState(false);
  const [notificationSettings, setNotifications] = React.useState({
    transactions: true,
    news: true,
    deals: true,
  });

  const [password, setPassword] = React.useState({
    password: '',
    passwordConfirm: ''
  });

  const [basicInformation, setBasicInformation] = React.useState({
    firstName: user ? user.firstName : null,
    lastName: user ? user.lastName : null,
    location: user ? user.location : null,
    phone: user ? user.phone : null,
    email: user ? user.email : null,
    isActive: user ? user.isActive : null,
  });

  React.useEffect(() => {
    if (user && user.preferences) {
      setNotifications(JSON.parse(user.preferences));
    }
  }, [])

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  if (!user) {
    return (
      <Redirect to='/' />
    )
  }

  const handleNotificationChange = (e) => {
    setNotifications({ ...notificationSettings, [e.target.name]: e.target.checked });
  }

  const handleInfoChange = (e) => {
    if (e.target.name === 'isActive') {
      setBasicInformation({ ...basicInformation, [e.target.name]: e.target.checked });
    } else {
      setBasicInformation({ ...basicInformation, [e.target.name]: e.target.value });
    }
  }

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  const handleSave = async (type) => {
    if (type === 'info') {
      const updatedUser = { ...user, ...basicInformation };
      updatedUser.preferences = JSON.stringify(notificationSettings);
      const res = await Ajax.updateUser(updatedUser);
      if (res.Error) {
        console.error(res);
      } else {
        props.setCurrentUser(res.user);
      }
    } else if (type === 'password') {
      if (password.password === password.passwordConfirm) {
        const updatedUser = { ...user, password: password.password };
        const res = await Ajax.updateUser(updatedUser);
        if (res.Error) {
          console.error(res);
        } else {
          setPasswordUpdated(true);
          props.setCurrentUser(res.user);
        }
      }
    }
  }

  const passwordIsValid = () => {
    const { password: pw, passwordConfirm: pc } = password;
    return (
      pw === pc &&
      new RegExp(/!|@|#|\$|%|\^|&|\*|_/g).test(pw) &&
      new RegExp(/[A-Z]/g).test(pw) &&
      pw.length >=8 &&
      pw.length < 26
    )
  }

  return (
    <div className={classes.profileContainer}>
      <h1>My Account</h1>

      <div className={classes.infoContainer}>
        <h2>Basic Information</h2>
        <form>
          <label htmlFor='firstName'>First name</label><br />
          <input type='text' name='firstName' id='firstName' value={basicInformation.firstName} onChange={handleInfoChange} /><br />
          <label htmlFor='lastName'>Last name</label><br />
          <input type='text' name='lastName' id='lastName' value={basicInformation.lastName} onChange={handleInfoChange} /><br />
          <label htmlFor='name'>Location</label><br />
          <input type='text' name='location' id='location' value={basicInformation.location} onChange={handleInfoChange} /><br />
          <label htmlFor='name'>Phone Number</label><br />
          <input type='text' name='phone' id='phone' value={basicInformation.phone} onChange={handleInfoChange} /><br />
          <label htmlFor='name'>Email</label><br />
          <input type='text' name='email' id='email' value={basicInformation.email} onChange={handleInfoChange} /><br />
        </form>
        <Button className={classes.button} onClick={() => handleSave('info')}>Save</Button>
      </div>

      <div className={classes.infoContainer}>
        <h2>Account Settings</h2>
        <h3>Change Password</h3>
        <form>
          <label htmlFor='name'>New Password</label><br />
          <input type='password' name='password' id='password' value={password.password} onChange={handlePasswordChange} /><br />
          <label htmlFor='name'>Confirm new Password</label><br />
          <input type='password' name='passwordConfirm' id='passwordConfirm' value={password.passwordConfirm} onChange={handlePasswordChange} /><br />
        </form>
        {password.password === password.passwordConfirm ? null : <p className={classes.passwordAlert}>Passwords don't match</p>}
        {new RegExp(/!|@|#|\$|%|\^|&|\*|_/g).test(password.password) ? null : <p className={classes.passwordAlert}>Password must include a special character</p>}
        {new RegExp(/[A-Z]/g).test(password.password) ? null : <p className={classes.passwordAlert}>Password must include at least one uppercase character</p>}
        {password.password.length >= 8 && password.password.length <= 25 ? null : <p className={classes.passwordAlert}>Password must be between 8 and 25 characters long</p>}
        {passwordUpdated ? <p className={classes.passwordSuccess}>Passwords was updated!</p> : null}
  <Button className={classes.button} onClick={passwordIsValid() ? () => handleSave('password') : null}>{passwordIsValid() ? 'Reset Password' : 'Please make corrections'}</Button>
        <h3>Transactions</h3>
        <div>
          <Button className={classes.button}>Booking History</Button>
          <Button className={classes.button}>Income Statements</Button>
        </div>
        <h3>Email Notifications</h3>
        <FormControl component='fieldset'>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={notificationSettings.transactions} onChange={handleNotificationChange} name='transactions' />}
              label='Transactions'
            />
            <FormControlLabel
              control={<Checkbox checked={notificationSettings.news} onChange={handleNotificationChange} name='news' />}
              label='News and Updates'
            />
            <FormControlLabel
              control={<Checkbox checked={notificationSettings.deals} onChange={handleNotificationChange} name='deals' />}
              label='Deals'
            />
          </FormGroup>
        </FormControl>
        <h3>Deactivate Account</h3>
        <FormControlLabel
          control={<Checkbox checked={basicInformation.isActive} onChange={handleInfoChange} name='isActive' />}
          label='Account Active'
        /> <br />
        <Button className={classes.button} onClick={() => handleSave('info')}>Save</Button>
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

ManageAccount = connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
export default ManageAccount;