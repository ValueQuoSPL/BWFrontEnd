import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { Gross } from 'app/sheetal/main/Services/gross.model';
import { AccountService, LoginService } from 'app/core';

@Injectable()
export class GrossService {
    ID;
    userID;
    // temp: any = [];
    user;
    // id: any;
    model: Gross = new Gross();
    ServiceAPIParam: string;
    account2: any;
    constructor(private http: HttpClient, private account: AccountService, private loginService: LoginService) {}

    save(gross: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/grosses', gross);
    }

    FetchID() {
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.userID = this.account2.id;
        }
    }
    public getgross(id) {
        this.ServiceAPIParam = 'api/grosses' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
    }
}
