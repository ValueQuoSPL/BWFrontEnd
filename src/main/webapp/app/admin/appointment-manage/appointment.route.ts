import { Route } from '@angular/router';

import { AppointmentManageComponent } from 'app/admin/appointment-manage/appointment-manage.component';

export const appointmentRoute: Route = {
    path: 'manage-appointment',
    component: AppointmentManageComponent,
    data: {
        pageTitle: 'Appointment Management'
    }
};
