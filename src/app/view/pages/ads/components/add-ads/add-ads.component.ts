import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdsService} from "../../services/ads.service";
import {ActivatedRoute} from "@angular/router";
import {AdsList, AdsListData} from "../../modals/ads";
import {environment as env} from "../../../../../../environments/environment";

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})

export class AddAdsComponent implements OnInit{
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup
  statusValue: any = 10
  adId: number = 10
  adsList: AdsListData
  Filters = [
    {id: 10, name: 'Home'},
  ];
  files: any[] = []
  images: any[] = []
  Groups = [
    {id: 10, name: '10'},
    {id: 20, name: '20'},
    {id: 30, name: '30'},
    {id: 40, name: '40'},
    {id: 50, name: '50'},
  ];
  RadioStatuses = [
    {id: 10, name: 'Published'},
    {id: 20, name: 'Scheduled'},
    {id: 30, name: 'Hidden'},
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _adsService: AdsService,
  ) {
    this.adId = +this._activatedRoute.snapshot.queryParamMap.get('adId')
    this.addFrom = _formBuilder.group({
      Id: ['', Validators.required],
      TitleAr: ['', Validators.required],
      TitleEn: ['', Validators.required],
      Status: ['', Validators.required],
      DisplayPage: ['', Validators.required],
      DatePublished: [''],
      EndDate: ['', Validators.required],
      Files: [''],
    })
  }
  ngOnInit() {
    this.adId? this.getAdById(): ''
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        this.files.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images.push({path: event.target.result, completePath: event.target.result});
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  getAdById() {
    this._adsService.getAdByIdApi(this.adId).subscribe({
      next: (res: AdsList) =>{
        this.adsList = res.data
        this.addFrom.patchValue({
          Id: this.adId,
          TitleAr: res.data.titleAr,
          TitleEn: res.data.titleEn,
          Status: res.data.status,
          DisplayPage: res.data.displayPage,
          EndDate: res.data.datePublished? res.data.endDate.slice(0, 10) : '',
          DatePublished: res.data.datePublished? res.data.datePublished.slice(0, 10) : '',
        })
        this.statusValue = res.data.status
        if (res.data.adsImages.length){
          res.data.adsImages.forEach((ele: any) => {
            let status = this.images.findIndex((elem)=> elem?.path === ele)
            console.log(status)
            if (status === -1){
              this.images.push({completePath: this.domain + 'AdsDrGreenMedia/' + ele, path: ele})
            }
          })
        }
        console.log(this.images)
      }
    })
  }
  deleteImage(path: string, index: number) {
    this._adsService.deleteImagesApi(path).subscribe({
      next: res => {
        this.getAdById()
        console.log(res)
      }
    })
    this.images.splice(index, 1)
  }
  radioChanged(event: any) {
    event !== 20 ? this.addFrom.get('DatePublished').reset() : '';
    this.statusValue = event
  }

  removeImage(index: number) {
    this.files.splice(index, 1)
    this.images.splice(index, 1)
  }

  submit() {
    this.addFrom.get('Status').patchValue(this.statusValue)
    this.addFrom.get('Files').patchValue(this.files)
    if (this.adId){
      this._adsService.updateAdsApi(this.addFrom.value, this.adId).subscribe({
        next: (res) => {
          console.log(res)
          this.getAdById()
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else {
      this._adsService.addAdsApi(this.addFrom.value).subscribe({
        next: (res) => {
          console.log(res)
          this.resetForm()
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
  resetForm(){
    this.addFrom.reset()
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
    this.statusValue = 10
  }
}
