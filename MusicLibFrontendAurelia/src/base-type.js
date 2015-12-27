import {computedFrom} from 'aurelia-framework';

export class BaseType{
    type = '';
    isArtist = (this.type === 'artist');
    isAlbum = (this.type === 'album');
    isTrack = (this.type === 'track');
    isPlaylist = (this.type === 'playlist');

    @computedFrom('type')
    get capitalizedType(){
    	console.log('capitalizedType', this.type.charAt(0).toUpperCase() + this.type.slice(1));
        return this.type.charAt(0).toUpperCase() + this.type.slice(1);
	};

	activate(params, routeConfig, navigationInstruction){
		this.isArtist = (this.type === 'artist');
    	this.isAlbum = (this.type === 'album');
    	this.isTrack = (this.type === 'track');
    	this.isPlaylist = (this.type === 'playlist');
    	console.log(this,this.capitalizedType,routeConfig);
	}

}