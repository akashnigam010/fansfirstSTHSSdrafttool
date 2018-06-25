import { Injectable } from '@angular/core';
import { WebApiProvider } from '../provider';
import { VerifyEmail } from '../model';
import { Observable } from 'rxjs/Observable';
import { VerifyEmailResponse } from '../response/verifyEmail.response';

@Injectable()
export class EmailService {

  constructor(private webApiProvider: WebApiProvider) { }

  public verifyEmail(verifyEmail: VerifyEmail): Observable<VerifyEmailResponse> {
    return this.webApiProvider.post<VerifyEmailResponse>(
      'verifyEmail', verifyEmail, true);
  }

}
