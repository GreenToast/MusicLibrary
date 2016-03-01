import {Component} from 'angular2/core';
import {MusicService} from './services/music.service';
import {BaseTypeComponent} from './base-type.component';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {CreateTypeComponent} from './create-type.component';


@Component({
	template: `
    <div class="main-countainer">
        <h3>{{capitalizedType}}</h3>
        <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th *ngIf="isArtist()">Artist</th>
                        <th *ngIf="isAlbum()">Album</th>
                        <th *ngIf="isTrack()">Track</th>
                        <th *ngIf="isPlaylist()">Playlist</th>
                        <th *ngIf="isArtist()">founded</th>
                        <th *ngIf="isAlbum()">released</th>
                        <th *ngIf="isTrack()">length</th>
                    </tr>
                </thead>
                <tbody id="tablebody">
                    <tr *ngFor="#data of tabledata">
                        <td><a [routerLink]="['Type',{ type:data.labels[0],id: data._id}]">{{data.properties.name}}</a></td>
                        <td *ngIf="isArtist()"><a [routerLink]="['Type',{ type:data.labels[0],id: data._id}]">{{data.properties.founded}}</a></td>
                        <td *ngIf="isAlbum()"><a [routerLink]="['Type',{ type:data.labels[0],id: data._id}]">{{data.properties.released}}</a></td>
                        <td *ngIf="isTrack()"><a [routerLink]="['Type',{ type:data.labels[0],id: data._id}]">{{data.properties.length}}</a></td>
                    </tr>
                </tbody>
            </table>
            <create-type [type]="type"></create-type>
    </div>
  	`,
	directives: [CreateTypeComponent, ROUTER_DIRECTIVES]

})
export class OverviewTypeComponent extends BaseTypeComponent {


	tabledata: any;

	constructor(private _routeParams: RouteParams, private _musicService: MusicService) {
		super();		
        
	}

	ngOnInit() {
		this.type = this._routeParams.get('type');
		this.type = this.uncapitalizedType;
		this.loadData();
	}

	loadData() {
        //load all types, TODO: filter by search result, reduce to 10, results
        this._musicService.getAll(this.type).subscribe(res =>
        {
            console.log('type',this.type);
			this.tabledata = JSON.parse((<any>res)._body); 
        });
 
    }


}