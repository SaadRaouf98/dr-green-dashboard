import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment as env} from "../../../../../../environments/environment";
import {ManagementService} from "../../services/management.service";
import {AllDepartmentData, Departments} from "../../modals/management";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addForm: FormGroup
  page = 1;
  statusValue: any = 10
  modalStatus: any = 10
  departmentId: any = 10
  protected readonly ColumnMode = ColumnMode;
  rowsUsers: AllDepartmentData[];
  collectionSize: any;
  // categoriesList: CategoriesListData[];
  filters: any;
  public selectedOption = 10;
  selected: any = []
  cards: any
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
  private modalService = inject(NgbModal)
  closeResult = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _managementService: ManagementService,
  ) {
    this.addForm = this._formBuilder.group({
      Id: ['', Validators.required],
      NameAr: ['', Validators.required],
      NameEn: ['', Validators.required],
      IsActive: [false, Validators.required],
      Positions: this._formBuilder.array([]),
    })
  }
  initPositionForm() {
    return this._formBuilder.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
    });
  }

  get positionForm() {
    return this.addForm.controls["Positions"] as FormArray;
  }
  addInitForm() {
    this.positionForm.push(this.initPositionForm());
  }

  deleteForm(index: number) {
    this.positionForm.removeAt(index);
  }
  ngOnInit() {
    this.getCategories(1)
    this.getCategoriesForList()
  }

  getCategories(pageNumber?: any) {
    this.page = pageNumber
    let query = {
      pageNumber: pageNumber,
      pageSize: 10,
    }
    this._managementService.getDepartmentsApi(query).subscribe({
      next: (res: Departments) => {
        this.rowsUsers = res.data
        this.collectionSize = res.totalItems
      }
    })
  }

  getCategoriesForList() {
    // this._managementService.getCategoriesForListApi().subscribe({
    //   next: (res: CategoriesList)=> {
    //     this.categoriesList = res.data
    //   }
    // })
  }

  deleteCategories(id: number) {
    // this._managementService.deleteCategoriesApi(id).subscribe({
    //   next: res => {
    //     this.ngOnInit()
    //   }
    // })
  }

  getCategoriesById() {
    this._managementService.getDepartmentByIdApi(this.departmentId).subscribe({
      next: res => {
        this.addForm.patchValue({
          Id: this.departmentId,
          NameAr: res.data.nameAr,
          NameEn: res.data.nameEn,
          IsActive: res.data.isActive,
        })
        res.data.positions.forEach((ele: any, index)=>{
          this.addInitForm()
          this.positionForm.controls[index].patchValue({
            Id: ele.id,
            Name: ele.name,
          })
        })
        console.log(res.data.positions)
      }
    })
  }

  resetForm() {
    this.addForm.reset()
  }

  submit() {
    if (this.modalStatus == 0) {
      this._managementService.addDepartmentApi(this.addForm.value).subscribe({
        next: (res) => {
          this.ngOnInit()
          this.modalService.dismissAll()
        },
        error: (err) => {
        },
      })
    } else if (this.modalStatus == 1) {
      this._managementService.updateDepartmentApi(this.addForm.value, this.departmentId).subscribe({
        next: (res) => {
          this.ngOnInit()
          this.resetForm()
          this.modalService.dismissAll()
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }

  open(content: any, modalStatus: number, id?: number) {
    this.resetForm()
    this.initPositionForm()
    this.modalStatus = modalStatus
    this.departmentId = id
    if (modalStatus === 1 || modalStatus === 2) {
      this.getCategoriesById()
    }
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    })
  }
}
