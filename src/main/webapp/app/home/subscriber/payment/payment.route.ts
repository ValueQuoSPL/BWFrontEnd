import { Route } from '@angular/router';
import { PaymentComponent } from 'app/home/subscriber/payment/payment.component';

export const payRoute: Route = {
    path: 'payment',
    component: PaymentComponent,
    data: {
        authorities: [],
        pageTitle: 'Buckswise Payment'
    }
};
