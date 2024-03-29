import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {ErrorInterceptor} from "./error.interceptor";
import {TranslateService} from "@ngx-translate/core";

export const InterceptorsProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    deps: [TranslateService],
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
    deps: [TranslateService],
  },
];
