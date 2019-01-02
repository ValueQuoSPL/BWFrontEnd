import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from 'app/layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { SpendingComponent } from 'app/pratik';
import { UtilityComponent } from 'app/pratik/spending/utility/utility.component';
import { HouseholdComponent } from 'app/pratik/spending/household/household.component';
import { LoanComponent } from 'app/pratik/spending/loan/loan.component';
import { HealthComponent } from 'app/pratik/spending/health/health.component';
import { LifeComponent } from 'app/pratik/spending/life/life.component';
import { GeneralComponent } from 'app/pratik/spending/general/general.component';
import { CreditComponent } from 'app/pratik/spending/credit/credit.component';
import { TravelComponent } from 'app/pratik/spending/travel/travel.component';
import { MiscComponent } from 'app/pratik/spending/misc/misc.component';
import { CookiePolicyComponent, PrivacyPolicyComponent, TermsConditionComponent } from './footer-pages/footerpage';
import { NotificationComponent } from './pratik/notification/notification.component';

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

const custom_routes: Routes = [
    { path: 'cookiepolicy', component: CookiePolicyComponent },
    { path: 'privacypolicy', component: PrivacyPolicyComponent },
    { path: 'tnc', component: TermsConditionComponent },
    { path: 'notify', component: NotificationComponent }
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
        RouterModule.forChild(Spend_Routes),
        RouterModule.forRoot(custom_routes)
    ],
    exports: [RouterModule]
})
export class BuckswiseFrontEndAppRoutingModule {}
