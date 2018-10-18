import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Home } from 'app/sheetal/main/Services/home.model';
import { AccountService } from 'app/core';

@Injectable()
export class HomeService {
  ServiceAPIParam: string;
  user;
  userID;
  id;
  home: Home = new Home();
  constructor(private http: HttpClient, private account: AccountService) {}
  save(home: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/homes', home);
  }
  public gethome(uid) {
    this.ServiceAPIParam = 'api/homes' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public PutHome(home) {
    return this.http.put(SERVER_API_URL + 'api/homes', home);
  }
}
