import {Component, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";


@Component({
  selector: 'app-home',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  title: any
  rowsUsers: any;
  filters: any;
  selectedFilter: any = {id: 1, name: 'Today'};
  public selectedOption = 10;
  selected : any =[]
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
    this.filters = [
      {
        id: 1,
        name: 'Today',
      },
      {
        id: 2,
        name: 'This Week',
      },
      {
        id: 3,
        name: 'This Month',
      },
    ]
  }

  setFilter(value: object){
    console.log(value)
    this.selectedFilter = value
  }

  sales = [
    {
      title: 'Daily Sales',
      icon: 'assets/icon/custom-icons/trend-arrow-up.png',
      amount: '$249.95',
      percentage: '+67%',
      progress: 50,
      design: 'col-md-6',
    },
    {
      title: 'Monthly Sales',
      icon: 'assets/icon/custom-icons/trend-arrow-down.png',
      amount: '$2.942.32',
      percentage: '-36%',
      progress: 35,
      design: 'col-md-6',
    },
    {
      title: 'Yearly Sales',
      icon: 'assets/icon/custom-icons/trend-arrow-up.png',
      amount: '$8.638.32',
      percentage: '+80%',
      progress: 80,
      design: 'col-md-12',
    },
    {
      title: 'Yearly Sales',
      icon: 'assets/icon/custom-icons/trend-arrow-down.png',
      amount: '$8.638.32',
      percentage: '-45%',
      progress: 45,
      design: 'col-md-12',
    },
  ];

  card = [
    {
      design: 'border-bottom',
      number: '235',
      text: 'TOTAL IDEAS',
      icon: 'icon-zap text-c-green',
    },
    {
      number: '26',
      text: 'TOTAL LOCATIONS',
      icon: 'icon-map-pin text-c-blue',
    },
  ];

  social_card = [
    {
      design: 'col-md-12',
      icon: 'fab fa-facebook-f text-primary',
      amount: '12,281',
      percentage: '+7.2%',
      color: 'text-c-green',
      target: '35,098',
      progress: 60,
      duration: '3,539',
      progress2: 45,
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-twitter text-c-blue',
      amount: '11,200',
      percentage: '+6.2%',
      color: 'text-c-purple',
      target: '34,185',
      progress: 40,
      duration: '4,567',
      progress2: 70,
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-google-plus-g text-c-red',
      amount: '10,500',
      percentage: '+5.9%',
      color: 'text-c-blue',
      target: '25,998',
      progress: 80,
      duration: '7,753',
      progress2: 50,
    },
  ];

  progressing = [
    {
      number: '5',
      amount: '384',
      progress: 70,
    },
    {
      number: '4',
      amount: '145',
      progress: 35,
    },
    {
      number: '3',
      amount: '24',
      progress: 25,
    },
    {
      number: '2',
      amount: '1',
      progress: 10,
    },
    {
      number: '1',
      amount: '0',
      progress: 0,
    },
  ];

  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Isabella Christensen',
      text: 'Lorem Ipsum is simply dummy',
      time: '11 MAY 12:56',
      color: 'text-c-green',
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Ida Jorgensen',
      text: 'Lorem Ipsum is simply',
      time: '11 MAY 10:35',
      color: 'text-c-red',
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Mathilda Andersen',
      text: 'Lorem Ipsum is simply dummy',
      time: '9 MAY 17:38',
      color: 'text-c-green',
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Karla Soreness',
      text: 'Lorem Ipsum is simply',
      time: '19 MAY 12:56',
      color: 'text-c-red',
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Albert Andersen',
      text: 'Lorem Ipsum is',
      time: '21 July 12:56',
      color: 'text-c-green',
    },
  ];
  protected readonly ColumnMode = ColumnMode;
}
