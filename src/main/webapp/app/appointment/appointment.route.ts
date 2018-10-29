import { Route } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AppointmentResolverService } from 'app/appointment/appointment-resolver.service';

export const appointRoot: Route = {
    path: 'appointment',
    component: AppointmentComponent,
    data: {
        authorities: [],
        pageTitle: 'appointment.title'
    },
    resolve: { appointment: AppointmentResolverService }
};
