import {bindable, inject} from 'aurelia-framework';
import {MusicService} from'music-service';
import {BaseType} from 'base-type';
import $ from 'jquery';

@inject(MusicService)
export class CreateType extends BaseType{
	
	@bindable type;

	listselected = [];
    //selectedlist = [];
    listlib =[];

	constructor(musicService){
		super();
		this.musicService = musicService;
		this.newtypeData = {properties:{}};
		console.log(this);
		
	}

	attached(){
		
	}

	activate(params, routeConfig, navigationInstruction){
		super.activate(params, routeConfig, navigationInstruction);
		this.loadData();
	}

	typeChanged(newValue, oldValue) {
		this.isArtist = (this.type === 'artist');
    	this.isAlbum = (this.type === 'album');
    	this.isTrack = (this.type === 'track');
    	this.isPlaylist = (this.type === 'playlist');
		this.loadData();
	}

	
	
	loadData(){
		this.connType = '';
    //exclude track from being able to dragdrop types
        if(!this.isTrack){

            

            //define associated type, provisional

            if(this.isArtist)
                this.connType = 'album';
            if(this.isAlbum)
                this.connType = 'track';
            if(this.isPlaylist)
                this.connType = 'track';
            if(this.connType)
                this.musicService.getAll(this.connType)
                .then(res => {this.listlib = JSON.parse(res.response);console.log('listlib',this.listlib);});
            else
            	this.listlib = [];
                
        }
        //load all types, TODO: filter by search result, reduce to 10, results
        //this.musicService.getAll(this.type).then(res => {this.tabledata = JSON.parse(res.response);console.log('tabledata',this.tabledata);});
        //.then(response => response.json())
      //.then(tabledata => this.tabledata = tabledata);
    }

    createAction(){
        var capType = this.connType.charAt(0).toUpperCase() + this.connType.slice(1);
        if(this.listselected.length > 0){
            this.newtypeData[capType] = [];
        };
        this.listselected.forEach((el,i) =>
        	//var el = this.listselected[i];
            {var obj = {
                "relation": {},
            }
            obj[capType]=el;
            if(this.connType == 'track'){
                obj.relation.trackNo = i+1;
            }
            this.newtypeData[capType].push(obj);
        	}
        );
        var json = JSON.stringify(this.newtypeData);
        console.log(this.newtypeData, this.newtypeData.properties,json);
        this.musicService.create(this.type, json).then(res=>console.log('created',JSON.parse(res.response)));
    }

    cleanAction(){
        this.newtypeData = {properties:{}};
        this.listselected = [];
    }

}