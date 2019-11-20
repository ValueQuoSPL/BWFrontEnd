import { Route } from '@angular/router';
import { AppointmentComponent } from 'app/appointment/appointment.component';
import { AppointmentResolverService } from 'app/appointment/appointment-resolver.service';

export const appointRoot: Route = {
    path: '',
    component: AppointmentComponent,
    data: {
        authorities: [],
        pageTitle: 'appointment.title'
    },
    resolve: { appointment: AppointmentResolverService }
};
