import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from '../../../app.constants';
import { Gross } from './gross.model';
import { AccountService } from '../../../core';

@Injectable()
export class GrossService {
  ID;
  userID;
  // temp: any = [];
  user;
  // id: any;
  model: Gross = new Gross();
  ServiceAPIParam: string;
  constructor(private http: HttpClient, private account: AccountService) {}

  save(gross: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/grosses', gross);
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        this.userID = this.user.id;
      });
  }
  public getgross(id) {
    this.ServiceAPIParam = 'api/grosses' + '/' + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
  }
}
