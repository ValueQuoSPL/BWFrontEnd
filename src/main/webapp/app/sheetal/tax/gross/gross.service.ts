import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Gross } from 'app/sheetal/tax/gross/gross.model';
import { AccountService } from 'app/core';

@Injectable()
export class GrossService {
    ID;
    userID;
    user;
    uid;
    gross: Gross = new Gross();
    ServiceAPIParam: string;
    grossurl: string;
    constructor(private http: HttpClient, private account: AccountService) {}

    save(gross: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/grossdeducts', gross);
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
