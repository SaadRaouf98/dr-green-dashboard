import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeesService} from "../../services/employees.service";
import {ActivatedRoute} from "@angular/router";
import {Departments, DepartmentsData, EmployeeDetails, Position} from "../../modals/employees";
import {environment as env} from "../../../../../../../environments/environment";
import {SharedService} from "../../../../../../core/shared/sahred-service/shared.service";

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
  employeeIsForm: boolean = true
  EmployeeDetails: EmployeeDetails
  departments: DepartmentsData[]
  positions: Position[]
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
    private _employeesService: EmployeesService,
    private _sharedService: SharedService,
  ) {
    this.employee = +this._activatedRoute.snapshot.paramMap.get('id')
    this._activatedRoute.snapshot.queryParamMap.get('isForm') == 'true'? this.employeeIsForm = true: this.employeeIsForm = false
    this.addForm = _formBuilder.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      UserType: [null, Validators.required],
      PhoneNumber: ['', Validators.required],
      UserRole: this._formBuilder.array([this.initUserRole()]),
      NationalId: ['', Validators.required],
      EmployeeStatus: [null, Validators.required],
      MilitaryStatus: [null, Validators.required],
      DepartmentId: [null, Validators.required],
      PositionId: [null, Validators.required],
      Gender: [null, Validators.required],
      University: ['', Validators.required],
      Degree: ['', Validators.required],
      GraduationDate: ['', Validators.required],
      HireDate: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
    })
  }

  initUserRole() {
    return this._formBuilder.group(
      {roleId: [3, Validators.required]}
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
    this.getAllDep()
    this.employee? this.getAdById(): ''
  }
  setDep(e: DepartmentsData) {
    this.positions = e.positions
  }
  getPositionsById(id: number) {
    this._employeesService.getPositionByIdApi(id).subscribe({
      next: res=>{
        this.positions = res.data
      }
    })
  }

  getAllRoles() {
    this._employeesService.getAllRolesApi().subscribe({
      next: (res: any) =>{

      }
    })
  }
  getAllDep() {
    this._employeesService.GetAllListDepartmentApi().subscribe({
      next: (res: Departments) =>{
        this.departments = res['data']
        console.log(res)
      }
    })
  }
  getAdById() {
    this._employeesService.getEmployeeByIdApi(this.employee).subscribe({
      next: (res: EmployeeDetails) =>{
        this.EmployeeDetails = res
        this.getPositionsById(res.departmentId)
        this.addForm.patchValue({
          Id: this.employee,
          Name: res.name,
          Email: res.email,
          Address: res.address,
          UserType: res.userType,
          PhoneNumber: res.phoneNumber,
          NationalId: res.nationalId,
          EmployeeStatus: res.employeeStatus,
          MilitaryStatus: res.militaryStatus,
          DepartmentId: res.departmentId,
          PositionId: res.positionId,
          Gender: res.gender,
          University: res.university,
          Degree: res.degree,
          GraduationDate: res.graduationDate? res.graduationDate.slice(0, 10) : '',
          HireDate: res.hireDate? res.hireDate.slice(0, 10) : '',
          DateOfBirth: res.dateOfBirth? res.dateOfBirth.slice(0, 10) : '',
        })
      }
    })
  }
  deleteImage(path: string, index: number) {
    this._employeesService.deleteImagesApi(path).subscribe({
      next: res => {
        this.getAdById()
      }
    })
    this.images.splice(index, 1)
  }


  submit() {
    if (this.employee){
      this._employeesService.updateEmployeesApi(this.addForm.value, this.employee).subscribe({
        next: (res) => {
          this.getAdById()
          this._sharedService.handleResponseMessage('success', 'Update', 'Employee Updated Successfully')
        },
        error: (err) => {
        },
      })
    } else {
      this._employeesService.addEmployeeApi(this.addForm.value).subscribe({
        next: (res) => {
          this.resetForm()
          this._sharedService.handleResponseMessage('success', 'Add', 'Employee Added Successfully')
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
    this.statusValue = 10
  }
}
