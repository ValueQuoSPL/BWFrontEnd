import { Route } from '@angular/router';

import { RiskComponent } from 'app/risk/risk.component';
import { AuthGuard } from 'app/auth.guard';

export const riskRoute: Route = {
    path: '',
    component: RiskComponent
    // canActivate: [AuthGuard]
};
