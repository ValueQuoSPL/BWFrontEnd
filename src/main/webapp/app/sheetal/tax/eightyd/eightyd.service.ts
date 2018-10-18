import { Injectable,  } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { AccountService } from 'app/core';

@Injectable()
export class EightydService {
  id;
  userID;
  user;
  // id: any;
  eightyd: Eightyd = new Eightyd();

  ServiceAPIParam: string;
  constructor(private http: HttpClient, private account: AccountService) {}

  // return this.account.get().toPromise().then((response) => {
  //  const account = response.body;
  //  console.log('in eightyservice', account);
  // },
  // public ServiceEightyd(eightyd) {

  // console.log(eightyd.Insureself);
  // console.log(eightyd.Insureparents);
  // console.log(eightyd.Health);
  // id: any;
  save(eightyd: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/eightyds', eightyd);
  }

  public geteightyd(uid) {
    console.log('in geteightyd service', uid);
    this.ServiceAPIParam = 'api/eightd' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public PutEightyd(eightyd) {
    console.log('inside update eightyd', eightyd);
    return this.http.put(SERVER_API_URL + 'api/eightyds', eightyd);
  }
}
