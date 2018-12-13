import { Route } from '@angular/router';
import { FailPaymentComponent } from './fail-payment.component';

export const failRoute: Route = {
    path: 'fail',
    component: FailPaymentComponent,
    data: {
        authorities: [],
        pageTitle: 'subscriber.title'
    }
};
