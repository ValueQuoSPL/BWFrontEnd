import { AccountService } from 'app/core/auth/account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from '../../app.constants';
import {
    GoalSelect,
    EducationSelect,
    VehicleSelect,
    ChildBirthSelect,
    MerrageSelect,
    NewGoalSelect,
    RetirementFundSelect,
    EmergencyFundSelect,
    VacationSelect,
    FamilySupportSelect,
    BusinessSelect
} from './goalselect.model';
@Injectable()
export class GoalselectService {
    user: any;
    useruid: any;
    ServiceAPIParam: any;

    constructor(private http: HttpClient, private account: AccountService) {
        this.FetchId();
    }
    saveHome(goalselect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', goalselect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveEducation(EducationSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', EducationSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveVehicle(VacationSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', VacationSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveChildBirth(ChildBirthSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', ChildBirthSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveMerrage(MerrageSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', MerrageSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveBusiness(BusinessSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', BusinessSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveFamilySupport(FamilySupportSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', FamilySupportSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveVacation(VacationSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', VacationSelect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveEmergencyFund(EmergencyFundSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', EmergencyFundSelect);
    }
    saveRetirementFund(RetirementFundselect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', RetirementFundselect);
    }
    // tslint:disable-next-line:no-shadowed-variable
    saveNewGoal(NewGoalSelect: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/goalset', NewGoalSelect);
    }
    // in service
    public getgoal() {
        //  this.ServiceAPIParam = 'api/goal' + '/' + id;
        //  return this.http.get(SERVER_API_URL + this.ServiceAPIParam).map((res)  => res);
        return this.http.get(SERVER_API_URL + 'api/goalset').pipe(map(res => res));
        //   }
    }
    public getgoalbyid() {
        const uid = this.useruid;
        this.ServiceAPIParam = 'api/goalset' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam).pipe(map(res => res));
        // return this.http.get(SERVER_API_URL + 'api/goal/{uid}').map((res) => res);
    }
    public getGoalbyId(commonid) {
        this.ServiceAPIParam = 'api/goalsetbyid' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateGoal(goalArray) {
        return this.http.put(SERVER_API_URL + 'api/putgoal', goalArray);
    }

    public PostMapping(data) {
        const url = SERVER_API_URL + 'api/assetmappings';
        return this.http.post(url, data);
    }
    public PutMapping(data) {
        const url = SERVER_API_URL + 'api/assetmappings';
        return this.http.put(url, data);
    }
    public GetMapping(uid) {
        const url = SERVER_API_URL + 'api/getbyuid/' + uid;
        return this.http.get(url);
    }

    public DeleteMapping(id) {
        const url = SERVER_API_URL + 'api/delete/' + id;
        return this.http.delete(url);
    }
    public getMutualFund(uid) {
        this.ServiceAPIParam = 'api/mlfnd' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.useruid = this.user.id;
                // this.mapping.uid = this.uid;
                this.getgoalbyid();
            });
    }
}
