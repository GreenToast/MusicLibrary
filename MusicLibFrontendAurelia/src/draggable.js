//add draggable-jquery with directive
/*angular.module('MusicLibraryApp').directive('draggableType', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var params = {
                    helper: 'clone',
                    revert: 'invalid'
                };
            if(attrs.connectToSortable){
                
                //connect to ol in sortableTypeList-Directive
                params.connectToSortable = "[sortable-type-list='"+attrs.connectToSortable+"'] > ol";
            }
            angular.element(elm).draggable(params);
            elm.disableSelection();
        }
    };
})*/
import {bindable,inject, customAttribute} from 'aurelia-framework';
import $ from 'jquery';
import {draggable} from 'jquery-ui';

@customAttribute('draggable')
@inject(Element)
export class Draggable{

    //@bindable connectToSortable;
    el;
    constructor(el) {
        this.el = $(el);  
    }

    attached(){
        var params = {
                helper: 'clone',
                revert: 'invalid'
            };
        if(this.el && this.el.context.attributes['connect-to-sortable']){
            
            //connect to ol in sortableTypeList-Directive
            params.connectToSortable = '#'+this.el.context.attributes['connect-to-sortable'].nodeValue;
            this.el.draggable(params);
            this.el.disableSelection();
        }
        
    }

}
