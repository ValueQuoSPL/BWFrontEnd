import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SystemMaintenanceService {
    constructor(private _http: HttpClient) {}
    uploadExcel(): any {
        return this._http.get('http://www.buckswise.com:8441/api/uploadNav');
    }
    editNavTable(): any {
        return this._http.get(SERVER_API_URL + 'api/putAmcCode');
    }

    fileUpload(file): Observable<HttpEvent<any>> {
        const url = SERVER_API_URL + 'api/saveFile';
        const formData = new FormData();
        formData.append('file', file);
        const params = new HttpParams();

        const options = {
            params,
            reportProgress: true
        };
        const req = new HttpRequest('POST', url, formData, options);
        return this._http.request(req);
    }
}
