import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { AccountService } from 'app/core';

@Injectable()
export class EightydService {
  id;
  userID;
  user;
  model: Eightyd = new Eightyd();

  ServiceAPIParam: string;
  constructor(private http: HttpClient, private account: AccountService) {}

  save(eightyd: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/eightds', eightyd);
  }

  public geteightyd(uid) {
    console.log('in geteightyd service', uid);
    this.ServiceAPIParam = 'api/eightds' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
  }
  // public PutEightyd(eightyd) {
  //   const url = SERVER_API_URL + 'api/eightds' + id;
  //   return this.http.put(url);
  // }
}
