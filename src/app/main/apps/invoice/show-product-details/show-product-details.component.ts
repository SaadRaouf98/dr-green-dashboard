import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ShowProductDetailsService} from "./show-product-details.service";

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowProductDetailsComponent implements OnInit, OnDestroy {
  // public
  rowsProducts: any;
  columns: any;
  editData: any;
  productsData: any;
  token: any;
  productId: any;
  id: any;
  pdId: any;
  editForm: any;
  addForm: any;
  closeResult = '';
  public data: any;
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'In Stock', value: 'instock' },
    { name: 'More InThe Way', value: 'more in the way' },
    { name: 'Out Of Stock', value: 'outofstock' },
  ];

  public selectedStatus = [];
  public searchValue = '';

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  public tempFilterData;
  public previousStatusFilter = '';

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {InvoiceListService} _invoiceListService
   */
  constructor(private _showProductDetailsService: ShowProductDetailsService,
              private _coreConfigService: CoreConfigService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    if (event.target.value.length > 0){
      // Reset ng-select on search
      this.selectedStatus = this.selectStatus[0];

      const val = event.target.value.toLowerCase();

      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.rowsProducts = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }else{
      this.getProductData()
    }

  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rowsProducts = this.tempFilterData;
  }
  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.stock_status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductData()
    this.addForm = this._formBuilder.group({
      all_qty: ['', Validators.required],
      supplier_price: ['', Validators.required],
    });
    this.editForm = this._formBuilder.group({
      all_qty: ['', [Validators.required]],
      supplier_price: ['', Validators.required],
    });
    // Subscribe config change
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  open(content, id) {
    console.log(id);
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.id = id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openEdit(content, id, row) {
    console.log(id);
    this.editForm = this._formBuilder.group({
      all_qty: [row.all_qty, [Validators.required]],
      supplier_price: [row.supplier_price, Validators.required],
    });
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.id = id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getProductData()  {
    this._showProductDetailsService.getProductsData(this.token, this.productId).subscribe(
        data => {
          this.productsData = data['data'];
          // this.tempData = this.rowsProducts
          console.log(this.productsData);

          this.columns = Object.keys(data['data'][0]);
        },
        error => {
          console.log(error);

        }
    );

  }

  submit() {
    this._showProductDetailsService.addQty(this.token, this.addForm.value.all_qty, this.addForm.value.supplier_price, this.id).subscribe(
        data => {
          console.log(data);
          this.getProductData()
        },
        error => {
          console.log(error);

        }
    );

  }
  submitForm2(): any {
    const formData: FormData = new FormData();
    formData.append('all_qty', this.editForm.value.all_qty);
    formData.append('supplier_price', this.editForm.value.supplier_price);
    formData.append('product_id', this.productId);
    // @ts-ignore
    return formData;
  }
  edit() {
    this._showProductDetailsService.editQty(this.token, this.submitForm2(), this.id).subscribe(
        data => {
          console.log(data);
          this.getProductData()
        },
        error => {
          console.log(error);

        }
    );

  }

}
