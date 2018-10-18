import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private _http: HttpClient) {}

  // Post Appointment Data
  postCalendar(calendarData) {
    return this._http.post(SERVER_API_URL + 'api/appointments', calendarData);
  }

  // Get Appointment Data
  getCalendar() {
    const url = SERVER_API_URL + 'api/appointments';
    return this._http.get(url);
  }
}
