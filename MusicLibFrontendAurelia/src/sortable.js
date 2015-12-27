//add sortable-jquery with directive
/*angular.module('MusicLibraryApp').directive('sortableTypeList', function(ngAttr) {
    return {
        restrict: 'A',
        scope: {
            receiveToList: '=',
            deleteType: '&'
        },       
        templateUrl: 'templates/directives/sortableTypeList.html',
        link: function(scope, elm) {   
            var initialized = false;
            
            function moveType(from,to){
                scope.receiveToList.splice(to, 0, scope.receiveToList.splice(from, 1)[0]);
            }
            
            function addType(pos,id,name) {
                
                if (initialized) {
                    scope.receiveToList.splice(pos, 0,{_id:id,properties:{name:name}});
                }
            }
            
            function lookup(id){
                var el;
                scope.receiveFromList.forEach(function(lookupEl){
                    if (lookupEl._id === id){
                        el = lookupEl;
                        return;
                    }
                });
                return el;
            }
            var listElement = angular.element(angular.element(elm).children()[0]);
            listElement.sortable({
                revert: true,
            });
            
            listElement.disableSelection();
            
            //TODO: fix function
            listElement.on('removeSortedItem', function(event,item){
                var pos = i;
                for (var i = 0; i < scope.receiveToList.length; i++){
                    if(scope.receiveToList[i] === item){
                        pos = i;
                        break;
                    }
                }
                scope.receiveToList.splice (pos,1);
            });
            
            listElement.on( 'sortdeactivate', function( event, ui ) { 
                var from = angular.element(ui.item).scope().$index;
                var to = listElement.children().index(ui.item);
                if(to>=0){
                    scope.$apply(function(){
                        if(from>=0){
                           moveType(from,to); 
                        }else{
                            var id = parseInt(ui.item.context.attributes['draggable-type'].nodeValue);
                            var name = ui.item.context.innerText;
                            addType(to,id,name);
                            ui.item.remove();
                        }
                    });
                }
            });  
    
            
            function init() {
                if (!angular.isDefined(scope.receiveToList)) {
                    /*if (scope.tokenfield.tags.length > 0) {
                        // this call emits an 'afterCreateToken' event
                        // and this would imply a 'digest already in progress'
                        // without the initialized flag
                        elem.tokenfield('setTokens', scope.tokenfield.tags);
                    }
                }
                else {
                    scope.receiveToList = [];
                }

                initialized = true;
            }

            init();
            
            
        }
    };
})*/
import {inject, customAttribute,bindable} from 'aurelia-framework';
import $ from 'jquery';
import {sortable} from 'jquery-ui';
import {EventAggregator} from 'aurelia-event-aggregator';

@customAttribute('sortable')
@inject(Element,EventAggregator)
export class Sortable{

    @bindable receiveToList;
    @bindable receiveFromList;

    constructor(el,eventAggregator){
        this.el = $(el);
        this.eventAggregator = eventAggregator;
        //this.receiveToList = [];
    }

    

    attached(){
        
        this.el.sortable({
            revert: true,
        });
        this.el.disableSelection();
        
        this.eventAggregator.subscribe('removeSortedItem',payload => 
            {
                var pos = this.lookupArrayPos(payload.el.parentElement);
                this.removeType(pos);
                payload.el.remove();
            }
        );
        
        this.el.on( 'sortdeactivate', function( event, ui ) { 
            var item = $(ui.item);
            console.log('item',item,this.el);
            this.el;
            var id = item.context.children[0].id;

            var to = this.lookupArrayPos(item.context);
            if(to>=0){
                var name = ui.item.context.innerText;
                this.addType(to,id,name);
                ui.item.remove();
            }
        }.bind(this));
    }

    addType(pos,id,name) {  

        this.receiveToList.splice(pos, 0,{_id:id,properties:{name:name}});

        /*if(pos < this.receiveToList.length){
            var tempArray = this.receiveToList.slice(pos);
            for (let i in tempArray) {
                this.receiveToList.pop();
            }
            this.receiveToList.push({_id:id,properties:{name:name}});
            for (let i of tempArray) {
                this.receiveToList.push(i);
            }
        }
        else{
            this.receiveToList.push({_id:id,properties:{name:name}});
        }*/
    }

    removeType(pos){      

        /*if(this.receiveToList.length > 1 && pos < this.receiveToList.length-1){
            var tempArray = this.receiveToList.slice(pos+1);
            for (var i in tempArray) {
                this.receiveToList.pop();
            }
            this.receiveToList.pop();
            for (var i of tempArray) {
                this.receiveToList.push(i);
            }
            
        }
        else{
            this.receiveToList.pop();
        }*/
        this.receiveToList.splice(pos, 1);
    }
            
    lookupArrayPos(item){
        var el;
        for (var index in this.el.context.children) {
            var lookupEl = this.el.context.children[index];
            if (lookupEl === item){
                return parseInt(index);
            }
        }
        return -1;
    }

        

}