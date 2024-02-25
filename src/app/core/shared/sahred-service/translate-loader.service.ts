// translation-loader.service.ts
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService implements TranslateLoader {

  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return new TranslateHttpLoader(this.http, './assets/i18n/', '.json').getTranslation(lang);
  }
}
