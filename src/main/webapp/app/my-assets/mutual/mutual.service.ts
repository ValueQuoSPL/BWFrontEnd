import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MutualFund } from 'app/my-assets/mutual/mutual.modal';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class MutualfundService {
    public ServiceAPIParam: any;
    public ServiceAPI: any;

    constructor(private http: HttpClient) {}
    onGetNAVdata(): any {
        const url = `${SERVER_API_URL}api/getnav`;
        console.log(url);
        return this.http.get(url);
    }
    public SubmitUser(mutualfund) {
        return this.http.post<MutualFund[]>(SERVER_API_URL + 'api/mutualfund', mutualfund);
    }
    public getMutualFund(uid) {
        this.ServiceAPIParam = 'api/mlfnd' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getMutualFundByid(commonid) {
        this.ServiceAPIParam = 'api/mutualfund' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateMutualFund(mutualfund) {
        return this.http.put<MutualFund[]>(SERVER_API_URL + 'api/putmutualfund', mutualfund);
    }
    public DeleteMutualFund(id) {
        this.ServiceAPI = 'api/deletemutualfund' + '/' + id;
        return this.http.delete<MutualFund[]>(SERVER_API_URL + this.ServiceAPI);
    }

    /**
     * Author - Pratik
     * @param data
     */
    public updateAvailable(data) {
        this.ServiceAPI = 'api/availableMF';
        return this.http.put(SERVER_API_URL + this.ServiceAPI, data);
    }
}
