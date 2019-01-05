import { combineReducers } from 'redux';
import { introReducer } from './intro';

export const rootReducer = combineReducers({
  data: introReducer,
});
