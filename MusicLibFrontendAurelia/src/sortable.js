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