import { Route } from '@angular/router';

import { SpendingComponent } from 'app/pratik/spending/spending.component';

export const SpendRoute: Route = {
    path: 'spend',
    component: SpendingComponent,
    data: {
        authorities: [],
        pageTitle: 'Spending'
    }
};
