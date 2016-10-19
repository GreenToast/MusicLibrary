import axios from 'axios';
import * as actions from "../actions/album-actions";
import store from '../reducer/store';

        
const url = "http://localhost:4730/api/";

export function getAll(type){
    return axios.get(url+type)
    .then(response => {
      store.dispatch(actions.loadAlbumsAction(response.data));
      return response;
    });
}

/*export function getArtistWithAlbums (id){
    return axios.get(url+'artist/'+id+'?relation=album')
    .then(response => {
      store.dispatch(new (response.data));
      return response;
    });
};
        
        
export function getAlbumWithTracks(id){
    return axios.get(url+'album/'+id+'?relation=track');
};
        
export function getPlaylistWithTracks(id){
    return axios.get(url+'playlist/'+id+'?relation=track');
};
        
export function getTrack(id){
    return axios.get(url+'track/'+id);
};

export function create(type, data){
    return axios.post(url+type,data);
};*/