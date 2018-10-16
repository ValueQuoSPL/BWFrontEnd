import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class UserPlanService {
  url = SERVER_API_URL + 'api/userplans';
  constructor(private http: HttpClient) {}

  SaveUserPlan(data) {
    return this.http.post(this.url, data);
  }
  UpdateUserPlan(data) {
    return this.http.put(this.url, data);
  }
  GetUserPlan(uid) {
    const url = SERVER_API_URL + 'api/getuser/' + uid;
    return this.http.get(url);
  }
}
