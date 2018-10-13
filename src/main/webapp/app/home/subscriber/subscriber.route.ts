import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { SubscriberComponent } from 'app/home/subscriber/subscriber.component';

export const subscriberRoute: Route = {
  path: 'subscriber/:plan',
  component: SubscriberComponent,
  data: {
    authorities: [],
    pageTitle: 'subscription'
  }
};
