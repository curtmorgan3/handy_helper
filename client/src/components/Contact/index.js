import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Typography, TextField, Button, MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  bugReport: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
    width: '90%'
  },
  reportHeader: {
    fontFamily: 'GibsonRegular',
    color: '#ff1452',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '2%',
    marginBottom: '2%',

    '& input': {
      margin: '5%'
    }
  },
  text: {
    fontFamily: 'GibsonRegular',
    textAlign: 'center',
    color: '#5ec7bc'
  }
}

const Contact = () => {
  // Component Styles
  const isSmallDevice = useMediaQuery('@media only screen and (min-device-width: 250px) and (max-device-width: 1024px)');

  if (isSmallDevice) {
    styles.form.width = '100%';
  }

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  /////////////////////

  // Redux
  const dispatch = useDispatch();
  /////////

  // Component State
  const [redirect, setRedirect] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  /////////////////

  const initialValues = {
    name: '',
    email: '',
    description: '',
    length: '',
    device: '',
    os: '',
    browser: '',
    recipe: ''
  }

  const validate = (values) => {
    const errors = {};

    if (!values.description) errors.description = 'Required';
    if (!values.name) errors.name = 'Required';
    if (!values.email) errors.email = 'Required';
    if (!values.device) errors.device = 'Required';
    if (!values.os) errors.os = 'Required';
    if (!values.browser) errors.browser = 'Required';


    if (values.email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
    }

    return errors;
  }

  const handleSubmit = async (vals) => {
    try {
      const errors = validate(vals);

      if (!Object.keys(errors).length) {
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          setRedirect(true);

        }, 2000)

      } 

    } catch (e) {
      console.error(e);
      setLoading(false);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to='/'/>
  }

  return (
    <div className={classes.bugReport}>
      <Typography className={classes.reportHeader} variant='h5'>Contact Customer Support</Typography>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ 
          isSubmitting,          
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
         <Form className={classes.form}>
           <div className={classes.row}>
              <TextField 
                style={{ width: '60%' }}
                label='Name'
                error={!!errors.name}
                helperText={errors.name}
                name="name" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} 
              />

              <TextField 
                style={{ width: '60%' }}
                label='Email'
                error={!!errors.email}
                helperText={errors.email}
                type="email" 
                name="email" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} 
              />
           </div>

          <div className={classes.row}>
            <Typography variant='body1' className={classes.text} style={{width: '80%', marginBottom: '2%'}}>
              What sort of device were you using?
            </Typography>
            <TextField 
              style={{ width: '60%' }}
              label='device'
              select
              error={!!errors.device}
              helperText={errors.device}
              name='device'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.device} 
            >
              {['Phone', 'Tablet', 'Laptop', 'Desktop'].map(val => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}

            </TextField>
           </div>

           <div className={classes.row}>
            <Typography variant='body1' className={classes.text} style={{width: '80%', marginBottom: '2%'}}>
              What operating system were you using?
            </Typography>
            <TextField 
              style={{ width: '60%' }}
              label='os'
              select
              error={!!errors.os}
              helperText={errors.os}
              name='os'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.os} 
            >
              {['Windows', 'MacOS', 'iOS', 'Android', 'Google (Chromebook)', 'Linux', 'Other'].map(val => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}

            </TextField>
           </div>

           <div className={classes.row}>
            <Typography variant='body1' className={classes.text} style={{width: '80%', marginBottom: '2%'}}>
              What browser were you using?
            </Typography>
            <TextField 
              style={{ width: '60%' }}
              label='browser'
              select
              error={!!errors.browser}
              helperText={errors.browser}
              name='browser'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.browser} 
            >
              {['Chrome', 'Safari', 'Firefox', 'Edge', 'Explorer', 'Opera', 'Other'].map(val => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}

            </TextField>
           </div>

           <div className={classes.row}>
            <TextField
              style={{width: '100%'}}
              multiline
              rows={6}
              label='Tell us what you found!'
              placeholder={
                `Please include a detailed description of what you experienced. The more detailed, the better!`
              }
              error={!!errors.description}
              helperText={errors.description}
              name="description" 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description} 
              variant="filled"
            />
           </div>

           {isLoading 
            ?
              <div style={{ height: '100px', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            :

              <Button onClick={() => handleSubmit(values)}>
                Submit
              </Button> 
           }

         </Form>
       )}


      </Formik>
    </div>
  )
}

export default Contact;