import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

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

    updateRecommendation(data) {
        return this._http.put(SERVER_API_URL + 'api/advisors', data);
    }

    getAdvisorDetails(id) {
        return this._http.get(SERVER_API_URL + 'api/advisor/' + id);
    }

    delete(id) {
        return this._http.delete(SERVER_API_URL + 'api/advisors/' + id);
    }
}
