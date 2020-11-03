// Action Types
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SIGN_USER_OUT = 'SIGN_USER_OUT';
export const SET_ALL_LISTINGS = 'SET_ALL_LISTINGS';
export const SET_NEW_BOOKING = 'SET_NEW_BOOKING';
export const SET_ALL_BOOKINGS = 'SET_ALL_BOOKINGS';

// Actions
export function setCurrentUser(payload) {
  return { type: SET_CURRENT_USER, payload };
};

export function signUserOut(payload) {
  return { type: SIGN_USER_OUT, payload};
};

export function setAllListings(payload) {
  return { type: SET_ALL_LISTINGS, payload};
}

export function setNewBooking(payload) {
  return { type: SET_NEW_BOOKING, payload};
}

export function setAllBookings(payload) {
  return { type: SET_ALL_BOOKINGS, payload};
}