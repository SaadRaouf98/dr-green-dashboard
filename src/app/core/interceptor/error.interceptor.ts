import {inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {SharedService} from "../shared/sahred-service/shared.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _sharedService = inject(SharedService)

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = 'An error occurred'
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const ServerError: any[] = error.error?.errors || [];
          const obj = {
            code: error.status,
            errors: ServerError,
          }
          this._sharedService.handleError(obj)
          return throwError(obj || 'serverError');
        }
        return throwError(errorMessage);
      })
    )
  }
}
