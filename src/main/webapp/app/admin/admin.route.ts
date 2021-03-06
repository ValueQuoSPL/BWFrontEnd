import { Routes } from '@angular/router';

import { auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, userMgmtRoute } from 'app/admin';

import { UserRouteAccessService } from 'app/core';
import { promoRoute } from 'app/admin/promo-code-manage/promo-code.route';
import { appointmentRoute } from 'app/admin/appointment-manage/appointment.route';
import { sysMaintenance } from './system-maintenance/system-maintenance.route';

const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    ...userMgmtRoute,
    metricsRoute,
    promoRoute,
    appointmentRoute,
    sysMaintenance
];

export const adminState: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    }
];
