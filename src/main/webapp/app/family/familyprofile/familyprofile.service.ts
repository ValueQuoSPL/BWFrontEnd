import { FamilyProfile } from 'app/family/familyprofile/familyprofile.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Register } from 'app/account/register/register.service';

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

    checkParentSvc(id) {
        console.log('in  checkParent service id is', id);
        this.ServiceAPIParam = 'api/getparentUid' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    getParentData(id) {
        // id = 3;
        this.ServiceAPIParam = 'api/user' + '/' + id;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }

    // added by ranjan.......................
    // save(account: any): Observable<any> {
    //     return this.http.post(SERVER_API_URL + 'api/register', account);
    // }

    // sendMail(email: any): Observable<any> {
    //     return this.http.post(SERVER_API_URL + 'api/mail/send-mail', email);
    // }

    // update(user: User): Observable<HttpResponse<User>> {
    //     return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
    // }

    postDetailsForAccess(access) {
        return this.http.post(SERVER_API_URL + 'api/access', access);
    }

    emailExist(email): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/email', email);
    }
}
