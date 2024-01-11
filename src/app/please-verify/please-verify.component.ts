import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {CoreConfigService} from '../../@core/services/config.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PleaseVerifyService} from "./please-verify.service";


@Component({
    selector: 'app-please-verify',
    templateUrl: './please-verify.component.html',
    styleUrls: ['./please-verify.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class PleaseVerifyComponent implements OnInit {
    token: any;
    public coreConfig: any;
    public loginForm: FormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    public passwordTextType: boolean;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {FormBuilder} _formBuilder
     * @param _authenticationService
     */
    constructor(private _coreConfigService: CoreConfigService, private _pleaseVerifyService: PleaseVerifyService,  ) {

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
    ngOnInit() {
        this.token = JSON.parse(localStorage.getItem('registryData')).access_token;
        console.log(this.token)
        this.emailVerfication()
    }
    emailVerfication() {
        this._pleaseVerifyService.sendVerification(this.token).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);

            }
        );

    }

}


