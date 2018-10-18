import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Other } from 'app/sheetal/main/Services/other.model';
import { AccountService } from 'app/core';
@Injectable()
export class OtherService {
  ServiceAPIParam: string;
  user;
  userID;
  id;
  other: Other = new Other();

  constructor(private http: HttpClient, private account: AccountService) {}
  save(other: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/otherdeductions', other);
  }
  public getother(uid) {
    this.ServiceAPIParam = 'api/otherdeductions' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public PutOther(other) {
    return this.http.put(SERVER_API_URL + 'api/otherdeductions', other);
  }
}
