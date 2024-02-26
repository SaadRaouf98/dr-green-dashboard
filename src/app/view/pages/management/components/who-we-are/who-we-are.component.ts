import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {ManagementService} from "../../services/management.service";
import {AllLookups, AllLookupsData, EachLookup, EachLookupData} from "../../modals/management";

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})

export class WhoWeAreComponent implements OnInit{
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup
  adsList: any
  allLookupsData: AllLookupsData
  Filters = [
    {id: 10, name: 'Home'},
  ];
  files: any[] = []
  images: any[] = []
  isEdit: boolean = false
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
    private _aboutUsService: ManagementService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      HeadlinEr: ['', Validators.required],
      HeadlinAr: ['', Validators.required],
      ContentEn: ['', Validators.required],
      Contentar: ['', Validators.required],
      Type: ['', Validators.required],
      File: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.getAllLookUps()
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
  getLookUpsById(id: number) {
    this._aboutUsService.getLookUpsByIdApi(id).subscribe({
        next: (res: EachLookup) => {
          console.log(res)
          this.addFrom.patchValue({
            Id: id,
            HeadlinEr: res.data.headlinEr,
            HeadlinAr: res.data.headlinAr,
            ContentEn: res.data.contentEn,
            Contentar: res.data.contentar,
            Type: 10,
          })
          this.removeImage()
          this.images.push({completePath: this.domain + 'LookUpsImages/' + res.data.url, path: res.data.url})
        }
    })
  }
  getAllLookUps() {
    let query = {
      filterValue: '10',
    }
    this._aboutUsService.getLookUpsApi(query).subscribe({
      next: (res: AllLookups) =>{
        this.allLookupsData = res['data'][0]
        this.getLookUpsById(this.allLookupsData.id)
      }
    })
  }

  removeImage() {
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
  }

  submit() {
    this.addFrom.get('File').patchValue(this.files)
    this._aboutUsService.updateLookUpsApi(this.addFrom.value, this.allLookupsData.id).subscribe({
      next: (res) => {
        this.getAllLookUps()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  resetForm(){
    this.addFrom.reset()
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
    this.addFrom.get('Type').patchValue(10)
  }
}
