import {Directive, ElementRef, Input} from 'angular2/core';
import * as $ from 'jquery';

@Directive({
    selector: '[dirDraggable]'
})
export class DraggableDirective {
    constructor(private el: ElementRef) {
    	console.log('draggableConstructor');
    }

    @Input() dirDraggable: string;

    @Input() set connectToSortable(sortable:string){
        var params: DraggableParams = {
			helper: 'clone',
			revert: 'invalid'
		};
        if(sortable){
            params.connectToSortable=sortable;
        }
    	console.log('draggable',sortable,$,window);
		var el = $(this.el.nativeElement);
		el.draggable(params);
    	console.log('afterdraggable',this.el);
    }
}

interface DraggableParams{
    helper?: string;
    revert?: string;
    connectToSortable?: string;
}