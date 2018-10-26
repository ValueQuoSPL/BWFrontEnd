import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { Eightyc } from './eightyc.model';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';

@Injectable()
export class EightycService {
  ID;
  userID;
  // temp: any = [];
  user;
  // id: any;
  model: Eightyc = new Eightyc();

  ServiceAPIParam: string;

  constructor(private http: HttpClient, private account: AccountService) {}

  save(eightyc: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/eightycs', eightyc);
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.userID = this.user.id;
        console.log('in service', this.userID);
      });
  }
  public geteightyc(id) {
    console.log('in geteightyc service', id);
    this.ServiceAPIParam = 'api/eightycs' + '/' + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
  }
}