import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';

import {HttpProvider} from './http.provider';


@Injectable()
export class WebApiProvider extends HttpProvider {
  constructor(http: HttpClient) {
    super(http);
  }

  formatUrl(relativeUrl: string): string {
    relativeUrl = environment.SERVER_URL + relativeUrl;
    relativeUrl = super.formatUrl(relativeUrl);

    return relativeUrl;
  }
}
