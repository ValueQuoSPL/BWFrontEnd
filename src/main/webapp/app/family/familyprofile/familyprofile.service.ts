import { FamilyProfile } from 'app/family/familyprofile/familyprofile.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class FamilyprofileService {
    ServiceAPIParam: any;
    constructor(private http: HttpClient) {}

    save(familyProfile: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/familyprofiles', familyProfile);
    }
    public getFamilyProfile() {
        return this.http.get(SERVER_API_URL + 'api/familyprofiles');
    }
    public getFamilyProfileByUid(uid) {
        this.ServiceAPIParam = 'api/familyprofiles' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public updateProfile(familyProfile) {
        return this.http.put<FamilyProfile[]>(SERVER_API_URL + 'api/familyprofile', familyProfile);
    }
    public updateProfileById(commonid) {
        this.ServiceAPIParam = 'api/familypro' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public DeleteFamilyProfile(id) {
        this.ServiceAPIParam = 'api/familyprofiles' + '/' + id;
        return this.http.delete<FamilyProfile[]>(SERVER_API_URL + this.ServiceAPIParam);
    }
}
