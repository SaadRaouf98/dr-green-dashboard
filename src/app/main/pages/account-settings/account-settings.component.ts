import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FlatpickrOptions} from 'ng2-flatpickr';

import {AccountSettingsService} from 'app/main/pages/account-settings/account-settings.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    fileToUpload: any;
    file: any;
    public contentHeader: object;
    public data: any;
    public currentUser: any;
    public birthDateOptions: FlatpickrOptions = {
        altInput: true
    };
    public passwordTextTypeOld = false;
    public passwordTextTypeNew = false;
    public passwordTextTypeRetype = false;
    public avatarImage: string;
    public settingForm: FormGroup;
    public changPasswordForm: FormGroup;
    columns: any;
    rowsUsers: any;
    profileData: any;

    // private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AccountSettingsService} _accountSettingsService
     */
    constructor(private _accountSettingsService: AccountSettingsService, private _formBuilder: FormBuilder) {
        this._unsubscribeAll = new Subject();
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle Password Text Type Old
     */
    togglePasswordTextTypeOld() {
        this.passwordTextTypeOld = !this.passwordTextTypeOld;
    }

    /**
     * Toggle Password Text Type New
     */
    togglePasswordTextTypeNew() {
        this.passwordTextTypeNew = !this.passwordTextTypeNew;
    }

    /**
     * Toggle Password Text Type Retype
     */
    togglePasswordTextTypeRetype() {
        this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
    }

    /**
     * Upload Image
     *
     * @param event
     */
    uploadImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (event: any) => {
                this.avatarImage = event.target.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    onFileSelected(files: FileList): void {
        this.fileToUpload = files.item(0);
        (<HTMLInputElement>document.getElementById('blah')).src = window.URL.createObjectURL(this.fileToUpload);
        (<HTMLInputElement>document.getElementById('blah')).style.height = '70px';
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.file = event.target.result;
                // this.form.patchValue({
                //   image: this.fileToUpload as any
                // });
            };
            reader.readAsDataURL(files[0]);
        }
    }


    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.getProfile();
        this.settingForm = this._formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', Validators.required],
            email: ['', [Validators.required]],

        });
        this.changPasswordForm = this._formBuilder.group({
            oldpassword: ['', [Validators.required]],
            newpassword: ['', Validators.required],
            confirmpassword: ['', [Validators.required]],
        });

        // content header
        this.contentHeader = {
            headerTitle: 'Accounts Settings',
            actionButton: true,
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'it',
                        isLink: true,
                        link: '/'
                    },
                    {
                        name: 'Pages',
                        isLink: true,
                        link: '/'
                    },
                    {
                        name: 'Accounts Settings',
                        isLink: false
                    }
                ]
            }
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    getProfile() {
        this._accountSettingsService.profile(this.token).subscribe(
            data => {
                this.profileData = data['data'];
                console.log(this.profileData);
                this.settingForm = this._formBuilder.group({
                    first_name: [this.profileData.first_name, [Validators.required]],
                    last_name: [this.profileData.last_name, [Validators.required]],
                    email: [this.profileData.email, [Validators.required]],
                });
                // localStorage.setItem('avatar1', JSON.stringify(this.profileData))
            },
            error => {
                console.log(error);

            }
        );

    }
    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('first_name', this.settingForm.value.first_name);
        formData.append('last_name', this.settingForm.value.last_name);
        formData.append('email', this.settingForm.value.email);
        formData.append('image', this.fileToUpload);
        // @ts-ignore
        return formData;
    }
    saveChanges() {
        this._accountSettingsService.accountSettings(this.submitForm(), this.token).subscribe(
            data => {
                console.log(data);
                this.getProfile();
                location.reload();
            },
            error => {
                console.log(error);

            }
        );
    }
    cancel() {
        (<HTMLInputElement>document.getElementById('blah')).src = this.profileData.image;

    }

}
