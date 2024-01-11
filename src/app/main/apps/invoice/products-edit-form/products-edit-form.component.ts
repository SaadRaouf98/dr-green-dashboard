import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import { Subject } from 'rxjs';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import {ProductsEditFormService} from './products-edit-form.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products-edit-form',
  templateUrl: './products-edit-form.component.html',
  styleUrls: ['./products-edit-form.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ProductsEditFormComponent implements OnInit, OnDestroy {
  // Public
  token: any;
  id: any;
  editData: any;
  public messageError = '';
  public messageSuccess = '';
  type: any ;
  isWeight: any= false;
  isLength: any= false;
  selectedWeight: any = '';
  selectedUnitSystem: any = '';
  selectedWidthUnit: any = '';
  selectedLengthUnit: any = '';
  selectedHeightUnit: any = '';
  categories: any;
  storesData: any;
  storeId: any;
  onSiteValue: any;
  editProduct: any;
  subCategories: any;
  categoryId: any;
  itemId: any;
  mainImage: any = [];
  severalImages: any = [];
  metaImage: any = [];
  images: any = [];
  images1: any = [];
  images2: any = [];
  images3: any = [];
  fileToUpload1: any = [];
  fileToUpload2: any = [];
  fileToUpload3: any = [];
  catId: any;
  alertForm: any;
  Id: any;
  productId: any;
  public editProductForm: FormGroup;
  public url = this.router.url;
  public urlLastValue;
  public apiData;
  public sidebarToggleRef = false;
  public paymentSidebarToggle = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  spinner: boolean = false;
  spinnerLoader: boolean = false;
  right: boolean = false;
  // Ng2-Flatpickr Options
  public DateRangeOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input accounts-edit-input',
    defaultDate: ['2020-05-01'],
    altFormat: 'Y-n-j'
  };
    closeResult = '';
  public lengthsUnits: any = [
    {name: 'Inches', value: 'inch'},
    {name: 'Feet', value: 'foot'},
  ];
  public weightsUnits: any = [
    {name: 'pound', value: 'pound'},
    {name: 'ounce', value: 'ounce'},
    {name: 'liter', value: 'liter'},
    {name: 'gallon', value: 'gallon'},
  ];
  onSiteValues: any = [
    {name:'Yes', value: 'yes'},
    {name:'No', value: 'no'},
  ];
  public unitsSystems: any = [
    {name: 'Lengths', value: 'lengths'},
    {name: 'Weights', value: 'weights'},
    {name: 'Both', value: 'both'},
  ];
  public paymentDetails = {
    totalDue: '$12,110.55',
    bankName: 'American Bank',
    country: 'United States',
    iban: 'ETD95476213874685',
    swiftCode: 'BR91905'
  };
  public selectType: any = [
    {name: 'In Stock', value: 'instock'},
    {name: 'More InThe Way', value: 'more in the way'},
    {name: 'Out Of Stock', value: 'outofstock'},
  ];
  public units: any = [
    {name: 'Inches', value: 'inch'},
    {name: 'Feet', value: 'foot'},
  ];
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {AccountsEditService} _invoiceEditService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
      private _formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
    private _productsAdditionFormService: ProductsEditFormService,
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  /**
   * DeleteItem
   *
   * @param id
   */
  // deleteItem(id) {
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (this.items.indexOf(this.items[i]) === id) {
  //       this.items.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return `with: ${reason}`;
      }
  }

    toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId)
    this.getProducts()
    this.getCategories()
    this.getStores()
    this.editProductForm = this._formBuilder.group({
      name: ['', Validators.required],
      supplier_price: ['', Validators.required],
      sale_price: ['', Validators.required],
      all_qty: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      pounds: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      height: ['', Validators.required],
      meta_title1: ['', Validators.required],
      meta_title2: ['', Validators.required],
      meta_description: ['', Validators.required],
    });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }
  getProducts() {
    this._productsAdditionFormService.getProductsPreview(this.token, this.productId).subscribe(
        data => {
          this.editProduct = data['data'];
          console.log(this.editProduct)
          this.type = data['data'].stock_status;
          this.categoryId= data['data'].category_id;
          this.storeId= data['data'].store_id;
          this.selectedUnitSystem= data['data'].type;
          this.selectedWeight= data['data'].weight_symbol;
          console.log(this.storeId)
          this.itemId= data['data'].subcategory.id;
          this.getSub(data['data'].category_id)
          this.mainImage= data['data'].main_image;
          this.severalImages= data['data'].images;
          this.images= data['data'].images;
          this.metaImage= data['data'].meta_image;
          this.onSiteValue= data['data'].on_site;
          console.log(this.onSiteValue)
          console.log(this.mainImage)
          this.selectedWidthUnit = data['data'].width_symbol
          this.selectedHeightUnit = data['data'].height_symbol
          this.selectedLengthUnit = data['data'].length_symbol
          // this.images2= data['data'].images;
          // this.images3= data['data'].meta_image;
          this.editProductForm = this._formBuilder.group({
            name: [this.editProduct.name, Validators.required],
            supplier_price: [this.editProduct.supplier_price, Validators.required],
            sale_price: [this.editProduct.sale_price, Validators.required],
            description: [this.editProduct.description, Validators.required],
            features: [this.editProduct.features, Validators.required],
            pounds: [this.editProduct.pounds, Validators.required],
            width: [this.editProduct.width, Validators.required],
            length: [this.editProduct.length, Validators.required],
            height: [this.editProduct.height, Validators.required],
            all_qty: [this.editProduct.qty, Validators.required],
            meta_title1: [this.editProduct.meta_title1, Validators.required],
            meta_title2: [this.editProduct.meta_title2, Validators.required],
            meta_description: [this.editProduct.meta_description, Validators.required],
          })
          switch (data['data'].type) {
            case 'lengths':
              this.isLength = true
              this.isWeight = false
              break;
            case 'weights':
              this.isLength = false
              this.isWeight = true
              break;
            case 'both':
              this.isLength = true
              this.isWeight = true
              break;
          }
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
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onFileSelected3(event: any): void {
    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.fileToUpload3.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images3.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage1(url: any) {
    this.images1 = this.images1.filter(img => (img != url));
  }
  removeImageGet1() {
    this.mainImage = ''
  }
  removeImage2(url: any) {
    this.images2 = this.images2.filter(img => (img != url));
  }
  removeImageGet2(url: any) {
    this.severalImages = this.severalImages.filter(img => (img != url));
  }
  removeImage3(url: any) {
    this.images3 = this.images3.filter(img => (img != url));
    console.log(this.fileToUpload3)
  }
  removeImageGet3() {
    this.metaImage = ''
  }
  getCategories() {
    this._productsAdditionFormService.categories(this.token).subscribe(
        data => {
          this.categories = data['data'];
          console.log(this.categories)
        },
        error => {
          console.log(error);

        }
    );

  }
  selectedStore(value) {
    console.log(value);
    this.storeId = value.id;
    console.log(this.storeId )
  }
  getStores() {
    this._productsAdditionFormService.storesApi(this.token).subscribe(
        data => {
          this.storesData = data['data'];
          console.log(this.storesData)
        },
        error => {
          console.log(error);

        }
    );

  }

  selectedOnSite() {
    console.log(this.onSiteValue)
  }

  getSub(id) {
    this._productsAdditionFormService.subCategories(this.token, id).subscribe(
        data => {
          this.subCategories = data['data'];
          console.log(this.subCategories);
        },
        error => {
          console.log(error);

        }
    );

  }
  getSubCategories(event) {
    this.categoryId = event.id;
    console.log(this.categoryId);
    this._productsAdditionFormService.subCategories(this.token, this.categoryId).subscribe(
        data => {
          this.subCategories = data['data'];
          console.log(this.subCategories);
        },
        error => {
          console.log(error);

        }
    );

  }
  setSystemType(event) {
    this.selectedUnitSystem = event.target.value
    switch (event.target.value) {
      case 'lengths':
        this.isLength = true
        this.isWeight = false
        break;
      case 'weights':
        this.isLength = false
        this.isWeight = true
        break;
      case 'both':
        this.isLength = true
        this.isWeight = true
        break;
    }
  }
  setWeightUnit(event) {
    console.log(event.target.value)
    this.selectedWeight = event.target.value
  }
  setWidthUnit(event) {
    console.log(event.target.value)
    this.selectedWidthUnit = event.target.value
  }
  setLengthUnit(event) {
    console.log(event.target.value)
    this.selectedLengthUnit = event.target.value
  }
  setHeightUnit(event) {
    console.log(event.target.value)
    this.selectedHeightUnit = event.target.value
  }
  setType(event) {
    console.log(event.target.value)
    this.type = event.target.value
  }
  selectedItem(value) {
    console.log(value);
    this.itemId = value.id;
  }
  submitForm(): any {
    const formData: FormData = new FormData();
    for (var i = 0; i < this.fileToUpload1.length; i++) {
      formData.append(`main_image`, this.fileToUpload1[i]);
    }
    for (var i = 0; i < this.fileToUpload2.length; i++) {
      formData.append(`images[]`, this.fileToUpload2[i]);
    }
    for (var i = 0; i < this.fileToUpload3.length; i++) {
      formData.append(`meta_image`, this.fileToUpload3[i]);
    }
    formData.append('category_id', this.categoryId);
    formData.append('subcategory_id', this.itemId);
    formData.append('store_id', this.storeId);
    formData.append('stock_status', this.type);
    formData.append('name', this.editProductForm.value.name);
    formData.append('sale_price', this.editProductForm.value.sale_price);
    formData.append('all_qty', this.editProductForm.value.all_qty);
    formData.append('supplier_price', this.editProductForm.value.supplier_price);
    formData.append('description', this.editProductForm.value.description);
    formData.append('features', this.editProductForm.value.features);
    formData.append('pounds', this.editProductForm.value.pounds);
    formData.append('type', this.selectedUnitSystem);
    switch (this.selectedUnitSystem) {
      case 'lengths':
        formData.append('width', this.editProductForm.value.width);
        formData.append('width_symbol', this.selectedWidthUnit);
        formData.append('length', this.editProductForm.value.length);
        formData.append('length_symbol', this.selectedLengthUnit);
        formData.append('height', this.editProductForm.value.height);
        formData.append('height_symbol', this.selectedHeightUnit);
        break;
      case 'weights':
        formData.append('weight_symbol', this.selectedWeight);
        formData.append('pounds', this.editProductForm.value.pounds);
        break;
      case 'both':
        formData.append('width', this.editProductForm.value.width);
        formData.append('width_symbol', this.selectedWidthUnit);
        formData.append('length', this.editProductForm.value.length);
        formData.append('length_symbol', this.selectedLengthUnit);
        formData.append('height', this.editProductForm.value.height);
        formData.append('height_symbol', this.selectedHeightUnit);
        formData.append('weight_symbol', this.selectedWeight);
        formData.append('pounds', this.editProductForm.value.pounds);
        break;
    }
    formData.append('on_site', this.onSiteValue);
    formData.append('meta_title1', this.editProductForm.value.meta_title1);
    formData.append('meta_title2', this.editProductForm.value.meta_title2);
    formData.append('meta_description', this.editProductForm.value.meta_description);

    // @ts-ignore
    return formData;
  }

  onSubmit() {
    this.spinner = true;
    this.right = false;
    this._productsAdditionFormService.updateProduct(this.token, this.submitForm(), this.productId).subscribe(
        data => {
          console.log(data);
          this.messageSuccess = data['message']
          this.submitToaster(data)
          this.spinner = false;
          // location.reload()
        },
        error => {
          console.log(error);
          this.toasterError(error)
          this.messageError = error.errors
          console.log(this.messageError)
          this.right = false;
          this.spinner = false;
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

  toasterError(error) {
    this.toastr.error('👋' + error.message, 'ERROR!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }

}
