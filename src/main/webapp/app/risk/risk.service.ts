import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import {
  LifeInsurance,
  MedicalInsurance,
  Questionnaire
} from 'app/risk/risk.model';
@Injectable()
export class RiskService {
  constructor(private http: HttpClient) {}
  public SaveLifeInsurance(lifeInsurance) {
    return this.http.post<LifeInsurance[]>(
      SERVER_API_URL + 'api/risk-life-insurances',
      lifeInsurance
    );
  }
  public SaveMedicalInsurance(medicalInsurance) {
    return this.http.post<MedicalInsurance[]>(
      SERVER_API_URL + 'api/risk-medical-insurances',
      medicalInsurance
    );
  }
  public SaveQuestionnaire(questionnaire) {
    return this.http.post<Questionnaire[]>(
      SERVER_API_URL + 'api/',
      questionnaire
    );
  }

  // get method
  public getLifeInsurance(uid) {
    const url = SERVER_API_URL + 'api/getRiskLifeInsurance/' + uid;
    return this.http.get(url);
  }

  // update method
  public updatelifeInsurance(goalLife) {
    const url = SERVER_API_URL + 'api/risk-life-insurances';
    return this.http.put(url, goalLife);
  }

  // delete method
  public delete(id) {
    const url = SERVER_API_URL + 'api/risk-life-insurances/' + id;
    return this.http.delete(url);
  }

  // get medical insurance
  public getMedicalInsurance(uid) {
    const url = SERVER_API_URL + 'api/getRiskMedicalInsurance/' + uid;
    return this.http.get(url);
  }

  // update Medical Insurance
  public updateMedicalInsurance(riskmedical) {
    const url = SERVER_API_URL + 'api/risk-medical-insurances';
    return this.http.put(url, riskmedical);
  }

  // delete Medical Insurance
  public deleteMedicalInsurance(id) {
    const url = SERVER_API_URL + 'api/risk-medical-insurances/' + id;
    return this.http.delete(url);
  }

  public getid(id) {
    const url = SERVER_API_URL + 'api/risk-medical-insurances/' + id;
    return this.http.get(url);
  }

  public getbyid(id) {
    const url = SERVER_API_URL + 'api/risk-life-insurances/' + id;
    return this.http.get(url);
  }

  // update Goal check
  public updateGoal(data) {
    const url = SERVER_API_URL + 'api/putCheck';
    return this.http.put(url, data);
  }

  // get family profile names
  public getFamilyName(uid) {
    const url = SERVER_API_URL + 'api/familyprofiles/' + uid;
    return this.http.get(url);
  }
}
