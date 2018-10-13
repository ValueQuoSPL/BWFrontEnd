import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { User } from 'app/home/subscriber/payment/payment.model';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) { }

  submitUser(user): Observable<User[]> {
     return this.http.post<User[]>(SERVER_API_URL + 'api/payment/payment', user);
  }
}
