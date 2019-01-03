import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Gross } from 'app/sheetal/tax/gross/gross.model';
import { AccountService, LoginService } from 'app/core';

@Injectable()
export class GrossService {
    ID;
    userID;
    user;
    uid;
    gross: Gross = new Gross();
    ServiceAPIParam: string;
    grossurl: string;
    account2: any;
    constructor(private http: HttpClient, private account: AccountService, private loginService: LoginService) {}

    save(gross: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/grossdeducts', gross);
    }

    FetchID() {
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.userID = this.account2.id;
        }
    }
    public getgross(uid) {
        this.ServiceAPIParam = 'api/getgrossdeducts' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getgrossbyId(id) {
        this.ServiceAPIParam = 'api/getgrossdeducts' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public PutGross(gross) {
        return this.http.put(SERVER_API_URL + 'api/grossdeducts', gross);
    }
}
