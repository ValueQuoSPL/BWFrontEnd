import { Route } from '@angular/router';
import { LiabilitiesComponent } from 'app/my-assets/liabilities/liabilities.component';

export const liRoute: Route = {
    path: '',
    component: LiabilitiesComponent,
    data: {
        authorities: [],
        pageTitle: 'Liabilities Details'
    }
};
