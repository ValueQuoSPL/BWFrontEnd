import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class SuccessService {
    saveTransaction(expire): any {
        const url = SERVER_API_URL + 'api/saveupdate';
        return this._http.post(url, expire);
    }
    constructor(private _http: HttpClient) {}

    getTransactionData(uid, from) {
        const url = SERVER_API_URL + 'api/getsuccess/' + uid;
        return this._http.get(url);
    }
}
