import { Route } from '@angular/router';
import { SuccessComponent } from 'app/success/success.component';

export const successRoute: Route = {
  path: 'success',
  component: SuccessComponent,
  data: {
    authorities: [],
    pageTitle: 'subscriber.title'
  }
};
