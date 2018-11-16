import { GoalResolveService } from 'app/goal/goal-select/goal-selectResolve.service';
import { Route } from '@angular/router';

import { GoalSelectComponent } from 'app/goal/goal-select/goal-select.component';

export const goalSelectRoute: Route = {
    path: 'goalselect',
    component: GoalSelectComponent,
    data: {
        authorities: [],
        pageTitle: 'goal.title'
    },
    resolve: { goaldata: GoalResolveService }
};
