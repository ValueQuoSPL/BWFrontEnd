import { Route } from '@angular/router';
import { AdvisorViewComponent } from 'app/advisorview/advisorview.component';

export const advisorview: Route = {
    path: 'advisorview/:id',
    component: AdvisorViewComponent
};
