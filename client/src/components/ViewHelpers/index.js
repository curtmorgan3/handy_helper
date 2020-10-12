import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Ajax from '../../Ajax';

import { Avatar, Typography, TextField, Checkbox } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginTop: '2%',
    alignItems: 'center'
  },
  helper: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    marginTop: '5%',
    width: '50%'
  },
  heading: {
    display: 'flex',
    height: '50%',
    width: '100%',
    alignItems: 'center',
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  skills: {
    display: 'flex',
    alignItems: 'center',
    height: '50%',
    justifyContent: 'space-between'
  }
}

const ViewHelpers = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [allHelpers, setAllHelpers] = React.useState([]);
  const [display, setDisplay] = React.useState([]);
  const [filterAvailability, setFilterAvailability] = React.useState({
    'Mon': false,
    'Tues': false,
    'Wed': false,
    'Thurs': false,
    'Fri': false,
    'Sat': false,
    'Sun': false,
  });
  const [filterSkill, setSkill] = React.useState('');
  const [filterFee, setFee] = React.useState(0);

  React.useEffect(() => {
    const fetchAllHelpers = async () => {
      const helpers = await Ajax.fetchAllHelpers();
      setAllHelpers(helpers.allHelpers);
    }
    if (!allHelpers.length) {
      fetchAllHelpers();
    }
  });

  React.useEffect(() => {
    if (!display.length) {
      setDisplay(allHelpers);
    }
  },[]);

  // Filter by Skill
  React.useEffect(() => {
    const filterHelpersBySkill = async () => {
      const data= await Ajax.searchHelpersBySkill(filterSkill);
      const helpers = data.users;

      setDisplay(helpers);
    }

    filterHelpersBySkill();

  }, [filterSkill]);

  // Filter by Availability
  React.useEffect(() => {
    const filtered = allHelpers.filter(helper => {
      const availability = JSON.parse(helper.availability);
      const selectedDays = Object.keys(filterAvailability).filter(day => filterAvailability[day]);
      
      let allMatch = true;

      selectedDays.forEach(day => {
        if (!availability[day]) allMatch = false;
      });

      return allMatch;
    });

    setDisplay(filtered);

  }, [filterAvailability])

  // Filter by Fee
  React.useEffect(() => {
    const filtered = allHelpers.filter(helper => {
      return helper.fee <= filterFee;
    });

    if (filterFee > 0) {
      setDisplay(filtered);
    } else {
      setDisplay(allHelpers);
    }

  }, [filterFee])

  const handleSetAvailability = (day) => {
    const update = {...filterAvailability};
    update[day] = !update[day];
    setFilterAvailability(update);
  }

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'skill':
        setSkill(e.target.value);
      break;

      case 'fee': 
        setFee(parseFloat(e.target.value));
      break;

      default:
        return;
    }
  }


  return (
    <div className={classes.container}>
      <TextField 
        style={{width: '50%', marginBottom: '2%'}}
        placeholder='Search by Skill'
        value={filterSkill}
        name='skill'
        onChange={handleChange}
      />

      <Typography variant='h6'>Filter by Availability</Typography>

      <div style={{marginTop: '2%'}}>
        <div style={{display: 'flex'}}>
          {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map(day => {
            return (
              <div key={day} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='body2'>{day}</Typography>
                <Checkbox checked={filterAvailability[day]} onChange={() => handleSetAvailability(day)} />
              </div>
            )
          })}
        </div>
      </div>

      <TextField 
        style={{width: '20%', marginTop: '2%'}}
        placeholder='Search by Fee'
        label='$'
        name='fee'
        value={filterFee}
        type='number'
        onChange={handleChange}
      />

      {display.length && display.map(helper => (
        <div key={helper.id} className={classes.helper}>
          <div className={classes.heading}>
            <Avatar src={helper.image} alt={helper.firstName} style={{height: '100px', width: '100px'}}/>
            <div className={classes.headerDetails}>
              <Typography variant='h6'>{helper.firstName + ' ' + helper.lastName}</Typography>
              <Typography variant='body1'>{helper.location}</Typography>
              <Typography variant='body1'>{`$${helper.fee.toFixed(2)} / hour`}</Typography>
            </div>
          </div>
          <div className={classes.skills}>
            <Typography variant='body1'>{helper.skill}</Typography>

            <div style={{width: '50%'}}>
              <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map(day => {
                  const availability = helper.availability ? JSON.parse(helper.availability) : {};
                  return (
                    <div key={day} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Typography variant='body2'>{day}</Typography>
                      {availability[day] ? 'Yes' : 'No'}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ViewHelpers;