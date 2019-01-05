import { combineReducers } from 'redux';
import { pageReducer } from './page';
import { userReducer } from './user';
import { introReducer } from './intro';

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  data: introReducer,
});
