import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Cash } from './cash.modal';

@Injectable()
export class CashService {
  public ServiceAPIParam: any;
  public ServiceAPI: any;

  constructor(private http: HttpClient) {}

  public CashDetails(cash) {
    console.log('cashDetail service');
    return this.http.post<Cash[]>(SERVER_API_URL + 'api/postcash', cash);
  }

  public getCashDetailsByuid(uid) {
    console.log('in getCashDetailsByuid service uid', uid);
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
}
