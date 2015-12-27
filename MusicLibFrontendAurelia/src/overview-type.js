/*
angular.module('MusicLibraryApp').controller('OverviewTypeController',function ($scope,MusicService,$routeParams,capitalizeFirstLetter) {
    
    //scope variables
    $scope.type = $routeParams.type;
    $scope.isArtist = ($scope.type === 'artist');
    $scope.isAlbum = ($scope.type === 'album');
    $scope.isTrack = ($scope.type === 'track');
    $scope.isPlaylist = ($scope.type === 'playlist');
    $scope.search;
    $scope.newtypeData = {};
    
    //scope functions
    $scope.getCapitalizedType = function(){ return capitalizeFirstLetter($scope.type);};
    
    $scope.createAction = function(){
        addConvertedList(connType);
        console.log('listselected',$scope.newtypeData);
        MusicService.create($scope.type, $scope.newtypeData).then(function(result){
            loadData();
        },
        function(error){
            console.log('error');
        });
    }
    
    $scope.cleanAction = function(){
        $scope.newtypeData = {properties:{}};
        $scope.listselected = [];
    }
    
    //private variables
    var connType = '';
    
    //private functions
    function addConvertedList(toType){
        var capType = capitalizeFirstLetter(toType);
        if($scope.listselected.length > 0){
            $scope.newtypeData[capType] = [];
        };
        $scope.listselected.forEach(function(el,i){
            var obj = {
                "relation": {},
            }
            obj[capType]=el;
            if(toType == 'track'){
                obj.relation.trackNo = i+1;
            }
            $scope.newtypeData[capType].push(obj);
        });
    }
    
    function loadData(){
    //exclude track from being able to dragdrop types
        if(!$scope.isTrack){
            $scope.listselected = [];
            $scope.listlib = [];

            //define associated type, provisional

            if($scope.isArtist)
                connType = 'album';
            if($scope.isAlbum)
                connType = 'track';
            if($scope.isPlaylist)
                connType = 'track';
                MusicService.getAll(connType).then(function(listlib){
                $scope.listlib = listlib.data;
                },
                function(error){
                    console.log('error',error);
                });
        }
        //load all types, TODO: filter by search result, reduce to 10, results
        MusicService.getAll($scope.type).then(function(res) {
            $scope.tabledata = res.data;
        },function(error){
            console.error('An error happened!',error);
        });
    }
    
    // init Actions
    
    loadData();
    
});*/
import {inject} from 'aurelia-framework';
import {MusicService} from'music-service';
import {INVOKE_LIFECYCLE} from 'aurelia-router';
import {BaseType} from 'base-type';

@inject(MusicService)
export class OverviewType extends BaseType{


	constructor(musicService){
		super();
		this.musicService = musicService;
	}

	
    
    search;
    newtypeData = {};

    

    createAction(){
        addConvertedList(connType);
        this.musicService.create(this.type, this.newtypeData).then(response=>loadData(),error=>console.log('error',error));
    }

    cleanAction(){
        this.newtypeData = {properties:{}};
        this.istselected = [];
    }

    determineActivationStrategy(params, routeConfig, navigationInstruction){
    	this.activate(params, routeConfig, navigationInstruction);
	    return INVOKE_LIFECYCLE;
	}

	activate(params, routeConfig, navigationInstruction){
		this.type = navigationInstruction.parentInstruction.fragment.split('/')[1];
		console.log(this);
		super.activate(params, routeConfig, navigationInstruction); 
		console.log(this);   
    	this.loadData();
	}

	loadData(){
		//var connType = '';
    //exclude track from being able to dragdrop types
        /*if(!this.isTrack){
            this.listselected = [];
            this.listlib = [];

            //define associated type, provisional

            if(this.isArtist)
                connType = 'album';
            if(this.isAlbum)
                connType = 'track';
            if(this.isPlaylist)
                connType = 'track';
            console.log('connType',connType);
                this.musicService.getAll(connType)
                .then(res => {this.listlib = JSON.parse(res.response);console.log('listlib',this.listlib);});
                
        }*/
        //load all types, TODO: filter by search result, reduce to 10, results
        this.musicService.getAll(this.type).then(res => {this.tabledata = JSON.parse(res.response);console.log('tabledata',this.tabledata);});
        //.then(response => response.json())
      //.then(tabledata => this.tabledata = tabledata);
    }


}
