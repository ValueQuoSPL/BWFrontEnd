import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Cash } from 'app/my-assets/cash/cash.modal';

@Injectable()
export class CashService {
    public ServiceAPIParam: any;
    public ServiceAPI: any;

    constructor(private http: HttpClient) {}

    public CashDetails(cash) {
        return this.http.post<Cash[]>(SERVER_API_URL + 'api/postcash', cash);
    }

    public getCashDetailsByuid(uid) {
        this.ServiceAPIParam = 'api/cashuid' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getCashById(commonid) {
        this.ServiceAPIParam = 'api/cash' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateCash(cash) {
        return this.http.put<Cash[]>(SERVER_API_URL + 'api/putcash', cash);
    }
    public DeleteStock(id) {
        this.ServiceAPI = 'api/deletecash' + '/' + id;
        return this.http.delete<Cash[]>(SERVER_API_URL + this.ServiceAPI);
    }

    /**
     * Author - Pratik
     * @param data
     */
    public updateAvailable(data) {
        console.log('update cash avail', data);

        this.ServiceAPI = 'api/availableCash';
        return this.http.put(SERVER_API_URL + this.ServiceAPI, data);
    }
}
