import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import {map} from 'rxjs/operators';
@Injectable()
export class MyprofileService {
  ServiceAPIParam: any;
  constructor(private http: HttpClient) {}

  save(myProfile: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/myprofile', myProfile);
  }
  public getMyProfile() {
    return this.http.get(SERVER_API_URL + 'api/myprofile').pipe(map(res => res));
  }
  public getMyProfileByUid(uid) {
    this.ServiceAPIParam = 'api/myprofile' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
  }
  public updateProfile(myProfile: any): Observable<any> {
    return this.http.put(SERVER_API_URL + 'api/myprofile', myProfile);
  }
}
