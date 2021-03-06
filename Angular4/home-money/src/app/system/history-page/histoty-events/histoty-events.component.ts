import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {WFMEvent} from "../../shared/models/event.model";

@Component({
  selector: 'wfm-histoty-events',
  templateUrl: './histoty-events.component.html',
  styleUrls: ['./histoty-events.component.scss']
})
export class HistotyEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: WFMEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchFiled = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e)=> {
      e.catName = this.categories.find(c=> c.id === e.category).name
    })
  }

  getEventClass(e: WFMEvent) {
    return {
     'label': true,
     'label-danger': e.type === 'outcome',
     'label-success': e.type === 'income'
    };
  }

  changeCriteria(field:string){
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchFiled = field;


  }


}
