import React from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { setAllBookings, setNewBooking } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';

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
  listings: {
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listing: {
    width: '100%',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    backgroundColor: '#E9ECEF',
    padding: '5%',
    borderRadius: '15px',
    overflowY: 'scroll'
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    width: '50%',
    margin: 'auto',
    marginBottom: '5%',
    '& div': {
      marginTop: '2%'
    }
  }
}

const Bookings = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const allBookings = useSelector(state => state.bookings.allBookings);
  const currentUser = useSelector(state => state.user.currentUser.user);
  /////////

  const [redirect, setRedirect] = React.useState(null);
  const [display, filterDisplay] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [filters, setFilters] = React.useState({
    year: '',
  })

  React.useEffect(() => {
    if (!currentUser) {
      setRedirect('/');
    }
  }, [currentUser]);

  React.useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await Ajax.getMyBookings();
      dispatch(setAllBookings(bookings));
    }

    if (!allBookings || !allBookings.length) {
      fetchBookings();
    }
  }, []);

  React.useEffect(() => {
    if (!display.length && !filters.year) {
      filterDisplay(allBookings);
    }
  }, [allBookings, display, filters])


  const handleClick = async (id) => {
    await Ajax.deleteBooking(id);
    const filtered = display.filter(book => book.id !== id);
    filterDisplay(filtered);
    dispatch(setAllBookings(filtered));
  }

  const handleChange = (e) => {
    const targ = e.target.value;
    if (!targ) setError(null);

    if (new RegExp(/[A-Za-z]+/g).test(targ)) setError('Please remove any words from the year field.');
    if (new RegExp(/!|\?|\*|&|%|\$|#|@/).test(targ)) setError('Please remove any special characters from the year field.');
    if (parseInt(targ) > 2020) setError("You can't select a year that is in the future.");
    if (targ.length >= 4 && parseInt(targ) < 2000) setError('Your selected year cannot be before 2000.');

    const update = { ...filters };
    update[e.target.name] = targ;
    setFilters(update);
    applyFilters(update);
  }

  const applyFilters = (update) => {
    let filtered = display;

    if (update.year) {
      filtered = filtered.filter(booking => {
        return booking.createdAt.includes(update.year);
      });
    }

    filterDisplay(filtered);
  }

  if (redirect) {
    return (
      <Redirect to={redirect} />
    )
  }

  return (
    <div className={classes.container}>
      <Typography variant='h4'>My Bookings</Typography>

      <div className={classes.listings}>

      <div className={classes.filters}>

        <TextField 
          variant='filled'
          label='Filter by Year'
          name='year'
          value={filters.year}
          onChange={handleChange}
        />

        {error ? <Typography style={{color: 'red'}}>{error}</Typography> : null}


        </div>

        {!display.length ? null : 
          display.map(listing => (
            <div key={listing.id} className={classes.listing}>
              <Typography variant='h5' style={{marginBottom: '5%'}}>{listing.title}</Typography>

              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='body1'>Location: {listing.location}</Typography>
                <Typography variant='body1'>Date: {format(new Date(listing.createdAt), 'MM/dd/yyyy')}</Typography>
                <Typography variant='body1'>Hourly Price: {listing.price}</Typography>
                <Typography variant='body1'>Skill: {listing.skill}</Typography>
              </div>

              <Typography style={{marginTop: '2%'}} variant='body1'>{listing.serviceDetails}</Typography>
              <Button onClick={() => handleClick(listing.id)}>Cancel this booking</Button>
            </div>
          ))
        }

      </div>


    </div>
  )
}

export default Bookings;