import { Route } from '@angular/router';

import { LifeInsuranceComponent } from 'app/risk/life-insurance/life-insurance.component';

export const lifeRoute: Route = {
    path: 'life',
    component:  LifeInsuranceComponent,
    data: {
        authorities: [],
        pageTitle: 'Life-insurance'
    }
};
