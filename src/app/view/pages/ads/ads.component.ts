import {Component} from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent {
  cards: any
  public selectedOptionSort = 'Sorted By';
  public selectedOption = 10;
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
