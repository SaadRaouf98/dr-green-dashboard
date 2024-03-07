import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeesService} from "../../services/employees.service";
import {ActivatedRoute} from "@angular/router";
import {AdsList, AdsListData} from "../../modals/employees";
import {environment as env} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})

export class AddEmployeesComponent implements OnInit {
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addForm: FormGroup
  statusValue: any = 10
  employee: number = 10
  adsList: AdsListData
  Filters = [
    {id: 10, name: 'Home'},
  ];
  employeeStatus = [
    {id: 10, name: 'Working'},
    {id: 20, name: 'Termination'},
    {id: 30, name: 'Resignation'},
  ];
  files: any[] = []
  images: any[] = []
  Gender = [
    {id: 10, name: 'Male'},
    {id: 20, name: 'Female'},
  ];
  MilitaryStatus = [
    {id: 10, name: 'NotApplicable'},
    {id: 20, name: 'Exempt'},
    {id: 30, name: 'ActiveDuty'},
    {id: 40, name: 'Reserve'},
    {id: 50, name: 'Retired'},
    {id: 60, name: 'Veteran'},
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _adsService: EmployeesService,
  ) {
    this.employee = +this._activatedRoute.snapshot.paramMap.get('id')
    this.addForm = _formBuilder.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      UserType: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      RoleName: ['', Validators.required],
      UserRole: this._formBuilder.array([this.initUserRole()]),
      NationalId: ['', Validators.required],
      EmployeeStatus: ['', Validators.required],
      MilitaryStatus: ['', Validators.required],
      DepartmentId: ['', Validators.required],
      PositionId: ['', Validators.required],
      Gender: ['', Validators.required],
      University: ['', Validators.required],
      Degree: ['', Validators.required],
      GraduationDate: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
    })
  }
  initUserRole() {
    return this._formBuilder.group(
      {roleId: ['', Validators.required]}
    )
  }
  get userRoleForm() {
    return this.addForm.controls["userRole"] as FormArray;
  }
  addInitForm() {
    this.userRoleForm.push(this.initUserRole());
  }

  deleteForm(index: number) {
    this.userRoleForm.removeAt(index);
  }
  ngOnInit() {
    this.getAllRoles()
    this.employee? this.getAdById(): ''
  }

  getAllRoles() {
    this._adsService.getAllRolesApi().subscribe({
      next: (res: any) =>{

      }
    })
  }
  getAdById() {
    this._adsService.getAdByIdApi(this.employee).subscribe({
      next: (res: AdsList) =>{
        this.adsList = res.data
        this.addForm.patchValue({
          Id: this.employee,
          TitleAr: res.data.titleAr,
          TitleEn: res.data.titleEn,
          Status: res.data.status,
          DisplayPage: res.data.displayPage,
          EndDate: res.data.datePublished? res.data.endDate.slice(0, 10) : '',
          DatePublished: res.data.datePublished? res.data.datePublished.slice(0, 10) : '',
        })
        this.statusValue = res.data.status
      }
    })
  }
  deleteImage(path: string, index: number) {
    this._adsService.deleteImagesApi(path).subscribe({
      next: res => {
        this.getAdById()
      }
    })
    this.images.splice(index, 1)
  }


  submit() {
    this.addForm.get('Status').patchValue(this.statusValue)
    this.addForm.get('Files').patchValue(this.files)
    if (this.employee){
      this._adsService.updateAdsApi(this.addForm.value, this.employee).subscribe({
        next: (res) => {
          this.getAdById()
        },
        error: (err) => {
        },
      })
    } else {
      this._adsService.addAdsApi(this.addForm.value).subscribe({
        next: (res) => {
          this.resetForm()
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
  resetForm(){
    this.addForm.reset()
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.fileInput.nativeElement.value = '';
    this.statusValue = 10
  }
}
