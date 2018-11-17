import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from '../../../../../node_modules/rxjs';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    // data = new BehaviorSubject(0);
    userid: any;
    account: any;
    constructor(private _http: HttpClient, private commonSidebarService: CommonSidebarService) {
        this.getUserid();
    }

    getUserid() {
        this.commonSidebarService.account.subscribe(account => {
            this.account = account;
            this.userid = this.account.id;
            this.getCalendarByUid();
        });
    }

    // Post Appointment Data
    postCalendar(calendarData): Observable<any> {
        return this._http.post<any>(SERVER_API_URL + 'api/appointments', calendarData);
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
        const url = SERVER_API_URL + 'api/appointmentByUid/' + uid;
        return this._http.get(url);
    }

    // Update Status of appointment
    updateCalendar(updateStatusAppointment) {
        return this._http.put(SERVER_API_URL + 'api/updateAppointment', updateStatusAppointment);
    }
}
