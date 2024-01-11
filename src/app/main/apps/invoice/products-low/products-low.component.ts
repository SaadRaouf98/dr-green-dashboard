import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductsLowService} from "./products-low.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products-low',
  templateUrl: './products-low.component.html',
  styleUrls: ['./products-low.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsLowComponent implements OnInit, OnDestroy {
  // public
  rowsProducts: any;
  columns: any;
  editData: any;
  productsData: any;
  token: any;
  id: any;
  prodId: any;
  pdId: any;
  editForm: any;
  addForm: any;
  closeResult = '';
  message: any = ''
  public data: any;
  public selectedOption = 10;
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
  @ViewChild('contentEdit', {static: false}) private contentEdit;
  constructor(private _productsLowService: ProductsLowService,
              private _coreConfigService: CoreConfigService,
              public dialog: MatDialog,
              private toaster :ToastrService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // ---------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.getProducts()
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

  getProducts() {
    this._productsLowService.getProducts().subscribe(
        data => {
          this.rowsProducts = data['data'];
          this.tempData = this.rowsProducts
          console.log(this.rowsProducts);

          this.columns = Object.keys(data['data'][0]);
        },
        error => {
          console.log(error);

        }
    );

  }
  makeVendorOrder(id) {
    this._productsLowService.addToVendorCart(id).subscribe(
        data => {
          console.log(data);
          if (data['message'] == 'Already Added To Cart'){
            this.toasterError(data)
          } else{
            this.toasterSuccess(data)
          }
        },
        error => {
          console.log(error);

        }
    );
  }
  toasterSuccess(mess) {
    this.toaster.success('👋' + mess.message, 'Success!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }
  toasterError(mess) {
    this.toaster.error('👋' + mess.message, 'ERROR!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }
}
