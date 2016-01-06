
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
