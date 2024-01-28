import {Component} from '@angular/core';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {
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
  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }
}
