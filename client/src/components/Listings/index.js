import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllListings } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import Ajax from '../../Ajax';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

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
    height: '200px',
    width: '50%',
    margin: 'auto',
    marginBottom: '5%',
    '& div': {
      marginTop: '2%'
    }
  }
}

const Listings = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const allListings = useSelector(state => state.listings.allListings);
  const currentUser = useSelector(state => state.user.currentUser.user);
  /////////

  const [redirect, setRedirect] = React.useState(null);
  const [display, filterDisplay] = React.useState([]);
  const [filters, setFilters] = React.useState({
    skill: '',
    location: '',
    fee: ''
  })

  React.useEffect(() => {
    if (!currentUser) {
      setRedirect('/');
    }
  }, [currentUser]);

  React.useEffect(() => {
    const fetchListings = async () => {
      const listings = await Ajax.getAllListings();
      dispatch(setAllListings(listings.listings));
    }

    if (!allListings.length) {
      fetchListings();
    }
  }, []);

  React.useEffect(() => {
    if (!display.length) {
      if (!filters.skill && !filters.location && !filters.fee) {
        filterDisplay(allListings);
      }
    }
  }, [allListings, display, filters])

  const handleChange = (e) => {
    const update = { ...filters };
    update[e.target.name] = e.target.value;
    setFilters(update);
    applyFilters(update);
  }

  const applyFilters = (update) => {
    let filtered = display;

    if (update.skill) {
      filtered = filtered.filter(listing => {
        return listing.skill.toLowerCase().includes(update.skill.toLowerCase());
      });
    }

    if (update.location) {
      filtered = filtered.filter(listing => {
        return listing.location.toLowerCase().includes(update.location.toLowerCase());
      });
    }

    if (update.fee) {
      filtered = filtered.filter(listing => {
        const price = parseFloat(update.fee);
        return listing.suggestedPrice <= price;
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
      <Typography variant='h4'>Listings</Typography>

      <div className={classes.filters}>

        <TextField 
          variant='filled'
          label='Filter by Skill'
          name='skill'
          value={filters.skill}
          onChange={handleChange}
        />

        <TextField 
          variant='filled'
          label='Filter by Location'
          name='location'
          value={filters.location}
          onChange={handleChange}
        />

        <TextField 
          variant='filled'
          name='fee'
          label='Filter by Fee'
          value={filters.fee}
          onChange={handleChange}
        />

      </div>

      <div className={classes.listings}>

        {!display.length ? null : 
          display.map(listing => (
            <div key={listing.id} className={classes.listing}>
              <Typography variant='h5' style={{marginBottom: '5%'}}>{listing.title}</Typography>

              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='body1'>Location: {listing.location}</Typography>
                <Typography variant='body1'>Hourly Price: {listing.suggestedPrice}</Typography>
                <Typography variant='body1'>Skill: {listing.skill}</Typography>
              </div>

              <Typography style={{marginTop: '2%'}} variant='body1'>{listing.serviceDetails}</Typography>

            </div>
          ))
        }

      </div>


    </div>
  )
}

export default Listings;