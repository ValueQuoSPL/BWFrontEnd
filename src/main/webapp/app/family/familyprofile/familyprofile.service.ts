import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { map } from 'rxjs/operators';

@Injectable()
export class FamilyprofileService {
  ServiceAPIParam: any;
  constructor(private http: HttpClient) {}

  save(familyProfile: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/familyprofiles', familyProfile);
  }
  public getFamilyProfile() {
    return this.http.get(SERVER_API_URL + 'api/familyprofiles').pipe(map(res => res));
  }
  public getFamilyProfileByUid(uid) {
    this.ServiceAPIParam = 'api/familyprofiles' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
  }
  public updateProfile(familyProfile: any): Observable<any> {
    return this.http.put(SERVER_API_URL + 'api/familyprofile', familyProfile);
  }
}
