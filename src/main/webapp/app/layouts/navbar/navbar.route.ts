import { Route } from '@angular/router';

import { NavbarComponent } from 'app/layouts/navbar/navbar.component';

export const navbarRoute: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
};
