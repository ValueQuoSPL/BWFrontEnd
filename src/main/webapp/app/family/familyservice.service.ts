import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Myprofile, Familyprofile, Assumption} from 'app/family/family.modal';

@Injectable()
export class FamilyserviceService {

  constructor( private http: HttpClient) {}

  public saveDetails(MyProfile: any[]) {
    // console.log(myProfile.fname);
    // console.log(myProfile.mname);
    // console.log(myProfile.lname);
    // console.log(myProfile.dob);
    // console.log(myProfile.gender);
    // console.log(myProfile.maritalstatus);
    // console.log(myProfile.mobile);
    // console.log(myProfile.almobile);
    // console.log(myProfile.occupation);
    // console.log(myProfile.company);
    // console.log(myProfile.howknow);
    // console.log(myProfile.address);
    // console.log(myProfile.email);
    // console.log(myProfile.pan);
    // console.log(myProfile.country);
    // console.log(myProfile.state);
    // console.log(myProfile.city);
    // console.log(myProfile.pin);

      // return this.http.post<Myprofile[]>('https://myapplication-f53b5.firebaseio.com/data.json',servers);
      return this.http.post('https://myproject-577cd.firebaseio.com/data.json', MyProfile);
  }
  // tslint:disable-next-line:no-shadowed-variable
  public saveFPdetail(Familyprofile: any[])  {
    // console.log("inside familyprofile service details");
    // console.log(familyProfile.relationship);
    // console.log(familyProfile.fsname);
    // console.log(familyProfile.mname);
    // console.log(familyProfile.lname);
    // console.log(familyProfile.phonenum);
    // console.log(familyProfile.dob);
    // console.log(familyProfile.check);

    // return this.http.post<Familyprofile[]>(SERVER_API_URL + 'api/',familyProfile);
    return this.http.put('https://myproject-577cd.firebaseio.com/data.json', Familyprofile);
  }
  // tslint:disable-next-line:no-shadowed-variable
  public saveAssumption(Assumption: any[]) {
//   console.log("inside Assumption service details");
//   console.log(assumption.BRrateOfReturn);
//   console.log(assumption.BRinflation);
//   console.log(assumption.BRrealRateOfReturn);
//   console.log(assumption.ARrateOfReturn);
//   console.log(assumption.ARinflation);
//   console.log(assumption.ARrealRateOfReturn);
//   console.log(assumption.SurplusPercentInvest);
//   console.log(assumption.SurplusPercentInsurance);
//   console.log(assumption.AgeOfRetirement);
//   console.log(assumption.LifeExpentancy);
  return this.http.post('https://myproject-577cd.firebaseio.com/data.json', Assumption);
}
}
