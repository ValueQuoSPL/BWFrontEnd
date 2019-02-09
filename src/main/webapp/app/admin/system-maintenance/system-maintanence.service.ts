import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SystemMaintenanceService {
    constructor(private _http: HttpClient) {}
    uploadExcel(): any {
        return this._http.get(SERVER_API_URL + 'api/uploadNav');
    }
    editNavTable(): any {
        return this._http.get(SERVER_API_URL + 'api/putAmcCode');
    }
}
