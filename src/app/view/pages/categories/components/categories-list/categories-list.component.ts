import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdsService} from "../../../ads/services/ads.service";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  addFrom: FormGroup
  statusValue: any = 10
  modalStatus: any = 10
  catId: any = 10
  files: any[] = []
  images: any[] = []
  protected readonly ColumnMode = ColumnMode;
  rowsUsers: any;
  categoriesList: any;
  filters: any;
  public selectedOption = 10;
  selected: any = []
  cards: any
  RadioStatuses = [
    {id: 10, name: 'Published'},
    {id: 20, name: 'Scheduled'},
    {id: 30, name: 'Hidden'},
  ];
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
    private _categoriesService: CategoriesService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      NameAr: ['', Validators.required],
      NameEn: ['', Validators.required],
      Description: ['', Validators.required],
      CategoryStatus: ['', Validators.required],
      CategoryParentId: [''],
      DatePublished: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getCategories()
    this.getCategoriesForList()
  }


  onFileChanged(event: any) : void {
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
  getCategories() {
    let query = {}
    this._categoriesService.getCategoriesApi(query).subscribe({
      next: res =>{
        this.rowsUsers = res.data
        console.log(res.data)
      }
    })
  }
  getCategoriesForList() {
    let query = {}
    this._categoriesService.getCategoriesForListApi().subscribe({
      next: res =>{
        this.categoriesList = res.data
        console.log(res.data)
      }
    })
  }
  getCategoriesById() {
    this._categoriesService.getCategoriesByIdApi(this.catId).subscribe({
      next: res =>{
        this.addFrom.patchValue({
          Id: this.catId,
          NameAr: res.data.nameAr,
          NameEn: res.data.nameEn,
          Description: res.data.description,
          CategoryStatus: res.data.categoryStatus,
          CategoryParentId: res.data.categoryParentId,
          DatePublished: res.data.datePublished,
        })
        console.log(res.data)
      }
    })
  }

  submit() {
    this.addFrom.get('CategoryStatus').patchValue(this.statusValue)
    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append(`Files`, this.files[i]);
    }
    formData.append(`NameEn`, this.addFrom.value.NameEn);
    formData.append(`NameAr`, this.addFrom.value.NameAr);
    formData.append(`CategoryStatus`, this.addFrom.value.CategoryStatus);
    formData.append(`CategoryParentId`, this.addFrom.value.CategoryParentId);
    formData.append(`DatePublished`, this.addFrom.value.DatePublished);
    formData.append(`meta_image`, this.addFrom.value.EndDate);
    this._categoriesService.addCategoriesApi(formData).subscribe({
      next: (res) => {
        this.ngOnInit()
        console.log(res)
        this.addFrom.reset()
        this.modalService.dismissAll()
        for (let i = 0; i < this.files.length; i++) {
          this.files.splice(i, 1)
        }
        for (let i = 0; i < this.images.length; i++) {
          this.images.splice(i, 1)
        }
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  open(content: any, modalStatus: number, id?: number) {
    this.modalStatus = modalStatus
    this.catId = id
    if (modalStatus === 1 || modalStatus === 2){
      this.getCategoriesById()
    }
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
