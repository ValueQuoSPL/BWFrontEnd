import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { SpendingComponent } from './pratik';
import { UtilityComponent } from './pratik/spending/utility/utility.component';
import { HouseholdComponent } from './pratik/spending/household/household.component';
import { LoanComponent } from './pratik/spending/loan/loan.component';
import { HealthComponent } from './pratik/spending/health/health.component';
import { LifeComponent } from './pratik/spending/life/life.component';
import { GeneralComponent } from './pratik/spending/general/general.component';
import { CreditComponent } from './pratik/spending/credit/credit.component';
import { TravelComponent } from './pratik/spending/travel/travel.component';
import { MiscComponent } from './pratik/spending/misc/misc.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const Spend_Routes: Routes = [
    {
        path: 'spend',
        component: SpendingComponent,
        children: [
            { outlet: 'utility', path: '', component: UtilityComponent },
            { outlet: 'household', path: '', component: HouseholdComponent },
            { outlet: 'loan', path: '', component: LoanComponent },
            { outlet: 'health', path: '', component: HealthComponent },
            { outlet: 'life', path: '', component: LifeComponent },
            { outlet: 'general', path: '', component: GeneralComponent },
            { outlet: 'credit', path: '', component: CreditComponent },
            { outlet: 'travel', path: '', component: TravelComponent },
            { outlet: 'misc', path: '', component: MiscComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#BuckswiseFrontEndAdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        ),
        RouterModule.forChild(Spend_Routes)
    ],
    exports: [RouterModule]
})
export class BuckswiseFrontEndAppRoutingModule {}
