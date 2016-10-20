import { createStore } from 'redux';
import { combineReducers } from 'redux';
import typeListReducer from './type-list-reducer';
import typeReducer from './type-reducer';

const reducers = combineReducers({
    typelist: typeListReducer,
    type: typeReducer
});

const store = createStore(reducers);
export default store;