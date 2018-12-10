import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class AccountProfileSerivce {
    constructor(private _http: HttpClient) {}

    // update the userid
    update(uid) {
        const uri = 'api/delete-account/delete-account' + '/' + uid;
        return this._http.delete(SERVER_API_URL + uri);
    }
}
