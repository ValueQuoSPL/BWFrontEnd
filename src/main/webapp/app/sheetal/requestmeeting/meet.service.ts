import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { User } from 'app/core';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class MeetService {
  constructor(private http: HttpClient) {}
  public submitUser(user: any) {

    return this.http.post<User[]>(SERVER_API_URL + 'api/', user);
  }
}
