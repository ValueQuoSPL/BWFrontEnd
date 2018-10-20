import { Route } from '@angular/router';

import { SpendingComponent } from 'app/pratik/spending/spending.component';
import { CanDeactivateGuard } from '../common/can-deactivate-guard.service';

export const SpendRoute: Route = {
    path: 'spend',
    component: SpendingComponent,
    data: {
        authorities: [],
        pageTitle: 'Spending'
    },
    canDeactivate: [CanDeactivateGuard]
};
