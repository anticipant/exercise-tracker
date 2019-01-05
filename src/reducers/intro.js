import { ADD_NEW_RESULT } from '../actions/IntroActions';

const DATA = 'data';
const initialState = {
  results: JSON.parse(localStorage.getItem(DATA)) || [],
  currentResult: null,
};

const introReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_RESULT: {
      const currentResult = {
        id: `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`,
        result: action.payload,
      };

      const sortedResults = [currentResult].concat(state.results);
      localStorage.setItem(DATA, JSON.stringify(sortedResults));

      return { ...state, results: sortedResults };
    }

    default:
      return state;
  }
};

export default introReducer;
