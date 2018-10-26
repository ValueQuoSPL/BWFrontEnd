import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { BehaviorSubject, Observable } from '../../../../../node_modules/rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    // data = new BehaviorSubject(0);
    constructor(private _http: HttpClient) {}

    // Post Appointment Data
    postCalendar(calendarData) {
        return this._http.post(SERVER_API_URL + 'api/appointments', calendarData);
        // this.getCalendarByUid(calendarData.uid);
    }

    // Get Appointment Data
    getCalendar() {
        const url = SERVER_API_URL + 'api/appointments';
        return this._http.get(url);
    }

    // get Appointment data by uid
    getCalendarByUid(uid) {
        console.log('inside under getuid');
        const url = SERVER_API_URL + 'api/appointmentByUid/' + uid;
        return this._http.get(url);
    }

    // Update Status of appointment
    updateCalendar(updateStatusAppointment) {
        return this._http.put(SERVER_API_URL + 'api/updateAppointment', updateStatusAppointment);
    }
}
