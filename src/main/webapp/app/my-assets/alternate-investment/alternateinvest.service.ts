import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { AltInvest } from 'app/my-assets/alternate-investment/alternateinvestment.modal';

@Injectable()
export class AlternateService {
    ServiceAPIParam: any;
    ServiceAPI: any;
    constructor(private http: HttpClient) {}

    public AltInvestDetails(altInvest) {
        return this.http.post<AltInvest[]>(SERVER_API_URL + 'api/atlernate-investments', altInvest);
    }
    public getAltInvestmentByuid(uid) {
        this.ServiceAPIParam = 'api/atlernate' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getAltInvestById(commonid) {
        this.ServiceAPIParam = 'api/atlernateInvest' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateAltInvest(altInvest) {
        return this.http.put<AltInvest[]>(SERVER_API_URL + 'api/atlernateInvestments', altInvest);
    }
    public DeleteAltInvest(id) {
        this.ServiceAPI = 'api/atlerInvest' + '/' + id;
        return this.http.delete<AltInvest[]>(SERVER_API_URL + this.ServiceAPI);
    }

    /**
     * Author - Pratik
     * @param data
     */
    public updateAvailable(data) {
        this.ServiceAPI = 'api/availableAlt';
        return this.http.put(SERVER_API_URL + this.ServiceAPI, data);
    }
}
