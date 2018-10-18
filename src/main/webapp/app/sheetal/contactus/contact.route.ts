import { Route } from '@angular/router';

import { ContactusComponent } from './contactus.component';

export const contactRoute: Route = {
  path: 'contact',
  component: ContactusComponent,
  data: {
    authorities: [],
    pageTitle: 'Contactus Component'
  }
};
