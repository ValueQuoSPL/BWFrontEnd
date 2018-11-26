import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { UserContact } from './contact.model';

@Injectable()
export class ContactService {
    constructor(private http: HttpClient) {}
    // public submitUser(user: any) {}
    // save(user: any): Observable<any> {
    //     console.log('in contact service');
    //     return this.http.post(SERVER_API_URL + 'api/contactus', user);
    // }
    public save(user) {
        console.log('in service contact', user);
        return this.http.post<[UserContact]>(SERVER_API_URL + 'api/contactuses', user);
    }
}
