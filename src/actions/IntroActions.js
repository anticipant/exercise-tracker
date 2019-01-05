export const ADD_NEW_RESULT = 'ADD_NEW_RESULT';

export function saveResult(currentResult) {
  return {
    type: ADD_NEW_RESULT,
    payload: currentResult,
  };
}
