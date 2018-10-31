import { Route } from '@angular/router';

import { PasswordResetFinishComponent } from 'app/account/password-reset/finish/password-reset-finish.component';

export const passwordResetFinishRoute: Route = {
    path: 'reset/finish',
    component: PasswordResetFinishComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    }
};
