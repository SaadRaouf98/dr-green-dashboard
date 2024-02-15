import {Component, OnInit} from '@angular/core';
import {AdsService} from "../../services/ads.service";
import {environment as env} from "../../../../../../environments/environment";

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss']
})
export class AdsListComponent implements OnInit{
  allAds : any
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

  constructor(private _adsService: AdsService) {

  }
  // on initialization
  ngOnInit() {
    this.getAllAds()
  }
  getAllAds() {
    let query = {}
    this._adsService.getAdsApi(query).subscribe({
      next: (res) => {
        this.allAds = res.data
        console.log(res.data)
      }
    })
  }
}
