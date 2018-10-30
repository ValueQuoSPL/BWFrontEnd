import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private _http: HttpClient) {}

    public getMutualFund(uid) {
        const url = SERVER_API_URL + 'api/mlfnd/' + uid;
        return this._http.get(url);
    }

    public getStock(uid) {
        const url = SERVER_API_URL + 'api/getbyuidstock/' + uid;
        return this._http.get(url);
    }

    public getSaving(uid) {
        const url = SERVER_API_URL + 'api/getsaving/' + uid;
        return this._http.get(url);
    }

    public getAlterInvestment(uid) {
        const url = SERVER_API_URL + 'api/atlernate/' + uid;
        return this._http.get(url);
    }

    public getCash(uid) {
        const url = SERVER_API_URL + 'api/cashuid/' + uid;
        return this._http.get(url);
    }

    public getPCJ(uid) {
        const url = SERVER_API_URL + 'api/property/' + uid;
        return this._http.get(url);
    }

    public getChit(uid) {
        const url = SERVER_API_URL + 'api/getchit/' + uid;
        return this._http.get(url);
    }
    public getFAO(uid) {
        const url = SERVER_API_URL + 'api/futureOptionbyuid/' + uid;
        return this._http.get(url);
    }

    public getLiabilities(uid) {
        const url = SERVER_API_URL + 'api/loananddebt/getloandebt/' + uid;
        return this._http.get(url);
    }

    public getGoal(uid) {
        const url = SERVER_API_URL + 'api/goalset/' + uid;
        return this._http.get(url);
    }
}
