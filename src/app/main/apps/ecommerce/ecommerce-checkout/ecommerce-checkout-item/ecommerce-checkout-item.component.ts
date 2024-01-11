import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {KeyValue} from '@angular/common';
import {EcommerceService} from 'app/main/apps/ecommerce/ecommerce.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-Home-checkout-item',
    templateUrl: './ecommerce-checkout-item.component.html',
    styleUrls: ['../ecommerce-checkout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutItemComponent implements OnInit, AfterViewInit {
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
        private _formBuilder: FormBuilder,
        private modalService: NgbModal,
        private toastr: ToastrService,
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
        this._ecommerceService.getCartItems(this.token).subscribe(
            (data: any[]) => {
                this.cartProducts = data['data'];
                console.log(this.cartProducts);
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
        this._ecommerceService.checkoutCustomer(this.token).subscribe(
            data => {
                this.check = data['data'];
                console.log(this.check);
                localStorage.setItem('checkoutData', JSON.stringify(this.check));
                // this.totalPrice()
            },
            error => {
                console.log(error);

            }
        );

    }

    applyCoupon() {
        this._ecommerceService.applyCoupon(this.token, this.addCouponForm.value.code).subscribe(
            data => {
                console.log(data);
                if (data['message'] == 'This Coupon is Not Valid'){
                    this.toasterError(data)
                } else {
                    this.addCouponForm = this._formBuilder.group({
                        code: ['', Validators.required],
                    });
                    this.submitToaster(data)
                    this.checkout()
                }
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
                this.submitToaster(data)
                this.addDiscountForm = this._formBuilder.group({
                    bag_discount: ['', Validators.required],
                });
                this.checkout()
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
                this.submitToaster(data)
                this.deliveryChargeForm = this._formBuilder.group({
                    charge: ['', Validators.required],
                });
                this.checkout()
            },
            error => {
                console.log(error);

            }
        );
    }

    countChange(value, id) {
        this.qtyCount = value;
        console.log(this.qtyCount);
        console.log(id);
        this._ecommerceService.countChange(this.token, this.qtyCount, id).subscribe(
            data => {
                console.log(data);
                this.getCartItems();
            },
            error => {
                console.log(error);

            }
        );
    }

    removeProduct(id) {
        console.log(id);
        this._ecommerceService.removeProduct(this.token, id).subscribe(
            data => {
                this.getCartItems();
                this.deleteToaster(data);
            },
            error => {
                console.log(error);

            }
        );
    }

    clearCart() {
        this._ecommerceService.clearCart(this.token).subscribe(
            data => {
                this.getCartItems();
                this.deleteToaster(data);
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
        this.toastr.success('👋' + message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }

    deleteToaster(message) {
        this.toastr.success('👋' + message.message,
            'Remove !',
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
