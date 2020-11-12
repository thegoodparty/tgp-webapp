import { combineReducers } from 'redux';
// create your reducer
const reducerTemp = (state = { tick: 'init' }, action) => {
  switch (action.type) {
    case 'TICK':
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  temp: reducerTemp,
});

export default reducer;
