import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class AdvisorService {
    constructor(private _http: HttpClient) {}

    // get all payment detail of users
    getPaymentDetailUser() {
        return this._http.get(SERVER_API_URL + 'api/getAllSuccess');
    }
}
