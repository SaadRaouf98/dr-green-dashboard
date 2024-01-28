import {Component, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  protected readonly ColumnMode = ColumnMode;
  rowsUsers: any;
  filters: any;
  public selectedOption = 10;
  selected : any =[]
  cards: any
  Filters = [
    {id: 1, name: 'Today'},
    {id: 2, name: 'Tomorrow'},
    {id: 3, name: 'This Week'},
    {id: 4, name: 'Last Week'},
    {id: 5, name: 'This Month'},
  ]
  Groups = [
    {id: 10, name: '10'},
    {id: 20, name: '20'},
    {id: 30, name: '30'},
    {id: 40, name: '40'},
    {id: 50, name: '50'},
  ]
  public selectedFilter = 1;
  public selectedGroup = 10;

  constructor() {
    this.rowsUsers = [
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
      {
        id: 1,
        product: 'شاي العروسة',
        date: '24-01-2024',
        payment: 'MasterCard',
        amount: '500$',
        status: 0,
      },
    ]
  }
}
