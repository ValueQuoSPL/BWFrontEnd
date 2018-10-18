import { Route } from '@angular/router';

import { MainComponent } from 'app/sheetal/main/main.component';

export const mainRoute: Route = {
  path: 'main',
  component: MainComponent,
  data: {
    authorities: [],
    pageTitle: 'Main Component'
  }
};
