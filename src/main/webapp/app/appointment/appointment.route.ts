import { Route } from '@angular/router';
import { AppointmentComponent } from './appointment.component';

export const appointRoot: Route = {
  path: 'appointment',
  component: AppointmentComponent,
  data: {
    authorities: [],
    pageTitle: 'appointment.title'
  }
};
