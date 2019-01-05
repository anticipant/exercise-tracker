import { combineReducers } from 'redux';
import introReducer from './intro';

const rootReducer = combineReducers({
  data: introReducer,
});

export default rootReducer;
