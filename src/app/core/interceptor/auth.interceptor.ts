import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TranslationLoaderService} from "../shared/sahred-service/translate-loader.service";
import {TranslateService} from "@ngx-translate/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _translateService: TranslateService) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken')
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Accept-Language': this._translateService.currentLang == 'en'?
          `${this._translateService.currentLang}-US`:
          `${this._translateService.currentLang}-EG`,
      }
    })
    return next.handle(authRequest)
  }


}
