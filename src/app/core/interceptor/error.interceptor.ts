import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = 'An error occurred'
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401 ) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authTokenBearer');
            this.router.navigate(['/auth/login'], {
              queryParams: { returnUrl: this.router.routerState.snapshot.url },
            });
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const ServerError: any[] = error.error?.errors || [];
          let errors: any[] = [];
          ServerError.forEach((err) => {
            errors = [...errors, ...err];
          });
          return throwError(
            {
              code: error.status,
              errors,
            } || 'serverError'
          );
        }
        return throwError(errorMessage);
      })
    )
  }
}
