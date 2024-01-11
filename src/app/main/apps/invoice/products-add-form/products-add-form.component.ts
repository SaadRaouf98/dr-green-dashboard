import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {ProductsAddFormService} from './products-add-form.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-products-add-form',
    templateUrl: './products-add-form.component.html',
    styleUrls: ['./products-add-form.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ProductsAddFormComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    id: any;
    isWeight: any= false;
    isLength: any= false;
    images1: any = [];
    images2: any = [];
    images3: any = [];
    type: any;
    selectedWeight: any = '';
    selectedUnitSystem: any = '';
    selectedWidthUnit: any = '';
    selectedLengthUnit: any = '';
    selectedHeightUnit: any = '';
    categories: any;
    public messageError = '';
    public messageSuccess = '';
    subCategories: any;
    categoryId: any;
    brandId: any;
    storesData: any;
    storeId: any;
    onSiteValue: any;
    fileToUpload1: any = [];
    fileToUpload2: any = [];
    fileToUpload3: any = [];
    public active: any;
    Id: any;
    transactionId: any;
    allAttributes: any;
    attributesIds: any = [];
    onSiteValues: any = [
        {name:'Yes', value: 'yes'},
        {name:'No', value: 'no'},
    ];
    attributeObj: any = [];
    public addForm: FormGroup;
    public addProductForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public items = [{attributeName: '', attributeValue: ''}];
    public item: any = {
        itemName: '',
        itemQuantity: '',
        itemCost: ''
    };
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
    public unitsSystems: any = [
        {name: 'Lengths', value: 'lengths'},
        {name: 'Weights', value: 'weights'},
        {name: 'Both', value: 'both'},
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
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private _productsAdditionFormService: ProductsAddFormService,
        private _coreSidebarService: CoreSidebarService,
        private modalService: NgbModal
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

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
        this.getCategories()
        this.getStores()
        this.getAttr();
        this.addProductForm = this._formBuilder.group({
            name: ['', Validators.required, Validators.minLength(2)],
            supplier_price: ['', Validators.required, Validators.required],
            sale_price: ['', Validators.required],
            description: ['', Validators.required],
            features: ['', Validators.required],
            pounds: ['', Validators.required],
            ounces: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            height: ['', Validators.required],
            all_qty: ['', Validators.required],
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

    deleteItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items.indexOf(this.items[i]) === id) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

    addItem() {
        this.items.push({
            attributeName: '', attributeValue: ''
        });
        this.attributesIds.length = 0
        this.items.forEach((e) => {
            if (e.attributeName['id'] !== undefined) {
                this.attributesIds.push(e.attributeName['id']);
            }
        })
        console.log(this.items)
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
                    console.log(this.images2)
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

    removeImage1() {
        this.images1 = ''
    }

    removeImage2(url: any) {
        this.images2 = this.images2.filter(img => (img != url));
        console.log(this.images2)
    }

    removeImage3() {
        this.images3 = ''
        console.log(this.images3)
    }

    setType(event) {
        console.log(event.target.value)
        this.type = event.target.value
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

    selectedItem(value) {
        console.log(value);
        this.brandId = value.id;
    }

    selectedStore(value) {
        console.log(value);
        this.storeId = value.id;
        console.log(this.storeId)
    }
    selectedOnSite(value) {
        console.log(value);
        this.onSiteValue = value.value;
        console.log(this.onSiteValue)
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

    getSubCategories(event) {
        this.categoryId = event.id;
        console.log(event);
        this._productsAdditionFormService.subCategories(this.token, event.id).subscribe(
            data => {
                this.subCategories = data['data'];
                console.log(this.subCategories);
            },
            error => {
                console.log(error);

            }
        );

    }

    getAttr() {
        this._productsAdditionFormService.getAttr(this.token).subscribe(
            data => {
                this.allAttributes = data['data'];

            },
            error => {
                console.log(error);

            }
        );

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
        formData.append('subcategory_id', this.brandId);
        formData.append('stock_status', this.type);
        formData.append('store_id', this.storeId);
        formData.append('name', this.addProductForm.value.name);
        formData.append('supplier_price', this.addProductForm.value.supplier_price);
        formData.append('sale_price', this.addProductForm.value.sale_price);
        formData.append('description', this.addProductForm.value.description);
        formData.append('features', this.addProductForm.value.features);
        formData.append('type', this.selectedUnitSystem);
        switch (this.selectedUnitSystem) {
            case 'lengths':
                formData.append('width', this.addProductForm.value.width);
                formData.append('width_symbol', this.selectedWidthUnit);
                formData.append('length', this.addProductForm.value.length);
                formData.append('length_symbol', this.selectedLengthUnit);
                formData.append('height', this.addProductForm.value.height);
                formData.append('height_symbol', this.selectedHeightUnit);
                break;
            case 'weights':
                formData.append('weight_symbol', this.selectedWeight);
                formData.append('pounds', this.addProductForm.value.pounds);
                break;
            case 'both':
                formData.append('width', this.addProductForm.value.width);
                formData.append('width_symbol', this.selectedWidthUnit);
                formData.append('length', this.addProductForm.value.length);
                formData.append('length_symbol', this.selectedLengthUnit);
                formData.append('height', this.addProductForm.value.height);
                formData.append('height_symbol', this.selectedHeightUnit);
                formData.append('weight_symbol', this.selectedWeight);
                formData.append('pounds', this.addProductForm.value.pounds);
                break;
        }
        formData.append('all_qty', this.addProductForm.value.all_qty);
        formData.append('on_site', this.onSiteValue);
        formData.append('meta_title1', this.addProductForm.value.meta_title1);
        formData.append('meta_title2', this.addProductForm.value.meta_title2);
        formData.append('meta_description', this.addProductForm.value.meta_description);
        formData.append('attributes', JSON.stringify(this.items));
        // @ts-ignore
        return formData;
    }

    onSubmit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.addProduct(this.token, this.submitForm()).subscribe(
            data => {
                console.log(data);
                this.messageSuccess = data['message']
                this.right = true;
                this.spinner = false;
                this.SubmitToaster(data);
                location.reload()
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

    SubmitToaster(message) {
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
