import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {AboutUsService} from "../../services/about-us.service";
import {AllLookups, EachLookup} from "../../modals/about-us";

@Component({
  selector: 'app-vision-and-mission',
  templateUrl: './vision-and-mission.component.html',
  styleUrls: ['./vision-and-mission.component.scss']
})

export class VisionAndMissionComponent implements OnInit{
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addFrom1: FormGroup
  addFrom2: FormGroup
  adsList: any
  lookupId1: number
  lookupId2: number
  Filters = [
    {id: 10, name: 'Home'},
  ];
  files: any[] = []
  images: any[] = []
  isEdit1: boolean = false;
  isEdit2: boolean = false;
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
    private _aboutUsService: AboutUsService,
  ) {
    this.addFrom1 = this._formBuilder.group({
      Id: ['', Validators.required],
      HeadlinEr: ['', Validators.required],
      HeadlinAr: ['', Validators.required],
      ContentEn: ['', Validators.required],
      Contentar: ['', Validators.required],
      Type: [20, Validators.required],
    })
    this.addFrom2 = this._formBuilder.group({
      Id: ['', Validators.required],
      HeadlinEr: ['', Validators.required],
      HeadlinAr: ['', Validators.required],
      ContentEn: ['', Validators.required],
      Contentar: ['', Validators.required],
      Type: [20, Validators.required],
      File: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.getAllLookUps1()
    this.getAllLookUps2()
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
  getLookUpsById1(id: number) {
    this._aboutUsService.getLookUpsByIdApi(id).subscribe({
        next: (res: EachLookup) => {
          console.log(res)
          this.addFrom1.patchValue({
            Id: id,
            HeadlinEr: res.data.headlinEr,
            HeadlinAr: res.data.headlinAr,
            ContentEn: res.data.contentEn,
            Contentar: res.data.contentar,
            Type: '20',
          })
        }
    })
  }
  getLookUpsById2(id: number) {
    this._aboutUsService.getLookUpsByIdApi(id).subscribe({
        next: (res: EachLookup) => {
          console.log(res)
          this.addFrom2.patchValue({
            Id: id,
            HeadlinEr: res.data.headlinEr,
            HeadlinAr: res.data.headlinAr,
            ContentEn: res.data.contentEn,
            Contentar: res.data.contentar,
            Type: '30',
          })
          this.removeImage()
          this.images.push({completePath: this.domain + 'LookUpsImages/' + res.data.url, path: res.data.url})
        }
    })
  }
  getAllLookUps1() {
    let query = {
      filterValue: '20',
    }
    this._aboutUsService.getLookUpsApi(query).subscribe({
      next: (res: AllLookups) =>{
        this.lookupId1 = res['data'][0].id
        this.getLookUpsById1(this.lookupId1)
      }
    })
  }
  getAllLookUps2() {
    let query = {
      filterValue: '30',
    }
    this._aboutUsService.getLookUpsApi(query).subscribe({
      next: (res: AllLookups) =>{
        this.lookupId2 = res['data'][0].id
        this.getLookUpsById2(this.lookupId2)
      }
    })
  }

  removeImage() {
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
  }

  add1() {
    this._aboutUsService.addLookUpsApi(this.addFrom1.value).subscribe({
      next: (res) => {
        this.getAllLookUps1()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  add2() {
    this.addFrom2.get('File').patchValue(this.files)
    this._aboutUsService.addLookUpsApi(this.addFrom2.value).subscribe({
      next: (res) => {
        this.getAllLookUps2()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  submit1() {
    this._aboutUsService.updateLookUpsApi(this.addFrom1.value, this.lookupId1).subscribe({
      next: (res) => {
        this.getAllLookUps1()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  submit2() {
    this.addFrom2.get('File').patchValue(this.files)
    this._aboutUsService.updateLookUpsApi(this.addFrom2.value, this.lookupId2).subscribe({
      next: (res) => {
        this.getAllLookUps2()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  resetForm1(){
    this.addFrom1.reset()
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
    this.addFrom1.get('Type').patchValue(20)
  }
}
