import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FamilyserviceService {
    constructor(private http: HttpClient) {}

    public saveDetails(MyProfile: any[]) {
        // return this.http.post<Myprofile[]>('https://myapplication-f53b5.firebaseio.com/data.json',servers);
        return this.http.post('https://myproject-577cd.firebaseio.com/data.json', MyProfile);
    }
    // tslint:disable-next-line:no-shadowed-variable
    public saveFPdetail(Familyprofile: any[]) {
        // return this.http.post<Familyprofile[]>(SERVER_API_URL + 'api/',familyProfile);
        return this.http.put('https://myproject-577cd.firebaseio.com/data.json', Familyprofile);
    }
    // tslint:disable-next-line:no-shadowed-variable
    public saveAssumption(Assumption: any[]) {
        return this.http.post('https://myproject-577cd.firebaseio.com/data.json', Assumption);
    }
}
