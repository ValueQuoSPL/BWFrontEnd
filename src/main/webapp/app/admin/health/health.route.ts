import { Route } from '@angular/router';

import { JhiHealthCheckComponent } from 'app/admin/health/health.component';

export const healthRoute: Route = {
    path: 'jhi-health',
    component: JhiHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks'
    }
};
