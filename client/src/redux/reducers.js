import update from 'immutability-helper';
import { SET_CURRENT_USER, SIGN_USER_OUT, SET_ALL_LISTINGS, SET_NEW_BOOKING, SET_ALL_BOOKINGS } from './actions.js';
import { combineReducers } from 'redux';

const initialUserState = {
  currentUser: {},
  name: '',
  isHelper: false
};

const initialListingState = {
  allListings: []
}

const initialBookingState = {
  newBooking: {},
  allBookings: []
}

const userReducer = (state = initialUserState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return update(state, {
        currentUser: {$set: action.payload}
      });

    case SIGN_USER_OUT:
      localStorage.removeItem('handy_helper_token');
      window.location.reload();
      return update(state, {
        currentUser: {}
      }); 

    default:
      return state;
  };
};

const listingReducer = (state = initialListingState, action) => {
  switch(action.type) {
    case SET_ALL_LISTINGS:
      return update(state, {
        allListings: {$set: action.payload}
      });
    default:
      return state;
  };
};

const bookingReducer = (state = initialBookingState, action) => {
  switch(action.type) {
    case SET_NEW_BOOKING:
      return update(state, {
        newBooking: {$set: action.payload}
      });
    case SET_ALL_BOOKINGS:
      return update(state, {
        allBookings: {$set: action.payload}
      });
    default:
      return state;
  };
};

const allReducers = combineReducers({
  user: userReducer,
  listings: listingReducer,
  bookings: bookingReducer,
});

export default allReducers;