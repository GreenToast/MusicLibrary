import {noView,inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import 'fetch';

@noView()
@inject(HttpClient)
export class MusicService {

	
	constructor(http) {
    	this.http = http;
    	this.http.configure(x => 
			x.withBaseUrl('http://localhost:4730/api/'));
  	}
    
    getArtistWithAlbums(id){
        return this.http.get('artist/'+id+'?relation=album');
    }
    
    getAlbumWithTracks(id){
        return this.http.get('album/'+id+'?relation=track');
    }
    
    getPlaylistWithTracks(id){
        return this.http.get('playlist/'+id+'?relation=track');
    }
    
    getTrack(id){
        return this.http.get('track/'+id);
    }
    
    getAll(type){
        return this.http.get(type);
    }
    
    create(type, data){
        return this.http.post(type,data);
    }

    

}