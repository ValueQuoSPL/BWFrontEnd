import { Route } from '@angular/router';

import { PasswordResetInitComponent } from 'app/account/password-reset/init/password-reset-init.component';

export const passwordResetInitRoute: Route = {
    path: 'reset/request',
    component: PasswordResetInitComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    }
};
