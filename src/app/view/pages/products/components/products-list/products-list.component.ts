import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {environment as env} from "../../../../../../environments/environment";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";
import {Products, CategoriesList, CategoriesListData, ProductsData} from "../../modals/products";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('inputFile') fileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup
  page = 1;
  statusValue: any = 10
  modalStatus: any = 10
  catId: any = 10
  showStatus: string = 'table'
  files: any[] = []
  images: any[] = []
  protected readonly ColumnMode = ColumnMode;
  rowsUsers: ProductsData[];
  collectionSize: any;
  categoriesList: CategoriesListData[];
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
    private _productsService: ProductsService,
    private _sharedService: SharedService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      NameAr: ['', Validators.required],
      NameEn: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      DescriptionAr: ['', Validators.required],
      CategoryStatus: ['', Validators.required],
      CategoryParentId: [''],
      DatePublished: [''],
      Files: [''],
    })
  }

  ngOnInit() {
    this.getProducts(1)
    // this.getProductsForList()
  }


  onFileChanged(event: any): void {
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
      // this.cd.markForCheck();
    }
  }

  radioChanged(event: any) {
    this.statusValue = event
    event !== 20 ? this.addFrom.get('DatePublished').reset() : '';
  }

  removeImage(index: number) {
    this.fileInput.nativeElement.value = '';
    this.files.splice(index, 1)
    this.images.splice(index, 1)
  }

  deleteImage(path: string, index: number) {
    this._productsService.deleteImagesApi(path).subscribe({
      next: res => {
        this.getProductsById()
      }
    })
    this.images.splice(index, 1)
  }

  getProducts(pageNumber?: any) {
    this.page = pageNumber
    let query = {
      pageNumber: pageNumber,
      pageSize: 10,
    }
    this._productsService.getProductsApi(query).subscribe({
      next: (res: Products) => {
        this.rowsUsers = res.data
        this.collectionSize = res.totalItems
      }
    })
  }

  getProductsForList() {
    this._productsService.getCategoriesForListApi().subscribe({
      next: (res: CategoriesList)=> {
        this.categoriesList = res.data
      }
    })
  }

  deleteProducts(id: number) {
    this._productsService.deleteProductsApi(id).subscribe({
      next: res => {
        this.ngOnInit()
      }
    })
  }

  getProductsById() {
    this._productsService.getCategoriesByIdApi(this.catId).subscribe({
      next: res => {
        this.addFrom.patchValue({
          Id: this.catId,
          NameAr: res.data.nameAr,
          NameEn: res.data.nameEn,
          DescriptionAr: res.data.descriptionAr,
          DescriptionEn: res.data.descriptionEn,
          CategoryStatus: res.data.categoryStatus,
          CategoryParentId: res.data.categoryParentId,
          DatePublished: res.data.datePublished? res.data.datePublished.slice(0, 10) : '',
        })
        this.statusValue = res.data.categoryStatus
        if (res.data.categoryImages.length){
          res.data.categoryImages.forEach((ele: any) => {
            let status = this.images.findIndex((elem)=> elem?.path === ele)
            if (status === -1){
              this.images.push({completePath: this.domain + 'CategoriesImages/' + ele, path: ele})
            }
          })
        }
      }
    })
  }

  resetForm() {
    this.fileInput.nativeElement.value = '';
    this.images.splice(0, this.images.length)
    this.files.splice(0, this.files.length)
    this.addFrom.reset()
    this.statusValue = 10
  }

  submit() {
    this.addFrom.get('CategoryStatus').patchValue(this.statusValue)
    this.addFrom.get('Files').patchValue(this.files)
    if (this.modalStatus == 0) {
      this._productsService.addCategoriesApi(this.addFrom.value).subscribe({
        next: (res) => {
          this.ngOnInit()
          this.resetForm()
          this.modalService.dismissAll()
        },
        error: (err) => {
        },
      })
    } else if (this.modalStatus == 1) {
      this._productsService.updateCategoriesApi(this.addFrom.value, this.catId).subscribe({
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
    this.modalStatus = modalStatus
    this.catId = id
    this.resetForm()
    if (modalStatus === 1 || modalStatus === 2) {
      this.getProductsById()
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
