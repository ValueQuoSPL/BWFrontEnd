import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LiabilitiesService {
  constructor(private _http: HttpClient) {}
  getloan(uid) {
    const url = SERVER_API_URL + 'api/loananddebt/getloandebt/' + uid;
    return this._http.get(url, { observe: 'body' });
  }

  // update the loan information
  updateloan(loan, uid) {
    console.log('underservice of loan', loan);
    const url = SERVER_API_URL + 'api/loananddebt/putloandebt/' + uid;
    return this._http.put(url, loan);
  }
}
