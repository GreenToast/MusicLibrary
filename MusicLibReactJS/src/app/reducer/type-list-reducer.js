import * as types from '../actions/action-types';

const initialState = [];

export default function typeListReducer(state = initialState, action) {

  switch(action.type) {
    case types.LOAD_TYPES:
      return action.list;
  }

  return state;

}