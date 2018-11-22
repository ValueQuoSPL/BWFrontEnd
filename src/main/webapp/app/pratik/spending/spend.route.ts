import { Route } from '@angular/router';
import { SpendingComponent } from 'app/pratik/spending/spending.component';
import { CanDeactivateGuard } from 'app/pratik/common/can-deactivate-guard.service';

export const SpendRoute: Route = {
    path: 'spend',
    component: SpendingComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {
        authorities: [],
        pageTitle: 'Spending'
    }
};
