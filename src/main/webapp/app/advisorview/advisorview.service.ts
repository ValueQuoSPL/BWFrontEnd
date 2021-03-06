import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdvisorViewService {
    constructor(private _http: HttpClient) {}

    // get all payment detail of users
    getPaymentDetailUser() {
        return this._http.get(SERVER_API_URL + 'api/getAllSuccess');
    }
    getAllUser() {
        return this._http.get(SERVER_API_URL + 'api/get');
    }

    saveRecommendation(data) {
        return this._http.post(SERVER_API_URL + 'api/advisors', data);
    }

    saveUserComments(data) {
        return this._http.put(SERVER_API_URL + 'api/advisors', data);
    }

    updateRecommendation(data) {
        return this._http.put(SERVER_API_URL + 'api/advisors', data);
    }

    getAdvisorDetails(uid, type) {
        return this._http.get(SERVER_API_URL + 'api/advisor/' + uid + '/' + type);
    }

    showadvise(uid, type) {
        return this._http.get(SERVER_API_URL + 'api/showadvise/' + uid + '/' + type);
    }

    delete(id) {
        return this._http.delete(SERVER_API_URL + 'api/advisors/' + id);
    }
}
