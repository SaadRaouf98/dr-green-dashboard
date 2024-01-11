import {Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EcommerceService} from 'app/main/apps/ecommerce/ecommerce.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-Home-details',
    templateUrl: './ecommerce-details.component.html',
    styleUrls: ['./ecommerce-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {class: 'Home-application'}
})
export class EcommerceDetailsComponent implements OnInit {
    // public
    @ViewChild(DatatableComponent) table: DatatableComponent;
    productId: any;
    previewProduct: any;
    showImage: any;
    public active: any;
    public productAttributes: any = {};
    token: any;
    message: any = ''
    keys: any = [];
    values: any = [];
    // public checkAttributes;
    public checkAttributes: any = [];
    public contentHeader: object;
    public product;
    public wishlist;
    public cartList;
    public relatedProducts;
    public url = this.router.url;
    public ColumnMode = ColumnMode;
    public selectedOption = 10;
    closeResult = '';
    public attributesRows: any = {};
    allAttributes: any;
    attributeId: any;
    attValueId: any;
    attributeNameId: any;
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public addForm: FormGroup;
    public editForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     * @param {Router} router
     * @param {EcommerceService} _ecommerceService
     */
    @ViewChild('contentEdit', {static: false}) private contentEdit;

    constructor(private _ecommerceService: EcommerceService,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private router: Router,
                private toaster: ToastrService,
                private _formBuilder: FormBuilder
    ) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.productId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getProducts()
        this.getAttributes()
        this.getAttr()
        this.addForm = this._formBuilder.group({
            attributeValue: ['', Validators.required],
        });
        this.editForm = this._formBuilder.group({
            attributeValue: ['', Validators.required],
        });
    }

    open(content) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        this.right = false;
    }
    openEdit1(content, id, row) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        console.log(row);
        this.editForm = this._formBuilder.group({
            attributeValue: [row.value, Validators.required],
        });
        this.attributeId = row.product_attribute.id;
        this.attValueId = id;
        console.log(this.attributeId)
        this.right = false;
    }
    getProducts() {
        this._ecommerceService.getProductsPreview(this.token, this.productId).subscribe(
            data => {
                this.previewProduct = data['data']
                console.log(this.previewProduct)
                this.showImage = data['data'].main_image
                console.log(this.showImage)
                this.productAttributes = data['data'].attributes
                console.log(this.productAttributes)
            },
            error => {
                console.log(error);

            }
        );

    }

    addToCart() {
        this._ecommerceService.addToCart(this.token, this.productId).subscribe(
            data => {
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
    getAttributes() {
        this._ecommerceService.attributesApi(this.token, this.productId).subscribe(
            data => {
                this.attributesRows = data['data'];
                console.log(this.attributesRows);

            },
            error => {
                console.log(error);

            }
        );

    }
    getAttr() {
        this._ecommerceService.getAttr(this.token).subscribe(
            data => {
                this.allAttributes = data['data'];

            },
            error => {
                console.log(error);

            }
        );

    }
    selectedItem(value) {
        console.log(value);
        this.attributeNameId = value.id;
        console.log(this.attributeNameId);
    }
    imageEvent(value) {
        console.log(value);
        this.showImage = value;
        console.log(this.showImage);
    }
    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('attributeValue', this.addForm.value.attributeValue);
        formData.append('product_attribute_id', this.attributeNameId);
        formData.append('product_id', this.productId);
        // @ts-ignore
        return formData;
    }

    submit() {
        this.spinner = true;
        this.right = false;
        this._ecommerceService.addAttributes(this.token, this.submitForm()).subscribe(
            data => {
                this.getProducts()
                this.getAttributes();
                this.toasterSuccess(data);
                this.right = true;
                this.spinner = false;
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                this.right = false;
                this.spinner = false;
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterErrorMessage(item[1])
                    console.log(item)
                })
            }
        );

    }
    editAttributeForm(): any {
        const formData: FormData = new FormData();
        formData.append('attributeValue', this.editForm.value.attributeValue);
        formData.append('product_attribute_id', this.attributeId);
        formData.append('product_id', this.productId);
        // @ts-ignore
        return formData;
    }
    edit() {
        this.spinner = true;
        this.right = false;
        this._ecommerceService.editAttributes(this.token, this.editAttributeForm(), this.attValueId).subscribe(
            data => {
                this.getProducts()
                this.getAttributes();
                this.toasterSuccess(data);
                this.right = true;
                this.spinner = false;
                this.modalService.dismissAll();
            },
            error => {
                this.right = false;
                this.spinner = false;
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterErrorMessage(item[1])
                    console.log(item)
                })
            }
        );

    }

    delete(id) {
        this._ecommerceService.deleteAttribute(this.token, id).subscribe(
            data => {
                this.getProducts()
                this.getAttributes();
                this.toasterSuccess(data);
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterErrorMessage(item[1])
                    console.log(item)
                })
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
    toasterErrorMessage(mess) {
        this.toaster.error('👋' + mess, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
