import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdsService} from "../../services/ads.service";

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})

export class AddAdsComponent {
  addFrom: FormGroup
  statusValue: any = 10
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
    private _adsService: AdsService,
  ) {
    this.addFrom = _formBuilder.group({
      Id: ['', Validators.required],
      TitleAr: ['', Validators.required],
      TitleEn: ['', Validators.required],
      Status: ['', Validators.required],
      DisplayPage: ['', Validators.required],
      DatePublished: ['', Validators.required],
      EndDate: ['', Validators.required],
    })
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        this.files.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      // this.cd.markForCheck();
    }
  }

  radioChanged(event: any) {
    this.statusValue = event
  }

  removeImage(index: number) {
    this.files.splice(index, 1)
    this.images.splice(index, 1)
  }

  submit() {
    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append(`Files`, this.files[i]);
    }
    formData.append(`TitleAr`, this.addFrom.value.TitleAr);
    formData.append(`TitleEn`, this.addFrom.value.TitleEn);
    formData.append(`Status`, this.statusValue);
    formData.append(`DisplayPage`, this.addFrom.value.DisplayPage);
    formData.append(`DatePublished`, this.addFrom.value.DatePublished);
    formData.append(`meta_image`, this.addFrom.value.EndDate);
    this._adsService.addAdsApi(formData).subscribe({
      next: (res) => {
        console.log(res)
        this.addFrom.reset()
        for (let i=0; i< this.files.length; i++){
          this.files.splice(i, 1)
        }
        for (let i=0; i< this.images.length; i++){
          this.images.splice(i, 1)
        }
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
