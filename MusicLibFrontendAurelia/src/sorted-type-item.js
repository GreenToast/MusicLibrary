//add draggable-jquery with directive
/*angular.module('MusicLibraryApp').directive('sortedTypeItem', function() {
    return {
        restrict: 'A',
        scope:{
            sortedTypeItem: '='
        },
        templateUrl: 'templates/directives/sortedTypeItem.html',
        link: function(scope,elm) {
            scope.remove = function(){
                angular.element(elm).trigger('removeSortedItem', scope.sortedTypeItem);
            };
        }
    };
})*/
import {inject,bindable,customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('sorted-type-item')
@inject(Element,EventAggregator)
export class sortedTypeItem {
    @bindable typeItem = null;

    constructor(el,eventAggregator){
        console.log('created sortedTypeItem',this);
        this.eventAggregator = eventAggregator;
        this.el = el;
    }

    attached(){
        console.log('attached sortedTypeItem',this);
    }

    remove(event){
        //this.el.trigger('removeSortedItem', this.sortedTypeItem);

        console.log('remove',this);
        this.eventAggregator.publish('removeSortedItem',{el:this.el});
    }
}