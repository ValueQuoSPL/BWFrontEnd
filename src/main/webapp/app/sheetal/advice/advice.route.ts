import { Route } from '@angular/router';

import { AdviceComponent } from './advice.component';

export const adviceRoute: Route = {
  path: 'advice',
  component: AdviceComponent,
  data: {
    authorities: [],
    pageTitle: 'advice Component'
  }
};
