import {Directive, ElementRef, Input, Output, EventEmitter, Renderer, NgZone} from 'angular2/core';
//import * as $ from 'jquery';

@Directive({
    selector: '[dirSortable]'
})
export class SortableDirective {

	el: JQuery;

    @Input() dirSortable: any[];
    @Input() moveHtml: boolean;

   // @Input() receiveFromList: any[];
	//@Output() addType = new EventEmitter<AddTypeEvent>();
    @Output() moveType = new EventEmitter<MoveTypeEvent>();

    constructor(private element: ElementRef, private renderer: Renderer, private zone:NgZone) {
        

//draggable="true" (drop)="drop($event)" (dragover)="dragover($event)" (dragstart)="dragstart($event)"
       /* this.el = $(element.nativeElement);
        this.el.sortable({
            revert: true
        });
        this.el.disableSelection();*/
/*
        this.eventAggregator.subscribe('removeSortedItem', payload => {
			var pos = this.lookupArrayPos(payload.el.parentElement);
			this.removeType(pos);
			payload.el.remove();
		}
        );
*/
       /* this.el.on('sortdeactivate', function(event, ui) {
            var item = $(ui.item);
            console.log('item', item, this.el);
            this.el;
            var id = (<any>item.context).children[0].id;

            var pos = this.lookupArrayPos(item.context);
            if (pos >= 0) {
                var name = ui.item.context.innerText;
                //this.addType(to, id, name);
                ui.item.remove();
                this.addType.emit(new AddTypeEvent(pos, id, name));
            }
        }.bind(this));*/
    }

    private initialized:boolean = false;

    ngAfterViewChecked(){
        let children = this.element.nativeElement.children;
        if(!this.initialized && children.length > 0){
            console.log('run init');
            for (let i = 0; i < children.length; i++){
                let child = children[i];
                
                //this.renderer.setElementAttribute(child, 'draggable', 'true');
                //(<any>this.renderer).on(child, 'dragstart', this.dragstart.bind(this));
                child.ondragend = this.dragend.bind(this); 
                child.ondragstart = this.dragstart.bind(this);
                (<any>this.renderer).on(child, 'dragover', this.dragover.bind(this));
                (<any>this.renderer).on(child, 'drop', this.drop.bind(this));
                child.draggable = true;
            };
            this.initialized = true;
        }
    }

    lookupArrayPos(item) {
        for (var index in this.element.nativeElement.children) {
            var lookupEl = this.element.nativeElement.children[index];
            if (lookupEl === item) {
                return parseInt(index);
            }
        }
        return -1;
    }

    private source: any;
    private origpos: number;
    private possource: number;
    private dropped: boolean = false;

    isbefore(a: any, b: any): boolean {
        if (a.parentNode == b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
                if (cur === b) {
                    return true;
                }
            }
        }
        return false;
    }

    dragend(){
        if (!this.dropped) {
            //this.moveType.emit(new MoveTypeEvent(this.possource, this.origpos));
            console.log('dragend');
            this._moveType(this.possource, this.origpos);

        }        
        this.dropped = false;
    }

    dragover(e: any, pos:number) {
        console.log(e);
        e.preventDefault();
        let target  = e.target;

        //improve to recursive search
        if(target.localName != 'li'){
            if (target.parentElement.localName =='li'){
                target = target.parentElement;
            }
            else{
                target = null;
            }
        }

        if (target && !(target === this.source)) {
            var posto = this.lookupArrayPos(e.target);
            //this.moveType.emit(new MoveTypeEvent(this.possource, posto));
            console.log('dragover');
            this._moveType(this.possource, posto);
            this.possource = posto;
        }
    }

    drop(e: any) {
        this.dropped = true;
        //var posto = this.lookupArrayPos(e.target);
        //this.moveType.emit(new MoveTypeEvent(this.possource, posto));
        console.log('drop');
        //this._moveType(this.possource, posto);
        console.log('afterdrop',this.dirSortable);
    }

    dragstart(e: any, id: number) {
        console.log('dragstart2', e, id);
            this.source = e.target;
            this.possource = this.lookupArrayPos(e.target);
            this.origpos = this.possource;            
            e.dataTransfer.effectAllowed = 'move';
            console.log('beforedrop', this.dirSortable);
    }

    private _moveType(from: number, to: number): void {
        this.zone.run(() => {
            console.log(from,to);
            this.dirSortable.splice(to, 0, this.dirSortable.splice(from, 1)[0]);
        });
    }    

}

export class AddTypeEvent{
	

	constructor(public pos: string, public id: string, public name: string){

	}

}

export class MoveTypeEvent {


    constructor(public from:number, public to: number) {

    }

}