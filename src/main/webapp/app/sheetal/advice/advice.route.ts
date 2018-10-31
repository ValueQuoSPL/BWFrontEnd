import { Route } from '@angular/router';

import { AdviceComponent } from 'app/sheetal/advice/advice.component';

export const adviceRoute: Route = {
    path: 'advice',
    component: AdviceComponent,
    data: {
        authorities: [],
        pageTitle: 'advice Component'
    }
};
