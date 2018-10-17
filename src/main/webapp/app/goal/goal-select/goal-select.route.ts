import { Route } from '@angular/router';

import { GoalSelectComponent } from './goal-select.component';

export const goalSelectRoute: Route = {
  path: 'goalselect',
  component: GoalSelectComponent,
  data: {
    authorities: [],
    pageTitle: 'goal.title'
  }
};
