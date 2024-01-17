import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse)=>{
        let errorMessage = 'An error occurred'
        if (err.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${err.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        return throwError(errorMessage);
      })
    )
  }
}
