import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS,Response} from 'angular2/http';


@Injectable()
export class MusicService {
    items:Array<any>;
    http:Http;
    url:string;

    constructor(http:Http) {
        this.http = http;
        this.url = 'http://localhost:4730/api/';
    }

   getArtistWithAlbums(id){
        return this.http.get(this.url+'artist/'+id+'?relation=album');
    }
    
    getAlbumWithTracks(id){
        return this.http.get(this.url+'album/'+id+'?relation=track');
    }
    
    getPlaylistWithTracks(id){
        return this.http.get(this.url+'playlist/'+id+'?relation=track');
    }
    
    getTrack(id){
        return this.http.get(this.url+'track/'+id);
    }
    
    getAll(type){
        return this.http.get(this.url+type);
    }
    
    create(type, data){
        return this.http.post(this.url+type,data);
    }
}