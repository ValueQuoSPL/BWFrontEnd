import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpParams, HttpRequest, HttpClient } from '@angular/common/http';

@Injectable()
export class TaxService {
    constructor(private http: HttpClient) {}

    uploadFile(file) {
        const url = SERVER_API_URL + 'api/scanPdf';
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        const params = new HttpParams();
        const options = {
            params,
            reportProgress: true
        };
        const req = new HttpRequest('POST', url, formData, options);
        return this.http.request(req);
    }
}
