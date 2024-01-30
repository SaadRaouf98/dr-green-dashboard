import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken')
    const authRequest = req.clone({
      setHeaders: {
        // Authorization: `bearer ${authToken}`,
        // setParams: {
        //   lang: this.translateService.currentLang,
        // },
      }
    })
    return next.handle(authRequest)
  }


}
