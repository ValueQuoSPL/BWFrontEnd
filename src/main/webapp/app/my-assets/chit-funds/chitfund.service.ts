import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { ChitFund } from './chitfund.modal';

@Injectable()
export class ChitFundService {
  public ServiceAPIParam: any;
  ServiceAPI: any;

  constructor(private http: HttpClient) {}
  public ChitFundDetails(chitfund) {
    return this.http.post<ChitFund[]>(
      SERVER_API_URL + 'api/postchit',
      chitfund
    );
  }
  public getChitByuid(uid) {
    console.log('in getChitByuid service uid', uid);
    this.ServiceAPIParam = 'api/getchit' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public getChitById(commonid) {
    this.ServiceAPIParam = 'api/getchitbyid' + '/' + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateChit(chitfund) {
    return this.http.put<ChitFund[]>(SERVER_API_URL + 'api/putchit', chitfund);
  }
  public DeleteChit(id) {
    this.ServiceAPI = 'api/deletechit' + '/' + id;
    return this.http.delete<ChitFund[]>(SERVER_API_URL + this.ServiceAPI);
  }
}
