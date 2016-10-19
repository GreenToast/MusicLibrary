import * as types from './action-types';

export function loadAlbumsAction(albums) { 
    return {
        type: types.LOAD_ALBUMS,
        albums: albums
    }
}