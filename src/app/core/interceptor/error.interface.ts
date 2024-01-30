import {ErrorInterceptor} from "./error.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";

export interface ErrorInterface {
  code: number;
  errors: string[];
}
