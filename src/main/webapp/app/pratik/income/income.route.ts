import { Route } from '@angular/router';
import { IncomeComponent } from 'app/pratik/income/income.component';
import { CanDeactivateGuard } from 'app/pratik/common/can-deactivate-guard.service';
import { AuthGuard } from 'app/auth.guard';

export const IncomeRoute: Route = {
    path: 'income',
    component: IncomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Income'
    },
    canDeactivate: [CanDeactivateGuard]
    // canActivate: [AuthGuard]
};
