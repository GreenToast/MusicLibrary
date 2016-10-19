import { createStore } from 'redux';
import { combineReducers } from 'redux';
import albumListReducer from './album-list-reducer';

const reducers = combineReducers({
    albums: albumListReducer
});

const store = createStore(reducers);
export default store;