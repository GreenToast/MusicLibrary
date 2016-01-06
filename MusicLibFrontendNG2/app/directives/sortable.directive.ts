import {Directive, ElementRef, Input,Output, EventEmitter} from 'angular2/core';
import * as $ from 'jquery';

@Directive({
    selector: '[dirSortable]'
})
export class SortableDirective {

	el: JQuery;
	@Output() addType = new EventEmitter<AddTypeEvent>();

    constructor(private element:ElementRef) {
        this.el = $(element.nativeElement);
        this.el.sortable({
            revert: true
        });
        this.el.disableSelection();
/*
        this.eventAggregator.subscribe('removeSortedItem', payload => {
			var pos = this.lookupArrayPos(payload.el.parentElement);
			this.removeType(pos);
			payload.el.remove();
		}
        );
*/
        this.el.on('sortdeactivate', function(event, ui) {
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
        }.bind(this));
    }

    lookupArrayPos(item) {
        for (var index in (<any>this.el).context.children) {
            var lookupEl = (<any>this.el).context.children[index];
            if (lookupEl === item) {
                return parseInt(index);
            }
        }
        return -1;
    }

    @Input() dirSortable: string;

    //@Input() receiveToList:any[];

    @Input() receiveFromList:any[];

}

export class AddTypeEvent{
	

	constructor(public pos: string, public id: string, public name: string){

	}

}