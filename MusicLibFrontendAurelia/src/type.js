/*
angular.module('MusicLibraryApp').controller('TypeController',function ($scope,MusicService,$routeParams,capitalizeFirstLetter) {
    var id = $routeParams.id;
    $scope.type = $routeParams.type;
    $scope.isArtist = ($scope.type === 'artist');
    $scope.isAlbum = ($scope.type === 'album');
    $scope.isTrack = ($scope.type === 'track');
    $scope.isPlaylist = ($scope.type === 'playlist');
    $scope.getCapitalizedType = function(){ return capitalizeFirstLetter($scope.type);};
    
    if($scope.isArtist){
        MusicService.getArtistWithAlbums(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
    
    if($scope.isAlbum){
        MusicService.getAlbumWithTracks(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
    
    if($scope.isTrack){
        MusicService.getTrack(id).then(function(res) {
            $scope.data = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
});
*/

import {inject} from 'aurelia-framework';
import {BaseType} from 'base-type';
import {INVOKE_LIFECYCLE} from 'aurelia-router';
import {MusicService} from 'music-service';

@inject(MusicService)
export class Type extends BaseType{

	constructor(musicService){
		super();
		this.musicService = musicService;
	}

	determineActivationStrategy(params, routeConfig, navigationInstruction){
    	this.activate(params, routeConfig, navigationInstruction);
	    return INVOKE_LIFECYCLE;
	}

	activate(params, routeConfig, navigationInstruction){
		this.id = params.id;
		this.type = navigationInstruction.parentInstruction.fragment.split('/')[1];
		console.log(this);
		super.activate(params, routeConfig, navigationInstruction); 
		console.log(this); 
		this.loadType();
	}

	loadType(){
		if(this.isArtist){
	        this.musicService.getArtistWithAlbums(this.id).then(res=>{this.data = JSON.parse(res.response);console.log('getArtistWithAlbums',this.data)},error=>console.error('An error happened!',error));
	    }
	    
	    if(this.isAlbum){
	        this.musicService.getAlbumWithTracks(this.id).then(res=>this.data = JSON.parse(res.response),error=>console.error('An error happened!',error));
	    }
	    
	    if(this.isTrack){
	        this.musicService.getTrack(this.id).then(res=>this.data = JSON.parse(res.response),error=>console.error('An error happened!',error));
	    }
	}

	
}