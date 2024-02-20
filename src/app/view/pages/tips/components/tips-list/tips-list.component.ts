import {Component, OnInit} from '@angular/core';
 import {environment as env} from "../../../../../../environments/environment";
import {TipsService} from "../../services/tips.service";
import {Tips, TipsData} from "../../modals/tips";

@Component({
  selector: 'app-tips-list',
  templateUrl: './tips-list.component.html',
  styleUrls: ['./tips-list.component.scss']
})
export class TipsListComponent implements OnInit{
  allTips : TipsData[]
  page : number = 1
  collectionSize : number = 10
  domain = env.domainUrl
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

  constructor(private _tipsService: TipsService) {

  }
  // on initialization
  ngOnInit() {
    this.getAllTips(1)
  }
  getAllTips(pageNumber: number) {
    this.page = pageNumber
    let query = {
      pageNumber: pageNumber,
      pageSize: 10,
    }
    this._tipsService.getTipsApi(query).subscribe({
      next: (res: Tips) => {
        this.allTips = res.data
        this.collectionSize = res.totalItems
      }
    })
  }
  deleteTip(id: number) {
    this._tipsService.deleteTipsApi(id).subscribe({
      next: res  => {
        this.getAllTips(this.page)
      }
    })
  }
}
