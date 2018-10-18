import { Route } from '@angular/router';

import { RequestmeetingComponent } from 'app/sheetal/requestmeeting/requestmeeting.component';

export const meetRoute: Route = {
  path: 'meet',
  component: RequestmeetingComponent,
  data: {
    authorities: [],
    pageTitle: 'Request Meeting'
  }
};
