import { Route } from '@angular/router';
import { TermsConditionComponent } from './terms-condition.component';

export const termRoute: Route = {
    path: 'terms',
    component: TermsConditionComponent,
    data: {
        authorities: [],
        pageTitle: 'term.title'
    }
};
