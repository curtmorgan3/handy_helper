import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentUser } from '../../redux/actions';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography, Avatar, Button, TextField, Checkbox } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SaveIcon from '@material-ui/icons/Save';

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
  availability: {
    width: '100%',
    height: '10%',
    marginTop: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

let BuildProfile = (props) => {
  const isSmallDevice = useMediaQuery('@media only screen and (min-device-width: 250px) and (max-device-width: 1024px)');

  if (isSmallDevice) {
    styles.profile.width = '80%'
    styles.header.width = '90%'
    styles.header.flexDirection = 'column';
    styles.header.height = '40%';
    styles.header['& h5'].width = '100%';
    styles.button.width = '80%';
    styles.description.width = '100%';
    styles.availability.flexDirection = 'column';
  }

  const [isEditing, setEditing] = React.useState(false);
  const [skillsEdit, setSkills] = React.useState('');
  const [experienceEdit, setExperience] = React.useState('');
  const [availability, setAvailability] = React.useState({
    Mon: false,
    Tues: false,
    Wed: false,
    Thurs: false,
    Fri: false,
    Sat: false,
    Sun: false
  });
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const { currentUser: { user } } = props;

  React.useEffect(() => {
    if (user && user.availability) {
      setAvailability(JSON.parse(user.availability));
    }
  }, []);

  if (!user) {
    return (
      <Redirect to='/'/>
    )
  }

  const handleChange = (event) => {
    if (event.target.name === 'skills') {
      setSkills(event.target.value);
    } else {
      setExperience(event.target.value);
    }
  }

  const handleAvailabilityChange = (day) => {
    const update = {...availability};
    update[day] = !update[day];
    setAvailability(update);
  }

  const handleEdit = () => {
    setSkills(user.skill);
    setExperience(user.experience);
    setEditing(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUser = {...user};
    updatedUser.skill = skillsEdit;
    updatedUser.experience = experienceEdit;
    updatedUser.availability = JSON.stringify(availability);

    const res = await Ajax.updateUser(updatedUser);
    props.setCurrentUser(res.user);
    setEditing(false);
  }

  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        {user.image 
          ? <Avatar className={classes.avatar} src={user.image}/>

          : <div style={{height: '150px', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><PersonIcon style={{fontSize: '8rem'}}/></div>
        }
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', marginLeft: '2%'}}>
          <Typography style={{textAlign: 'center'}}variant='h5'>{user.firstName + ' ' + user.lastName}</Typography>
          <Typography style={{textAlign: 'center'}}variant='h5'>{user.location}</Typography>
        </div>
        <Button className={classes.button}>Hire this Helper</Button>
      </div>

      <div className={classes.availability}>
        <div style={{display: 'flex'}}>
          {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map(day => {
            return (
              <div key={day} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='body2'>{day}</Typography>
                <Checkbox checked={availability[day]} onChange={() => handleAvailabilityChange(day)} />
              </div>
            )
          })}
        </div>
        <Button className={classes.button} style={{height: '30px', margin: '1%'}} onClick={handleSave}>Save</Button>
      </div>

      <div className={classes.body}>
        <div className={classes.description}>
          {isEditing 
            ?
              <>
              <div className={classes.edit}>
                <Typography style={{textAlign: 'center'}} variant='h5'>Skills & Expertise</Typography>
                <SaveIcon style={{marginLeft: '5%'}} onClick={handleSave} />
              </div>
              <TextField multiline name='skills' value={skillsEdit} onChange={handleChange} />
              </>
            :
              <>
              <div className={classes.edit}>
                <Typography style={{textAlign: 'center'}} variant='h5'>Skills & Expertise</Typography>
                <EditIcon style={{marginLeft: '5%'}} onClick={handleEdit}/>
              </div>
              <Typography variant='body1'>{user.skill}</Typography>
              </>
          }
          
        </div>
        <div className={classes.description}>
        {isEditing 
            ?
              <>
              <div className={classes.edit}>
                <Typography style={{textAlign: 'center'}} variant='h5'>Experience</Typography>
                <SaveIcon style={{marginLeft: '5%'}} onClick={handleSave} />
              </div>
              <TextField multiline name='experience' value={experienceEdit} onChange={handleChange} />
              </>
            :
              <>
              <div className={classes.edit}>
                <Typography style={{textAlign: 'center'}} variant='h5'>Experience</Typography>
                <EditIcon style={{marginLeft: '5%'}} onClick={handleEdit}/>
              </div>
              <Typography variant='body1'>{user.experience}</Typography>
              </>
          }
        </div>
      </div>
    </div>
  )
}

BuildProfile = connect(mapStateToProps, mapDispatchToProps)(BuildProfile);
export default BuildProfile;