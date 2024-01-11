import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {KeyValue} from '@angular/common';
import {EcommerceService} from 'app/main/apps/ecommerce/ecommerce.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-Home-checkout-vendors',
    templateUrl: './ecommerce-checkout-vendors.component.html',
    styleUrls: ['../ecommerce-checkout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutVendorsComponent implements OnInit, AfterViewInit {
    // Input Decorator
    @Input() product;
    public contentHeader: object;
    token: any;
    public cartProducts: any = {};
    check: any;
    userId: any;
    shippingId: any;
    qtyCount: any;
    totPrice: any;
    customers: any;
    public addCouponForm: FormGroup;
    public updateItemInfo: FormGroup;
    public addDiscountForm: FormGroup;
    public deliveryChargeForm: FormGroup;
    closeResult = '';

    private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
        return -1;
    }

    /**
     * Constructor
     *
     * @param {EcommerceService} _ecommerceService
     */
    constructor(
        private _ecommerceService: EcommerceService,
        private toastr: ToastrService,
        private _formBuilder: FormBuilder,
        private modalService: NgbModal,
        ) {

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

    /**
     * Remove From Cart
     *
     * @param product
     */
    removeFromCart(product) {
        if (product.isInCart === true) {
            this._ecommerceService.removeFromCart(product.id).then(res => {
                product.isInCart = false;
            });
        }
    }

    ngAfterViewInit() {
        this.getCartItems();
    }

    /**
     * Toggle Wishlist
     *
     * @param product
     */
    toggleWishlist(product) {
        if (product.isInWishlist === true) {
            this._ecommerceService.removeFromWishlist(product.id).then(res => {
                product.isInWishlist = false;
            });
        } else {
            this._ecommerceService.addToWishlist(product.id).then(res => {
                product.isInWishlist = true;
            });
        }
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.getCartItems();
        this.getCustomers();
        console.log(this.cartProducts);
        this.addCouponForm = this._formBuilder.group({
            code: ['', Validators.required],
        });
        this.updateItemInfo = this._formBuilder.group({
            supplier_price: ['', Validators.required],
        });
        this.addDiscountForm = this._formBuilder.group({
            bag_discount: ['', Validators.required],
        });
        this.deliveryChargeForm = this._formBuilder.group({
            charge: ['', Validators.required],
        });
        this.contentHeader = {
            headerTitle: 'Checkout',
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Cart',
                        isLink: false
                    }
                ]
            }
        };

    }

    open(content) {
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    getCartItems() {
        this._ecommerceService.getCartVendors(this.token).subscribe(
            data => {
                this.cartProducts = data['data'];
                console.log(this.cartProducts);
                // this.updateItemInfo.controls.supplier_price.patchValue(data['data'].supplier_price);
            },
            error => {
                console.log(error);

            }
        );

    }

    completeProcess() {
        this._ecommerceService.checkout(this.token).subscribe(
            data => {
                // this.check = data['data']

            },
            error => {
                console.log(error);

            }
        );
    }

    checkout() {
        this._ecommerceService.checkout(this.token).subscribe(
            data => {
                this.check = data['data'];
                console.log(this.check);
                localStorage.setItem('checkoutData', JSON.stringify(this.check));
                this.totalPrice();
                this.checkToaster(data);
            },
            error => {
                console.log(error);

            }
        );

    }

    totalPrice() {
        this._ecommerceService.totalPrice(this.token).subscribe(
            data => {
                this.totPrice = data['data'];
                console.log(this.totPrice);
            },
            error => {
                console.log(error);

            }
        );

    }

    applyCopon() {
        this._ecommerceService.applyCoupon(this.token, this.addCouponForm.value.code).subscribe(
            data => {
                console.log(data);

            },
            error => {
                console.log(error);

            }
        );
    }

    applyDiscount() {
        this._ecommerceService.applyDiscount(this.token, this.addDiscountForm.value.bag_discount).subscribe(
            data => {
                console.log(data);

            },
            error => {
                console.log(error);

            }
        );
    }

    deliveryCharge() {
        this._ecommerceService.charge(this.token, this.deliveryChargeForm.value.charge).subscribe(
            data => {
                console.log(data);

            },
            error => {
                console.log(error);

            }
        );
    }

    countChange(value) {
        this.qtyCount = value;
        console.log(this.qtyCount);
    }

    changeCartItem(id) {
        console.log(id);
        this._ecommerceService.infoChange(this.token, this.updateItemInfo.value.supplier_price, this.qtyCount, id).subscribe(
            data => {
                console.log(data);
                this.getCartItems();
                this.qtyCount = '';
                this.updateItemInfo = this._formBuilder.group({
                    supplier_price: ['', Validators.required],
                });
                this.submitToaster(data)
                this.checkout()
            },
            error => {
                console.log(error);
                this.toasterError(error)
            }
        );
    }

    removeProduct(id) {
        console.log(id);
        this._ecommerceService.removeProductForVendor(this.token, id).subscribe(
            data => {
                this.getCartItems();
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

    clearCart() {
        this._ecommerceService.clearCartVendor(this.token).subscribe(
            data => {
                this.getCartItems();
                location.reload();
            },
            error => {
                console.log(error);

            }
        );
    }

    getCustomers() {
        this._ecommerceService.customers(this.token).subscribe(
            data => {
                this.customers = data['data'];
            },
            error => {
                console.log(error);

            }
        );

    }

    placeOrder() {
        this._ecommerceService.placeOrder(this.token, this.shippingId, this.userId).subscribe(
            data => {
                console.log(data);

            },
            error => {
                console.log(error);

            }
        );
    }
    submitToaster(message) {
        this.toastr.success('👋'+ message.message,
            'UPDATE ',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }
    checkToaster(data) {
        this.toastr.success('👋 checkout '+ data['data'].total,
            'CHECKOUT',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }
    deleteToaster(message) {
        this.toastr.success('👋'+ message.message,
            'REMOVE !',
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
