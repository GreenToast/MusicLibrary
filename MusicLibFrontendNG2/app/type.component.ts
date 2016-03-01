import {Component} from 'angular2/core';
import {MusicService} from './services/music.service';
import {BaseTypeComponent} from './base-type.component';
import {RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {BaseType, Properties} from './classes/base-type';

@Component({
	template: `
    <div class="main-countainer">
        <h1>{{capitalizedType}}</h1>        
        <h2>{{data.properties.name}}</h2>
        <ul>
            <li *ngIf="isArtist()">Founded: {{data.properties.founded}}</li>
            <li *ngIf="isAlbum()">Released: {{data.properties.released}}</li>
            <li *ngIf="isTrack()">Length: {{data.properties.length}}</li>

        </ul>
        <table *ngIf="!isTrack()" class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th *ngIf="isArtist()">Album</th>
                    <th *ngIf="isArtist()">released</th>
                    <th *ngIf="isAlbum()">Track</th>
                    <th *ngIf="isAlbum()">length</th>
                </tr>
            </thead>
            <tbody id="tablebody">
                <tr *ngIf="isArtist()" *ngFor="#album of data.Album">
                	<td><a [routerLink]="['Type',{ type:'album',id: album?.Album?._id}]">{{album?.Album?.properties?.name}}</a></td>
					<td><a [routerLink]="['Type',{ type:'album',id: album?.Album?._id}]">{{album?.Album?.properties?.released}}</a></td>
                </tr>
                <tr *ngIf="isAlbum()||isPlaylist()" *ngFor="#track of data.Track">
                    <td><a [routerLink]="['Type',{ type:'track',id: track?.Track?._id}]">{{track?.Track?.properties?.name}}</a></td>
                    <td><a [routerLink]="['Type',{ type:'track',id: track?.Track?._id}]">{{track?.Track?.properties?.length}}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
  	`,
  	directives:[ROUTER_DIRECTIVES]
})


export class TypeComponent extends BaseTypeComponent{

	id:string;
	data: BaseType;

	constructor(private _routeParams: RouteParams,private musicService:MusicService){
		super();
		this.data = new BaseType('',[],new Properties('','','',''),[],[]);
		console.log('data', this.data);
	}

	ngOnInit() {
		this.type = this._routeParams.get('type');
		this.type = this.uncapitalizedType;
		this.id = this._routeParams.get('id');
		this.loadType();
	}



	loadType(){
		var handleSuccessResponse = res => {this.data = JSON.parse((<any>res)._body),console.log('data',this.data)};       			        
		var handleErrorResponse = error=>console.error('An error happened!',error);
		if(this.isArtist()){
	        this.musicService.getArtistWithAlbums(this.id).subscribe(
	        	handleSuccessResponse,
	        	handleErrorResponse
	        );
	    }
	    else
	    if(this.isAlbum()){
	        this.musicService.getAlbumWithTracks(this.id).subscribe(
	        	handleSuccessResponse,
	        	handleErrorResponse
	        );
	    }
	    else
	    if(this.isPlaylist()){
	        this.musicService.getAlbumWithTracks(this.id).subscribe(
	        	handleSuccessResponse,
	        	handleErrorResponse
	        );
	    }
	    else
	    if(this.isTrack()){
	        this.musicService.getTrack(this.id).subscribe(
	        	handleSuccessResponse,
	        	handleErrorResponse
	        );
	    }
	}

}




