import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorInterface} from "../../core/interceptor/error.interface";
import {LoginModal} from "./login-modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submit: boolean = false

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  //eid@gmail.com 1234
  ngOnInit() {
  }

  submitLogin(){
    this._authService.loginApi(this.loginForm.value).subscribe({
      next: (res: LoginModal)=>{
        localStorage.setItem('authToken', res.token)
        localStorage.setItem('authTokenBearer', `Bearer ${res.token}`)
        localStorage.setItem('currentUser', JSON.stringify(res.user))
        this.router.navigateByUrl('/');
      },
      error: (err: ErrorInterface) => {
      },
      complete: () => {

      }
    })
  }
}
