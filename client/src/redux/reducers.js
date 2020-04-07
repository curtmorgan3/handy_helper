import update from 'immutability-helper';
import { SET_CURRENT_USER, SIGN_USER_OUT } from './actions.js';
import { combineReducers } from 'redux';

const initialUserState = {
  currentUser: {},
  name: '',
  isHelper: false
};

const userReducer = (state = initialUserState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return update(state, {
        currentUser: {$set: action.payload}
      });

    case SIGN_USER_OUT:
      localStorage.removeItem('handy_helper_token');
      return update(state, {
        currentUser: {}
      }); 

    default:
      return state;
  };
};

const allReducers = combineReducers({
  user: userReducer
});

export default allReducers;