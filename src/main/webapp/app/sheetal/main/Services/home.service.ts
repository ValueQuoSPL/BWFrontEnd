import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class HomeService {
  ServiceAPIParam: string;
  constructor(private http: HttpClient) {}

  save(home: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/homedeductions', home);
  }
  public gethome(id) {
    this.ServiceAPIParam = 'api/homedeductions' + '/' + id;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
}
