import { Route } from '@angular/router';
import { CookiePolicyComponent } from '../cookie-policy/cookie-policy.component';
export const cookieRoute: Route = {
    path: 'cookie',
    component: CookiePolicyComponent,
    data: {
        authorities: [],
        pageTitle: 'cookie.title'
    }
};
