import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Stocks } from 'app/my-assets/stocks/stocks.modal';

@Injectable()
export class StockService {
    ServiceAPIParam: any;
    ServiceAPI: any;
    constructor(private http: HttpClient) {}

    public SaveStocks(stocks) {
        return this.http.post<Stocks[]>(SERVER_API_URL + 'api/poststocks', stocks);
    }
    public getStockById(uid) {
        this.ServiceAPIParam = 'api/getbyuidstock' + '/' + uid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public getStockId(commonid) {
        this.ServiceAPIParam = 'api/getbyidstocks' + '/' + commonid;
        return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
    }
    public UpdateStock(stocks) {
        return this.http.put<Stocks[]>(SERVER_API_URL + 'api/putstocks', stocks);
    }
    public DeleteStock(id) {
        this.ServiceAPI = 'api/deletestocks' + '/' + id;
        return this.http.delete<Stocks[]>(SERVER_API_URL + this.ServiceAPI);
    }
    public updateAvailable(data) {
        this.ServiceAPI = 'api/availableStock';
        return this.http.put(SERVER_API_URL + this.ServiceAPI, data);
    }
}
