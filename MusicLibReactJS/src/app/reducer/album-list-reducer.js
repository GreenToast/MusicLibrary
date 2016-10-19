import * as types from '../actions/action-types';

const initialState = [];

export default function albumListReducer(state = initialState, action) {

  switch(action.type) {

    case types.LOAD_ALBUMS:
      return Object.assign({}, state, { albums: action.albums });
  }

  return state;

}