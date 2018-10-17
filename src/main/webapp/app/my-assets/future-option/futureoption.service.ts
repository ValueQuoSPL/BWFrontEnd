import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { FAO } from './futureoption.modal';

@Injectable()
export class FutureOptionService {
  public ServiceAPIParam: any;
  public ServiceAPI: any;

  constructor(private http: HttpClient) {}

  public SaveFAO(fao) {
    return this.http.post<FAO[]>(SERVER_API_URL + 'api/future-options', fao);
  }
  public getFAOByUid(uid) {
    console.log('in getFAOByUid service uid', uid);
    this.ServiceAPIParam = 'api/futureOptionbyuid' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public getFutureById(commonid) {
    this.ServiceAPIParam = 'api/futureoptionsbyid' + '/' + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateFuture(chitfund) {
    return this.http.put<FAO[]>(
      SERVER_API_URL + 'api/putfutureoptions',
      chitfund
    );
  }
  public DeleteFuture(id) {
    this.ServiceAPI = 'api/deletefutureoptions' + '/' + id;
    return this.http.delete<FAO[]>(SERVER_API_URL + this.ServiceAPI);
  }
}
