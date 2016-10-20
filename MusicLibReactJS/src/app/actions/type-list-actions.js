import * as types from './action-types';

export function loadTypeListAction(data) { 
    return {
        type: types.LOAD_TYPES,
        list: data
    }
}