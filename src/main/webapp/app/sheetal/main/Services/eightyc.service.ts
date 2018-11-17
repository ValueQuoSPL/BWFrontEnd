import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Eightyc } from 'app/sheetal/main/Services/eightyc.model';
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
                this.userID = this.user.id;
            });
    }
    public geteightyc(id) {
        this.ServiceAPIParam = 'api/eightycs' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
    }
}
