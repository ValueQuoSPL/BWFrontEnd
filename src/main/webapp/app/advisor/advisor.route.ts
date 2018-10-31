import { Route } from '@angular/router';
import { AdvisorComponent } from 'app/advisor/advisor.component';
import { UserRouteAccessService } from 'app/core';

export const advisorRoot: Route = {
    path: 'advisor',
    component: AdvisorComponent,
    data: {
        authorities: ['ROLE_ADVISOR'],
        pageTitle: 'advisor.title'
    }
};
