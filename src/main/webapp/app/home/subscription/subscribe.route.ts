import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { SubscriptionComponent } from 'app/home/subscription/subscription.component';

export const subscribeRoute: Route = {
    path: 'subscribe',
    component: SubscriptionComponent,
    data: {
        authorities: [],
        pageTitle: 'subscribe.title'
    }
};
