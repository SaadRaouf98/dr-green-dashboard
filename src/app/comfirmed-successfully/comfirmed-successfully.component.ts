import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {CoreConfigService} from '../../@core/services/config.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ComfirmedSuccessfullyService} from "./comfirmed-successfully.service";


@Component({
    selector: 'app-comfirmed-successfully',
    templateUrl: './comfirmed-successfully.component.html',
    styleUrls: ['./comfirmed-successfully.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ComfirmedSuccessfullyComponent implements OnInit {
    token: any;
    verData: any;
    profileId: any;
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
    constructor(private _comfirmedSuccessfullyService: ComfirmedSuccessfullyService, private _coreConfigService: CoreConfigService) {
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
        this.profileId = JSON.parse(localStorage.getItem('registryData')).user.id;
        console.log(this.profileId)
        this.emailVerification()
    }
    emailVerification() {
        this._comfirmedSuccessfullyService.verfication(this.token, this.profileId).subscribe(
            data => {
                this.verData= data
                console.log(this.verData)
            },
            error => {
                console.log(error);

            }
        );

    }

}


