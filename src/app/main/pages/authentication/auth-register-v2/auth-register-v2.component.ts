import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {CoreConfigService} from '@core/services/config.service';
import {AuthenticationService} from '../../../../auth/service';
import {Router} from '@angular/router';
import {log} from "util";

@Component({
    selector: 'app-auth-register-v2',
    templateUrl: './auth-register-v2.component.html',
    styleUrls: ['./auth-register-v2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
    // Public
    public coreConfig: any;
    registryData: any;
    checkEmail: any;
    showUsername: any = false;
    showPhone: any = false;
    showEmail: any = false;
    public passwordTextType: boolean;
    public registerForm: FormGroup;
    public submitted = false;
    public selectType: any = [
        {name: 'Individual', value: '0'},
        {name: 'Business', value: '1'},
    ];
    type: any ;
    private _router: Router;
    // Private
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param router
     * @param {FormBuilder} _formBuilder
     * @param _authenticationService
     */
    constructor(private _coreConfigService: CoreConfigService,  private router: Router,private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService) {
        this._unsubscribeAll = new Subject();

        // Configure the layout
        this._coreConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                menu: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                customizer: false,
                enableLocalStorage: false
            }
        };
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    /**
     * Toggle password
     */
    togglePasswordTextType() {
        this.passwordTextType = !this.passwordTextType;
    }

    /**
     * On Submit
     */
    onSubmit() {
        // this.submitted = true;
        console.log(this.registerForm.get('email').value)
        this._authenticationService.createAccount(this.registerForm.value.email, this.registerForm.value.password,
            this.registerForm.value.first_name, this.registerForm.value.last_name).subscribe(
            data => {
                console.log(data);
                this.registryData= data['data']
                localStorage.setItem('registryData', JSON.stringify(this.registryData))
                this.router.navigate(['/please-verify']);
            },
            error => {
                console.log(error);

            }
        );
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
        });


        // Subscribe to config changes
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.coreConfig = config;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    setType(event) {
        console.log(event.target.value)
        this.type = event.target.value
    }
    emailCheck(event) {
        this._authenticationService.emailCheck(event.target.value).subscribe(
            data => {
                console.log(event.target.value)
                this.checkEmail= data['message']

                console.log(this.checkEmail);
            },
            error => {
                console.log(error);
                this.showEmail= true;

            }
        );

    }
    usernameCheck(event) {
        this._authenticationService.usernameCheck(event.target.value).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
                this.showUsername= true;
            }
        );

    }
    phoneCheck(event) {
        this._authenticationService.phoneCheck(event.target.value).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
                this.showPhone= true;
            }
        );

    }
}
