import { createStore } from 'redux';
import allReducers from './reducers.js';

const store = createStore(allReducers);

export default store;