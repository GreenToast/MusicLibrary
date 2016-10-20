import axios from 'axios';
import * as typelistactions from "../actions/type-list-actions";
import * as typeactions from "../actions/type-actions";
import store from '../reducer/store';

        
const url = "http://localhost:4730/api/";

export function getAll(type){
    return axios.get(url+type)
    .then(response => {
      store.dispatch(typelistactions.loadTypeListAction(response.data));
      return response;
    });
}

export function getTypeWithRelations(type,id){
    let querypath = url+type+"/"+id
    switch(type){
        case "album":
        querypath += "?relation=track";
        break;
        case "artist":
        querypath += "?relation=album";
        break;
    }
    return axios.get(querypath)
    .then(response => {
      store.dispatch(typeactions.loadTypeAction(response.data));
      return response;
    });
}

export function create(type, data){
    return axios.post(url+type,data);
};