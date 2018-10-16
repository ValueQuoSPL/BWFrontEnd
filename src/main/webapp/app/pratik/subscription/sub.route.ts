import { Route } from '@angular/router';

import { SubscriptionComponent } from 'app/pratik/subscription/subscription.component';

export const subRoute: Route = {
    path: 'subscription',
    component: SubscriptionComponent,
    data: {
        authorities: [],
        pageTitle: 'Subscription'
    }
};
