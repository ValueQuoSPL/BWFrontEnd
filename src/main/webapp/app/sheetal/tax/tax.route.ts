import { Route } from '@angular/router';
import { TaxComponent } from 'app/sheetal/tax/tax.component';

export const taxRoute: Route = {
    path: '',
    component: TaxComponent,
    data: {
        authorities: [],
        pageTitle: 'Tax Component'
    }
};
