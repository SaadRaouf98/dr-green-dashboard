import {Injectable} from '@angular/core';
import {EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
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
}
