import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    // },
    // public ServiceEightyd(eightyd) {

    // id: any;
    save(eightyd: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/eightyds', eightyd);
    }

    public geteightyd(uid) {
        this.ServiceAPIParam = 'api/eightd' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public PutEightyd(eightyd) {
        return this.http.put(SERVER_API_URL + 'api/eightyds', eightyd);
    }
}
