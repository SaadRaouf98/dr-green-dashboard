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
import {SliderService} from "./slider.service";
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  // Public
  token: any;
  content: any;
  id: any;
  public addForm: FormGroup;
  public editForm: FormGroup;
  columns: any;
  rowsUsers: any;
  closeResult = '';
  images1: any = [];
  fileToUpload1: any = [];
  images2: any = [];
  imagesGet2: any = [];
  fileToUpload2: any = [];
  public selectedOption = 5;
  public data: any;
  public searchValue = '';
  public currentUser: User;
  public isAdmin: boolean;
  public isClient: boolean;
  public ColumnMode = ColumnMode;
  public selectedStatus = [];
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  spinner: boolean = false;
  spinnerLoader: boolean = false;
  right: boolean = false;
  public selectStatus: any = [
    {name: 'All', value: ''},
    {name: 'Downloaded', value: 'Downloaded'},
    {name: 'Draft', value: 'Draft'},
    {name: 'Paid', value: 'Paid'},
    {name: 'Partial Payment', value: 'Partial Payment'},
    {name: 'Past Due', value: 'Past Due'},
    {name: 'Sent', value: 'Sent'}
  ];
  sliders: any;
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
    private _sliderService: SliderService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
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
      this.sliders = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }else{
      this.getSliders()
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
    this.getSliders()
    this.addForm = this._formBuilder.group({
      tag: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.editForm = this._formBuilder.group({
      tag: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  getSliders() {
    this._sliderService.getSliderApi(this.token).subscribe(
        data => {
          this.sliders = data['data'];
          console.log(this.sliders );
          this.tempData=this.sliders
        },
        error => {
          console.log(error);

        }
    );

  }
  onFileSelected1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.fileToUpload1.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images1.push(event.target.result);
          // console.log(this.images1)
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileSelected2(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.fileToUpload2.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images2.push(event.target.result);
          // console.log(this.images1)
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage1() {
    this.images1 = ''
  }
  removeImage2() {
    this.images2 = ''
  }
  removeImageGet2() {
    this.imagesGet2 = ''
  }

  open(content) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openEdit(content, id, row) {
    console.log(row);
    this.editForm = this._formBuilder.group({
      tag: [row.tag, Validators.required],
      title: [row.title, Validators.required],
      price: [row.price, Validators.required],

    });
    this.imagesGet2= row.image
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.id = id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  submitForm1(): any {
    const formData: FormData = new FormData();
    for (var i = 0; i < this.fileToUpload1.length; i++) {
      formData.append(`image`, this.fileToUpload1[i]);
    }
    formData.append('tag', this.addForm.value.tag);
    formData.append('title', this.addForm.value.title);
    formData.append('price', this.addForm.value.price);
    // @ts-ignore
    return formData;
  }
  submit() {
    this.spinner = true;
    this.right = false;
    this._sliderService.addSlider(this.submitForm1(), this.token).subscribe(
        data => {
          this.getSliders();
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
    for (var i = 0; i < this.fileToUpload2.length; i++) {
      formData.append(`image`, this.fileToUpload2[i]);
    }
    formData.append('tag', this.editForm.value.tag);
    formData.append('title', this.editForm.value.title);
    formData.append('price', this.editForm.value.price);
    // @ts-ignore
    return formData;
  }

  edit() {
    this.spinner = true;
    this.right = false;
    this._sliderService.editSl(this.submitForm2(), this.token, this.id).subscribe(
        data => {
          console.log(data);
          this.getSliders()
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
  deleteSlider(id) {
    this._sliderService.deleteSl(this.token, id).subscribe(
        data => {
          this.getSliders();
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
