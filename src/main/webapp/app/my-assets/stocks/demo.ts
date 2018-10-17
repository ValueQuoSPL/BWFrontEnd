import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_API_URL } from "app/app.constants";
import { Stocks } from "app/my-assets/assets/stocks.model";

@Injectable()
export class StocksService {
  ServiceAPIParam: any;
  ServiceAPI: any;
  constructor(private http: HttpClient) {}

  public SaveStocks(stocks) {
    return this.http.post<Stocks[]>(SERVER_API_URL + "api/stocks", stocks);
  }
  public getStockById(uid) {
    console.log("in getStockById service uid", uid);
    this.ServiceAPIParam = "api/stock" + "/" + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public getStockId(commonid) {
    this.ServiceAPIParam = "api/stocks" + "/" + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateStock(stocks) {
    return this.http.put<Stocks[]>(SERVER_API_URL + "api/stocks", stocks);
  }
  public DeleteStock(id) {
    this.ServiceAPI = "api/stocks" + "/" + id;
    return this.http.delete<Stocks[]>(SERVER_API_URL + this.ServiceAPI);
  }
}
