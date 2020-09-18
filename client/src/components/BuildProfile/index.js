import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentUser } from '../../redux/actions';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography, Avatar, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SaveIcon from '@material-ui/icons/Save';
import ImageUploader from 'react-images-upload';
//Working on this


const styles = {
  profile: {
    height: '100%',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    borderRadius: '15px',
    padding: '2%',

    '& h5': {
      width: '20%'
    }
  },
  avatar: {
    height: '100px',
    width: '100px'
  }, 
  button: {
    textTransform: 'none',
    width: '100px',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    margin: 'auto',
  }, 
  button2: {
    textTransform: 'none',
    width: '100px',
    height: '50px',
    backgroundColor: '#0069D9',
    color: '#ffffff',
    marginLeft: '230px',
    position: 'absolute',
    left: '180px',
    top: '120px'
    
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
    height: '80%',
    backgroundColor: '#e9ecef',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    marginBottom: '2%',
  },
  edit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',

  }
  
  
}

// Responsive Code
//It's still buggy with buttons not changing there positions


const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
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
  }

  
  

  const [isEditing, setEditing] = React.useState(false);
  const [skillsEdit, setSkills] = React.useState('');
  const [experienceEdit, setExperience] = React.useState('');
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [status, setStatus] = React.useState(false);
  const { currentUser: { user } } = props;

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

    const res = await Ajax.updateUser(updatedUser);
    props.setCurrentUser(res.user);
    setEditing(false);
  }

  return (
    
    <div className={classes.profile}>
      <div className={classes.header}>

        {user.image 
          ? <Avatar className={classes.avatar} src={user.image}/>

          : <div style={{height: '160px', width: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',boarderRadius:"80px"}}><PersonIcon style={{fontSize: '8rem'}}/></div>
        }

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', marginLeft: '1%'}}>
          <Typography style={{textAlign: 'center'}}variant='h5'>{user.firstName + ' ' + user.lastName + ','}</Typography>
          <Typography style={{textAlign: 'center'}}variant='h5'>{user.location}</Typography>
          <Button onClick={() => setStatus(!status)} className={classes.button2}>
      
          {`Available: ${status ? 'Yes' : 'No'}`}
          
          </Button>
        </div>
        <Button className={classes.button}>Hire this Helper</Button>
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
              <TextField multiline name='skills' placeholder = "Enter Skills" value={skillsEdit} onChange={handleChange} />
              <br/>
              <label>Skills :</label><select  defaultValue = "Select Gender">
                <option defaultValue>Select Skills</option>
                <option value = "work">Painter</option>
                <option value = "work">Electrician</option>
                <option value = "other">other</option>
              </select><br />
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
                <Typography style={{textAlign: 'center'}} variant='h5'>About and Experience</Typography>
                <SaveIcon style={{marginLeft: '5%'}} onClick={handleSave} />
              </div>
              <TextField multiline name='experience' placeholder = 'Company name, organization,etc'value={experienceEdit} onChange={handleChange} />
              <br/>
              <form><label>Years of Experience: <input name="numberOfGuests" type="number" />
          </label></form>
              </>
            :
              <>
              <div className={classes.edit}>
                <Typography style={{textAlign: 'center'}} variant='h5'>About and Experience</Typography>
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