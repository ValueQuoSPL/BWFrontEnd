import { Route } from '@angular/router';
import { ServicesComponent } from 'app/home/services/services.component';

export const servicesRoute: Route = {
    path: 'services',
    component: ServicesComponent,
    data: {
        authorities: [],
        pageTitle: 'services.title'
    }
};
