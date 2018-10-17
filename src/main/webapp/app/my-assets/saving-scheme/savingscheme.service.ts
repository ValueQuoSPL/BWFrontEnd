import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { SavingScheme } from 'app/my-assets/saving-scheme/savingscheme.modal';

@Injectable()
export class SavingSchemeService {
  public ServiceAPIParam: any;
  public ServiceAPI: any;

  constructor(private http: HttpClient) {}
  public SavingSchemeDetails(savingScheme) {
    return this.http.post<SavingScheme[]>(
      SERVER_API_URL + 'api/savingscheme',
      savingScheme
    );
  }
  public getSavingScheme(uid) {
    this.ServiceAPIParam = 'api/getsaving' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateSaving(savingScheme) {
    return this.http.put<SavingScheme[]>(
      SERVER_API_URL + 'api/savingUpdate',
      savingScheme
    );
  }
  public DeleteSaving(id) {
    this.ServiceAPI = 'api/savingdelete' + '/' + id;
    return this.http.delete<SavingScheme[]>(SERVER_API_URL + this.ServiceAPI);
  }
  public getSavingSchemeById(commonid) {
    this.ServiceAPIParam = 'api/getsavingSchemebyid' + '/' + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
}
