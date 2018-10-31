import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class ContactService {
    constructor(private http: HttpClient) {}
    public submitUser(user: any) {}
    save(user: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/contacts', user);
    }
}
