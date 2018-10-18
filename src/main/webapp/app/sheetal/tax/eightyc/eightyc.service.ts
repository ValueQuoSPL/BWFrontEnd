import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { Eightyc } from './eightyc.model';
import { AccountService } from '../../../core';

@Injectable()
export class EightycService {
  ID;
  userID;
  user;
  eightyc: Eightyc = new Eightyc();
  ServiceAPIParam: string;

  constructor(private http: HttpClient, private account: AccountService) {}

  save(eightyc: any): Observable<any> {
    alert('Your data saved');
    return this.http.post(SERVER_API_URL + 'api/eightycdeducts', eightyc);
  }

  public geteightyc(uid) {
    this.ServiceAPIParam = 'api/eightycdeducts' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public PutEightyc(eightyc) {
    return this.http.put(SERVER_API_URL + 'api/eightycdeducts', eightyc);
  }
}
