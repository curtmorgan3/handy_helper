import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentUser } from '../../redux/actions';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography, Avatar, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const styles = {
  profile: {
    height: '100%',
    width: '60%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    borderRadius: '15px',
    padding: '2%',

    '& h5': {
      width: '40%'
    }
  },
  avatar: {
    height: '150px',
    width: '150px'
  }, 
  button: {
    textTransform: 'none',
    width: '100px',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    margin: 'auto',
  }, 
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    height: '80%',
    marginTop: '2%'
  },
  description: {
    width: '40%',
    height: '100%',
    backgroundColor: '#e9ecef',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    marginBottom: '2%'
  },
  edit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',

    '&:hover': {
      cursor: 'pointer'
    }
  }
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

let ViewProfile = (props) => {
  const isSmallDevice = useMediaQuery('@media only screen and (min-device-width: 250px) and (max-device-width: 1024px)');

  if (isSmallDevice) {
    styles.profile.width = '80%'
    styles.header.width = '90%'
    styles.header.flexDirection = 'column';
    styles.header.height = '40%';
    styles.header['& h5'].width = '100%';
    styles.button.width = '80%';
    styles.description.width = '100%';
  }

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [profile, setProfile] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const fetchProfile = async () => {
      let id = props.location.pathname.match(/profile\/[\d]+/);
      id = id ? id[0].split('profile/')[1] : null;

      if (id) {
        const userProfile = await Ajax.getUserById(id);
        if (!userProfile.user) {
          setRedirect(true);
        } else {
          setProfile(userProfile.user);
        }
      } else {
        if (!props.currentUser.user) {
          setRedirect(true);
        } else {
          setProfile(props.currentUser.user);
        }
      }
    }
    if (!profile) {
      fetchProfile();
    }
  }, [profile]);

  if (redirect) {
    return (
      <Redirect to='/' />
    )
  }

  if (!profile) {
    return (
      <div></div>
    )
  }

  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        {profile && profile.image 
          ? <Avatar className={classes.avatar} src={profile.image}/>

          : <div style={{height: '150px', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><PersonIcon style={{fontSize: '8rem'}}/></div>
        }
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', marginLeft: '2%'}}>
          <Typography style={{textAlign: 'center'}}variant='h5'>{profile.firstName + ' ' + profile.lastName}</Typography>
          <Typography style={{textAlign: 'center'}}variant='h5'>{profile.location}</Typography>
        </div>
        <Button className={classes.button}>Hire this Helper</Button>
      </div>
      <div className={classes.body}>
        <div className={classes.description}>
          <>
            <div className={classes.edit}>
              <Typography style={{textAlign: 'center'}} variant='h5'>Skills & Expertise</Typography>
            </div>
            <Typography variant='body1'>{profile.skill}</Typography>
          </>
          
        </div>
        <div className={classes.description}>
          <>
            <div className={classes.edit}>
              <Typography style={{textAlign: 'center'}} variant='h5'>Experience</Typography>
            </div>
            <Typography variant='body1'>{profile.experience}</Typography>
          </>
        </div>
      </div>
    </div>
  )
}

ViewProfile = connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
export default ViewProfile;