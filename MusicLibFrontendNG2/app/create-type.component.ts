import {Component, ElementRef, NgZone} from 'angular2/core';
import {BaseTypeComponent} from './base-type.component';
//jquery-tsd-file is manipulated to work here, $ has a conflict with protractor and/or selenium here
import * as $ from 'jquery';
import 'jquery-ui';
import {BaseType,Properties} from './classes/base-type';
import {MusicService} from './services/music.service';
import {RemoveTypeEvent,SortedTypeComponent} from './sorted-type.component';
//import {DraggableDirective} from './directives/draggable.directive';
//import {SortableDirective, MoveTypeEvent,AddTypeEvent} from './directives/sortable.directive';

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
                           <ol id="selectedlist" (dragover)="dragover($event)" (drop)="drop($event)">
                                <li class="bm-selecttype" *ngFor="#sel of listselected; #idx = index" draggable="true" (dragstart)="sortstart($event,idx)" (dragend)="sortend()" (dragover)="sortover($event,idx)" (drop)="sortdrop($event)">
                                     {{sel.properties.name}}
                                      <button (click)="removeType(idx)">x</button>
                                </li>
                            </ol>
                        </div>
                        <div class="panel rightPanel">
                            <ul>
                              <li class="bm-selecttype" *ngFor="#el of listlib; #lindex = index" draggable="true" (dragstart)="dragstart($event,lindex)" (dragend)="dragend($event)" ><div id="{{el._id}}">{{el.properties.name}}</div></li>
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
  	`
})

export class CreateTypeComponent extends BaseTypeComponent{


    newtypeData: BaseType;
    listlib: any[] = [];
    listselected: any[] = [];
    connType: string = '';

    constructor(private zone: NgZone, private elementRef: ElementRef, private musicService: MusicService) {
        super();
        this.newtypeData = new BaseType('',[],new Properties('','','',''));
    }

    set type(type:string) {
        this._type = type;
        this.loadData();
    }

    /*ngAfterContentChecked() {
        console.log('ngAfterContentChecked', this.listselected);
    }*/

    loadData() {
        
        //exclude track from being able to dragdrop types
        if (!this.isTrack()) {

            //define associated type, provisional

            if (this.isArtist())
                this.connType = 'album';
            if (this.isAlbum())
                this.connType = 'track';
            if (this.isPlaylist())
                this.connType = 'track';
            if (this.connType)
                this.musicService.getAll(this.connType)
                    .subscribe(res => { this.listlib = JSON.parse((<any>res)._body); console.log('listlib', this.listlib); });
            else
                this.listlib = [];

        }
    }

    /*handleAddType(event: AddTypeEvent) {
        this.addType(event.pos, event.id, event.name);
    }

    handleMoveType(event: MoveTypeEvent) {
        //var pos = this.lookupArrayPos((<any>event.el)[0].parentElement);
        this.moveType(event.from,event.to);
        //event.el.remove();
    }*/

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

    moveType(from:number, to:number) {
        //this.zone.run(() => {
        this.listselected.splice(to, 0, this.listlib.splice(from, 1)[0]);
        //});
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

    create() {
        console.log('createType');
        var capType = this.connType.charAt(0).toUpperCase() + this.connType.slice(1);
        if (this.listselected.length > 0) {
            this.newtypeData[capType] = [];
        };
        this.listselected.forEach((el, i) =>
        //var el = this.listselected[i];
        {
            var obj; 
            if (this.connType == 'track') {
                obj = {
                    "relation": {
                        trackNo: i + 1
                     },
                    "Track": el
                }
                //obj[capType] = el;
                //obj.relation.trackNo = i + 1;
            }
            else{
                obj = {
                    "relation": {},
                    capType : el
                }
            }
            this.newtypeData[capType].push(obj);
        }
        );
        var json = JSON.stringify(this.newtypeData);
        console.log(this.newtypeData, this.newtypeData.properties, json);
        //this.musicService.create(this.type, json).subscribe(res=> console.log('created', JSON.parse(res.response)));
    }



    cleanAction() {
        this.newtypeData = new BaseType('', [], new Properties('', '', '', ''));
        this.listselected = [];
    }

    //sortable

    private source: any;
    private origpos: number;
    private possource: number;
    private dropped: boolean = false;

    sortdrop(e: any) {
        this.dropped = true;
    }

    sortstart(e: any, possource: number) {
        this.possource = possource;
        this.origpos = this.possource;
        e.dataTransfer.effectAllowed = 'move';
    }

    sortend() {
        if (!this.dropped) {
            this.moveType(this.possource, this.origpos);
        }
        this.dropped = false;
    }

    sortover(e: any, posto: number) {
        console.log(e);
        e.preventDefault();
        if (e.dataTransfereffectAllowed == 'move'){
            if (posto != this.possource ) {
                this.moveType(this.possource, posto);
                this.possource = posto;
            }
        }
        else{
            console.log('copysortover');
        }
    }

    //draggable

    private added = 0;
    
    dragstart(e: any, possource: number) {
        //this.possource = possource;
        //this.origpos = this.possource;
        e.dataTransfer.effectAllowed = 'copymove';
        console.log('dragstart', this.listlib[possource]);
        let object = this.listlib[possource];
        e.dataTransfer.setData('id', object._id);
        e.dataTransfer.setData('name', object.properties.name);
    }

    dragover(e: any) {
        e.preventDefault();
        console.log('dragover');
    }

    drop(e: any) {
        e.preventDefault();
        var x = e.dataTransfer.getData('data')
        console.log('drop', e.dataTransfer.getData('id'), e.dataTransfer.getData('name'));
        this.addType(0, e.dataTransfer.getData('id'), e.dataTransfer.getData('name'));
    }

    dragend(e: any) {
        console.log('dragend');
    }

}