import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { AccountService } from 'app/core';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    // data = new BehaviorSubject(0);
    userid: any;
    constructor(private _http: HttpClient, private accountService: AccountService) {
        this.getUserid();
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.userid = account.id;
                } else {
                }
            })
            .catch(err => {});
    }

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
    getCalendarByUid() {
        const uid = this.userid;
        console.log('inside under getuid');
        const url = SERVER_API_URL + 'api/appointmentByUid/' + uid;
        return this._http.get(url);
    }

    // Update Status of appointment
    updateCalendar(updateStatusAppointment) {
        return this._http.put(SERVER_API_URL + 'api/updateAppointment', updateStatusAppointment);
    }
}
