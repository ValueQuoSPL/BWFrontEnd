import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { AccountService } from 'app/core';
@Injectable()
export class OtherService {
    ServiceAPIParam: string;
    user;
    userID;
    id;

    constructor(private http: HttpClient, private account: AccountService) {}

    // public ServiceOther(other) {
    save(other: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/others', other);
    }

    public getother(id) {
        this.ServiceAPIParam = 'api/others' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
}
