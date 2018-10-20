import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class FamilyprofileService {
    ServiceAPIParam: any;
    constructor(private http: HttpClient) {}

    save(familyProfile: any): Observable<any> {
        console.log(familyProfile);
        return this.http.post(SERVER_API_URL + 'api/familyprofiles', familyProfile);
    }
    public getFamilyProfile() {
        return this.http.get(SERVER_API_URL + 'api/familyprofiles');
    }
    public getFamilyProfileByUid(uid) {
        console.log('in getFamilyProfileByUid service uid', uid);
        this.ServiceAPIParam = 'api/familyprofiles' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public updateProfile(familyProfile: any): Observable<any> {
        console.log('update family profile', familyProfile);
        return this.http.put(SERVER_API_URL + 'api/familyprofile', familyProfile);
    }
}
