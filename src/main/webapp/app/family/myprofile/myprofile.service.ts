import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Myprofile } from 'app/family/family.model';

@Injectable()
export class MyprofileService {
    ServiceAPIParam: any;
    constructor(private http: HttpClient) {}

    save(myProfile: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/myprofile', myProfile);
    }
    public getMyProfile() {
        return this.http.get(SERVER_API_URL + 'api/myprofile');
    }
    public getMyProfileByUid(uid) {
        this.ServiceAPIParam = 'api/myprofile' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public updateProfile(myProfile: any): Observable<any> {
        return this.http.put(SERVER_API_URL + 'api/myprofile', myProfile);
    }
}
