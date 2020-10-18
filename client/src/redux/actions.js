// Action Types
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SIGN_USER_OUT = 'SIGN_USER_OUT';
export const SET_ALL_LISTINGS = 'SET_ALL_LISTINGS';

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