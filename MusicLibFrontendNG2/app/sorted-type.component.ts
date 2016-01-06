import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import * as $ from 'jquery';

@Component({
  selector: 'sorted-type',
  template:
  `
  {{typeItem.properties.name}}
  <button (click)="remove()">x</button>
  `

})
export class SortedTypeComponent { 


  el: JQuery;

  @Input() set typeItem(typeItem: any) {
    console.log('typeItem', typeItem);
    this._typeItem = typeItem;
  }

  @Output() removeType = new EventEmitter<RemoveTypeEvent>();


  _typeItem: any;
  constructor(private element:ElementRef){
    this.el = $(element.nativeElement);
  }

  

  get typeItem():any{
    return this._typeItem;
  }

  remove() {
    this.removeType.emit(new RemoveTypeEvent(this.el));
  }

  
}

export class RemoveTypeEvent {


  constructor(public el:JQuery) {

  }

}