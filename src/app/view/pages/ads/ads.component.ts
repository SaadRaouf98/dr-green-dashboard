import {Component} from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent {
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
    this.cards = [
      {
        id: 1,
        image: 'assets/images/img1.jpg',
        title: 'Ads free',
        show: 'Hidden',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
      {
        id: 1,
        image: 'assets/images/img2.jpg',
        title: 'Ads free',
        show: 'visible',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
      {
        id: 1,
        image: 'assets/images/img3.jpg',
        title: 'Ads free',
        show: 'Hidden',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
      {
        id: 1,
        image: 'assets/images/img1.jpg',
        title: 'Ads free',
        show: 'visible',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
      {
        id: 1,
        image: 'assets/images/img2.jpg',
        title: 'Ads free',
        show: 'Hidden',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
      {
        id: 1,
        image: 'assets/images/img3.jpg',
        title: 'Ads free',
        show: 'visible',
        date1: '12/12/2019',
        date2: '15/12/2020',
      },
    ]
  }
}
