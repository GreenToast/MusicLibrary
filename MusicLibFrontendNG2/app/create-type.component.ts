import {Component, ElementRef, NgZone} from 'angular2/core';
import {BaseTypeComponent} from './base-type.component';
//jquery-tsd-file is manipulated to work here, $ has a conflict with protractor and/or selenium here
import * as $ from 'jquery';
import 'jquery-ui';
import {BaseType,Properties} from './classes/base-type';
import {MusicService} from './services/music.service';
import {RemoveTypeEvent,SortedTypeComponent} from './sorted-type.component';
import {DraggableDirective} from './directives/draggable.directive';
import {SortableDirective, AddTypeEvent} from './directives/sortable.directive';

@Component({
    selector:'create-type',
    inputs: ['type'],
	template: `
    <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#myModal" click.trigger="cleanAction()">
      Create {{capitalizedType}}
    </button>


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Create {{capitalizedType}}</h4>
                </div>
                <form #typeForm="ngForm" (ngSubmit)="create()">
                    <div class="modal-body">
                        <ul>
                            <li>
                                <input type="text" class="datainput" [(ngModel)]="newtypeData.properties.name" ngControl="name"  #name="ngForm" required placeholder="Name..." >
                            </li>
                            <li *ngIf="isArtist()"><input type="number" class="datainput" placeholder="Founded..." [(ngModel)]="newtypeData.properties.founded" ngControl="founded"  #founded="ngForm" required /></li>
                            <li *ngIf="isAlbum()"><input type="number" class="datainput" placeholder="Released..." [(ngModel)]="newtypeData.properties.released" ngControl="released"  #released="ngForm" required min="1500" max="2100"/></li>
                            <li *ngIf="isTrack()"><input  type="time" class="datainput" placeholder="Length..." [(ngModel)]="newtypeData.properties.length" ngControl="length"  #length="ngForm" required  /></li>
                        </ul>
                    </div>
                    <div class="selection" *ngIf="!isTrack()">
                        <div  class="panel leftPanel">
                           <ol id="selectedlist" [dirSortable] [receiveFromList]="listlib" (addType)="handleAddType($event)" >
                                <li class="bm-selecttype" *ngFor="#sel of listselected">
                                    <sorted-type [typeItem]="sel" (removeType)="handleRemoveType($event)"></sorted-type>
                                </li>
                            </ol>
                        </div>
                        <div class="panel rightPanel">
                            <ul>
                              <li class="bm-selecttype" *ngFor="#el of listlib" [dirDraggable] [connectToSortable]="'#selectedlist'" ><div id="{{el._id}}">{{el.properties.name}}</div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default" [disabled]="!typeForm.form.valid">Create</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  	`,
    directives: [SortableDirective, DraggableDirective, SortedTypeComponent]
})

export class CreateTypeComponent extends BaseTypeComponent{

    newtypeData: BaseType;
    listlib: any[] = [];
    listselected: any[] = [];

    constructor(private zone: NgZone, private elementRef: ElementRef, private musicService: MusicService) {
        super();
        this.newtypeData = new BaseType('',[],new Properties('','','',''));
    }

    ngAfterContentChecked() {
        console.log('ngAfterContentChecked', this.listselected);
    }

    set type(type:string) {
        this._type = type;
        console.log('ngOninit,CreateComponentType', this._type,type);
        this.loadData();
    }

    loadData() {
        var connType:string = '';
        //exclude track from being able to dragdrop types
        if (!this.isTrack()) {

            

            //define associated type, provisional

            if (this.isArtist())
                connType = 'album';
            if (this.isAlbum())
                connType = 'track';
            if (this.isPlaylist())
                connType = 'track';
            if (connType)
                this.musicService.getAll(connType)
                    .subscribe(res => { this.listlib = JSON.parse((<any>res)._body); console.log('listlib', this.listlib); });
            else
                this.listlib = [];

        }
    }

    handleAddType(event: AddTypeEvent) {
        this.addType(event.pos, event.id, event.name);
    }

    handleRemoveType(event: RemoveTypeEvent) {
        var pos = this.lookupArrayPos((<any>event.el)[0].parentElement);
        this.removeType(pos);
        //event.el.remove();
    }

    addType(pos, id, name) {
        this.zone.run(() => {
            this.listselected.splice(pos, 0, { _id: id, properties: { name: name } });
        });
    }

    removeType(pos) {
        this.zone.run(() => {
            this.listselected.splice(pos, 1);
        });
    }

    lookupArrayPos(item) {
        var sortableElement:JQuery = $('#selectedlist');

        for (var index in (<any>sortableElement)[0].children) {
            var lookupEl = (<any>sortableElement)[0].children[index];
            if (lookupEl === item) {
                return parseInt(index);
            }
        }
        return -1;
    }
}