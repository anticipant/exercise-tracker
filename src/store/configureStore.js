import { createStore, applyMiddleware } from 'redux';

// Logger with default options
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

// удалил "начальное состояние = initial state"
// так как теперь наш редьюсер составной,
// и нам нужны initialState каждого редьюсера.
// Это будет сделано автоматически.

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
