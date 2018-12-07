import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { FAO } from 'app/my-assets/future-option/futureoption.modal';

@Injectable()
export class FutureOptionService {
    public ServiceAPIParam: any;
    public ServiceAPI: any;

    constructor(private http: HttpClient) {}

    public SaveFAO(fao) {
        return this.http.post<FAO[]>(SERVER_API_URL + 'api/future-options', fao);
    }
    public getFAOByUid(uid) {
        this.ServiceAPIParam = 'api/futureOptionbyuid' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getFutureById(commonid) {
        this.ServiceAPIParam = 'api/futureoptionsbyid' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateFuture(chitfund) {
        return this.http.put<FAO[]>(SERVER_API_URL + 'api/putfutureoptions', chitfund);
    }
    public DeleteFuture(id) {
        this.ServiceAPI = 'api/deletefutureoptions' + '/' + id;
        return this.http.delete<FAO[]>(SERVER_API_URL + this.ServiceAPI);
    }

    /**
     * Author - Pratik
     * @param data
     */
    public updateAvailable(data) {
        this.ServiceAPI = 'api/availableFao';
        return this.http.put(SERVER_API_URL + this.ServiceAPI, data);
    }
}
