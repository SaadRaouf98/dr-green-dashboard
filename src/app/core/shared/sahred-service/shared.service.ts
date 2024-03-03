import {Injectable} from '@angular/core';
import {EMPTY} from "rxjs";
import {ErrorInterface} from "../../interceptor/error.interface";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router, public toastr: ToastrService,) {
  }
  handleResponseMessage(type: string, title?: string, message?: string,){
    this.toastr[type](message, title);
  }
  handleError(err: ErrorInterface){
    let errors = []
    console.log(err)
    if (err.errors.length > 0){
      Object.entries(err.errors).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
        errors = [...value]
        this.handleResponseMessage('error',
          `Error: ${err.code}`,
          err.code == 401? 'You are Not Authorized':
            value
        )
      });
    } else {
      this.handleResponseMessage('error',
        err.code == 0? 'Error: Connection Failed':
          `Error: ${err.code}`,
        err.code == 401? 'You are Not Authorized':
          err.code == 403? 'You Are Not Authenticated':
          err.code == 400? 'Bad Request' :
          err.code == 404?  'Not Found or API name is not correct':
          err.code == 0? 'Please check the Internet':
          'Unknown Error'
      )
    }
    if (err.code == 401 || err.code == 403) {
      this.router.navigateByUrl('/auth/login');
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authTokenBearer');
    }
  }

  formatFormData(body) {
    const formDate = new FormData();
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subKey in ele) {
              ele[subKey] && subKey != 'path' ? formDate.append(`${key}[${index}].${subKey}`, ele[subKey]) : EMPTY;
              ele[subKey] === 0 && subKey != 'path' ? formDate.append(`${key}[${index}].${subKey}`, ele[subKey]) : EMPTY;
            }
          })
        } else {
          body[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof body[key] === 'number' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'boolean' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'string' ? formDate.append(key, body[key]) : EMPTY;
        body[key]?.lastModified ? formDate.append(key, body[key]) : EMPTY;
      }
    }
    return formDate
  }
  formatBody(body) {
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subKey in ele) {
              if (!ele[subKey]){
                delete ele[subKey]
              }
            }
          })
        }
      } else {
        if (!body[key]){
          delete body[key]
        }
      }
    }
    return body
  }
}
