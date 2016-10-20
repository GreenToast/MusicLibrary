import * as types from './action-types';

export function loadTypeAction(data) { 
    return {
        type: types.LOAD_TYPE,
        data: data
    }
}