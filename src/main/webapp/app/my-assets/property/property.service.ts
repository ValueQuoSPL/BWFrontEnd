import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Property } from './property.modal';

@Injectable()
export class PropertyService {
  public ServiceAPIParam: any;
  ServiceAPI: any;

  constructor(private http: HttpClient) {}

  public PropertyDetails(property) {
    console.log('inside property', property);
    return this.http.post<Property[]>(
      SERVER_API_URL + 'api/properties',
      property
    );
  }

  public getsavePropertyByuid(uid) {
    console.log('in getsavePropertyByuid service uid', uid);
    this.ServiceAPIParam = 'api/property' + '/' + uid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public getPropertyById(commonid) {
    this.ServiceAPIParam = 'api/propertiesbyid' + '/' + commonid;
    return this.http.get(SERVER_API_URL + this.ServiceAPIParam);
  }
  public UpdateProperty(property) {
    return this.http.put<Property[]>(
      SERVER_API_URL + 'api/putproperties',
      property
    );
  }
  public DeleteProperty(id) {
    this.ServiceAPI = 'api/deleteproperties' + '/' + id;
    return this.http.delete<Property[]>(SERVER_API_URL + this.ServiceAPI);
  }
}
