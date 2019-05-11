import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class AppointmentManageService {
    constructor(private _http: HttpClient) {}

    // Get All Data
    getAppointmentData() {
        return this._http.get(SERVER_API_URL + 'api/appointment');
    }

    // Get user Info
    getUserdata(id) {
        const url = SERVER_API_URL + 'api/user/' + id;
        return this._http.get(url);
    }

    deleteData(id) {
        const url = SERVER_API_URL + 'api/appointments/' + id;
        return this._http.delete(url);
    }

    postAppointment(appointment) {
        // const url = SERVER_API_URL + 'api/appointments',  appointment
        return this._http.post<any>(SERVER_API_URL + 'api/appointments', appointment);
    }
}
