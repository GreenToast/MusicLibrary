import * as types from '../actions/action-types';

const initialState = null;

export default function typeReducer(state = initialState, action) {

  switch(action.type) {
    case types.LOAD_TYPE:
      return action.data;
  }

  return state;

}