import { Route } from '@angular/router';
import { TaxFilingComponent } from 'app/TaxFiling/taxfiling.component';

export const taxfileRoute: Route = {
    path: 'taxfile',
    component: TaxFilingComponent,
    data: {
        authorities: [],
        pageTitle: 'TaxFiling Component'
    }
};
