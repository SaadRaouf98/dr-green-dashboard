import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {SharedService} from "../shared/sahred-service/shared.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
          let errors: any[] = ServerError;

          return throwError(
            {
              code: error.status,
              errors: errors,
            } || 'serverError'
          );
        }
        return throwError(errorMessage);
      })
    )
  }
}
