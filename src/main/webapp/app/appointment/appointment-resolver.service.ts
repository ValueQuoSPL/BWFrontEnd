import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppointmentService } from 'app/appointment/appointment.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentResolverService implements Resolve<any> {
    account: any;
    userid: any;
    constructor(private appointmentService: AppointmentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.appointmentService.getCalendarByUid();
    }
}
