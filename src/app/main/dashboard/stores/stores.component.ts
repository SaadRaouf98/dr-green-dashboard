import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';
import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {StoresService} from "./stores.service";
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoresComponent implements OnInit {
  // Public
  token: any;
  content: any;
  id: any;
  public addForm: FormGroup;
  public editForm: FormGroup;
  columns: any;
  rowsUsers: any;
  closeResult = '';
  public selectedOption = 10;
  public data: any;
  public searchValue = '';
  public currentUser: User;
  public isAdmin: boolean;
  public isClient: boolean;
  public ColumnMode = ColumnMode;
  public selectedStatus = [];
  public selectStatus: any = [
    {name: 'All', value: ''},
    {name: 'Downloaded', value: 'Downloaded'},
    {name: 'Draft', value: 'Draft'},
    {name: 'Paid', value: 'Paid'},
    {name: 'Partial Payment', value: 'Partial Payment'},
    {name: 'Past Due', value: 'Past Due'},
    {name: 'Sent', value: 'Sent'}
  ];
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  spinner: boolean = false;
  spinnerLoader: boolean = false;
  right: boolean = false;
  stores: any;
  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  public tempFilterData;
  public previousStatusFilter = '';
  private _route: ActivatedRoute;
  private _router: Router;

  /**
   * Constructor
   * @param {AuthenticationService} _authenticationService
   * @param {DashboardService} _dashboardService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService,
    private _storesService: StoresService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;
    this._coreTranslationService.translate(english, french, german, portuguese);

  }
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
      this.stores = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }else{
      this.getStores()
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.getStores()
    this.addForm = this._formBuilder.group({
      name: ['', Validators.required],
      zip_code: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.editForm = this._formBuilder.group({
      name: ['', Validators.required],
      zip_code: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  getStores() {
    this._storesService.getStoresApi(this.token).subscribe(
        data => {
          this.stores = data['data'];
          console.log(this.stores );
          this.tempData=this.stores
        },
        error => {
          console.log(error);

        }
    );

  }


  open(content) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm'
    });
    this.right = false;
  }
  openEdit(content, id, row) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm'
    });
    this.right = false;
    console.log(row);
    this.editForm = this._formBuilder.group({
      name: [row.name, [Validators.required]],
      zip_code: [row.zip_code, [Validators.required]],
      address: [row.address, Validators.required],
    });
    this.id = id;
  }


  submitForm1(): any {
    const formData: FormData = new FormData();
    formData.append('name', this.addForm.value.name);
    formData.append('zip_code', this.addForm.value.zip_code);
    formData.append('address', this.addForm.value.address);
    // @ts-ignore
    return formData;
  }
  submit() {
    this.spinner = true;
    this.right = false;
    this._storesService.addCategories(this.submitForm1(), this.token).subscribe(
        data => {
          this.getStores();
          this.right = true;
          this.spinner = false;
          this.submitToaster(data)
          this.modalService.dismissAll();
        },
        error => {
          this.right = false;
          this.spinner = false;
          Object.entries(error.errors).forEach((item)=> {
            this.toasterError(item[1])
          })
        }
    );

  }

  submitForm2(): any {
    const formData: FormData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('zip_code', this.editForm.value.zip_code);
    formData.append('address', this.editForm.value.address);
    // @ts-ignore
    return formData;
  }

  edit() {
    this.spinner = true;
    this.right = false;
    this._storesService.editCategories(this.submitForm2(), this.token, this.id).subscribe(
        data => {
          console.log(data);
          this.getStores()
          this.right = true;
          this.spinner = false;
          this.modalService.dismissAll();
          this.submitToaster(data)
        },
        error => {
          this.right = false;
          this.spinner = false;
          Object.entries(error.errors).forEach((item)=> {
            this.toasterError(item[1])
            console.log(item)
          })
        }
    );

  }
  deleteCat(id) {
    this._storesService.deleteCat(this.token, id).subscribe(
        data => {
          this.getStores();
          this.deleteToaster(data);
        },
        error => {
          console.log(error);
          Object.entries(error.errors).forEach((item)=> {
            this.toasterError(item[1])
            console.log(item)
          })
        }
    );
  }
  submitToaster(message) {
    this.toastr.success('👋'+ message.message,
        'Submit !',
        {
          positionClass: 'toast-top-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
  }
  deleteToaster(message) {
    this.toastr.success('👋'+ message.message,
        'Delete !',
        {
          positionClass: 'toast-top-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
  }

  toasterError(error) {
    this.toastr.error('👋' + error, 'ERROR!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }
}
