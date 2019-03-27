import { SystemMaintenanceComponent } from './system-maintenance.component';
import { Route } from '@angular/router';

export const sysMaintenance: Route = {
    path: 'SystemMaintenance',
    component: SystemMaintenanceComponent,
    data: {
        pageTitle: 'System Management'
    }
};
