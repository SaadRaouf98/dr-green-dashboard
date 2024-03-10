import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipsService} from "../../services/tips.service";
import {Departments, DepartmentsData, TipById, TipByIdData} from "../../modals/tips";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";

@Component({
  selector: 'app-add-tips',
  templateUrl: './add-tips.component.html',
  styleUrls: ['./add-tips.component.scss']
})

export class AddTipsComponent implements OnInit{
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup
  statusValue: number = 10
  Filters = [
    {id: 10, name: 'Home'},
  ];
  tipsDeps: DepartmentsData[]
  tipData: TipByIdData
  tipId: number
  files: any[] = []
  images: any[] = []
  Status = [
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
    private _tipsService: TipsService,
    private _sharedService: SharedService,
  ) {
    this.tipId = +this._activatedRoute.snapshot.queryParamMap.get('tipId')
    this.addFrom = _formBuilder.group({
      Id: ['', Validators.required],
      TitleAr: ['', Validators.required],
      TitleEn: ['', Validators.required],
      AuthorAr: ['', Validators.required],
      AuthorEn: ['', Validators.required],
      DescriptionAr: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      ContentAr: ['', Validators.required],
      ContentEn: ['', Validators.required],
      File: ['', Validators.required],
      Status: ['', Validators.required],
      VisibleStatus: ['', Validators.required],
      TipsDepartmentId: ['', Validators.required],
      DatePublished: [''],
    })
  }
  ngOnInit() {
    this.getAllDeps()
    this.tipId? this.getTipById(): ''
  }
  getAllDeps() {
    this._tipsService.getDepartmentTipsApi().subscribe({
      next: (res: Departments) => {
        this.tipsDeps = res['data']
      }
    })
  }
  getTipById() {
    this._tipsService.getTipsByIdApi(this.tipId).subscribe({
      next: (res: TipById) => {
        this.tipData = res.data
        this.addFrom.patchValue({
          Id: this.tipId,
          TitleAr: this.tipData.titleAr,
          TitleEn: this.tipData.titleEn,
          AuthorAr: this.tipData.authorAr,
          AuthorEn: this.tipData.authorEn,
          DescriptionAr: this.tipData.descriptionAr,
          DescriptionEn: this.tipData.descriptionEn,
          ContentAr: this.tipData.contentAr,
          ContentEn: this.tipData.contentEn,
          Status: this.tipData.status,
          VisibleStatus: this.tipData.visibleStatus,
          TipsDepartmentId: this.tipData.tipsDepartmentId,
          DatePublished: this.tipData.datePublished? this.tipData.datePublished.slice(0, 10) : '',
        })
        this.removeImage()
        this.statusValue = this.tipData.visibleStatus
        this.images.push(this.domain+'TipsDrGreenMedia/'+this.tipData.url)
      }
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
      this.addFrom.get('File').patchValue(this.files)
    }
  }

  radioChanged(event: any) {
    this.statusValue = event
    if (event !== 20){
      this.addFrom.get('DatePublished').patchValue('')
    }
  }

  removeImage() {
    this.fileInput.nativeElement.value = '';
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
  }

  submit() {
    this.addFrom.get('VisibleStatus').patchValue(this.statusValue)
    if (this.tipId){
      this._tipsService.updateTipsApi(this.addFrom.value, this.tipId).subscribe({
        next: (res) => {
          this.getTipById()
          this._sharedService.handleResponseMessage('success', 'Update', 'Tip Updated Successfully')
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else {
      this._tipsService.addTipsApi(this.addFrom.value).subscribe({
        next: (res) => {
          this.resetAllForm()
          this._sharedService.handleResponseMessage('success', 'Add', 'Tip Added Successfully')
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
  resetAllForm(){
    this.addFrom.reset();
    this.fileInput.nativeElement.value = '';
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.statusValue = 10
  }
}
