import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppointmentService } from 'app/appointment/appointment.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentResolverService implements Resolve<any> {
    account: any;
    userid: any;
    id: any;
    constructor(private appointmentService: AppointmentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        this.id = route.paramMap.get('id');
        this.userid = this.id / 1993;
        return this.appointmentService.getCalendarByUid(this.userid);
    }
}
