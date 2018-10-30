import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../../../node_modules/@angular/router';
import { Injectable } from '../../../../../node_modules/@angular/core';
import { AppointmentService } from 'app/appointment/appointment.service';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable()
export class AppointmentResolverService implements Resolve<any> {
    constructor(private appointmentService: AppointmentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.appointmentService.getCalendarByUid();
    }
}
