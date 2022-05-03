import { useReducer } from 'react';

const initialState = {};

const actionTypes = {
  done: 'done',
  error: 'error',
  clear: 'clear'
};

const stepStates = {
  hidden: 'hidden',
  choose: 'choose',
  done: 'done',
  error: 'error'
};

const reducer = (state, action) => {
  const stepCount = Object.keys(state).length;
  const lastStepNumber = stepCount - 1;

  switch (action.type) {
    case actionTypes.done:
      return lastStepNumber === action.payload
        ? { ...state, [action.payload]: stepStates.done }
        : { ...state, [action.payload]: stepStates.done, [action.payload + 1]: stepStates.choose };
    case actionTypes.error:
      return { ...state, [action.payload]: stepStates.error };
    case actionTypes.clear: {
      const newState = {};
      for (let i = 0; i < stepCount; i++) {
        if (i < action.payload) {
          newState[i] = state[i];
        } else if (i === action.payload) {
          newState[i] = stepStates.choose;
        } else {
          newState[i] = stepStates.hidden;
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

const useTableSteps = (stepsCount) => {
  for (let i = 0; i < stepsCount; i++) {
    initialState[i] = i === 0 ? stepStates.choose : stepStates.hidden;
  }

  const [currentState, dispatch] = useReducer(reducer, initialState);

  const doneAction = (id) => {
    dispatch({ type: actionTypes.done, payload: id });
  };

  const bugAction = (id) => {
    dispatch({ type: actionTypes.error, payload: id });
  };

  const clearAction = (id) => {
    dispatch({ type: actionTypes.clear, payload: id });
  };

  return { currentState, stepStates, doneAction, bugAction, clearAction };
};

export default useTableSteps;
