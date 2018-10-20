import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BuckswiseFrontEndDemoModule } from 'app/pratik/demo/demo.module';

import {
    IncomeService,
    UtilityService,
    HouseService,
    TravelService,
    MiscService,
    LoanService,
    LifeService,
    HealthService,
    GeneralService,
    CreditService
} from 'app/pratik/spending/spending.service';

import {
    // HowItWorkComponent,
    SpendingComponent,
    SubscriptionComponent,
    CanDeactivateGuard,
    pratikState
} from 'app/pratik';

import { CustomMaterialModule } from 'app/custom-material.module';
import { CustomDirectiveModule } from './directive/directive.module';
import { IncomeComponent } from 'app/pratik/income/income.component';
import { UtilityComponent } from './spending/utility/utility.component';
import { HouseholdComponent } from './spending/household/household.component';
import { LoanComponent } from './spending/loan/loan.component';
import { CreditComponent } from './spending/credit/credit.component';
import { TravelComponent } from './spending/travel/travel.component';
import { MiscComponent } from './spending/misc/misc.component';
import { LifeComponent } from 'app/pratik/spending/life/life.component';
import { GeneralComponent } from 'app/pratik/spending/general/general.component';
import { HealthComponent } from 'app/pratik/spending/health/health.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashBoardModule } from './dashboard/dashboard.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CommonSidebarService } from './common/sidebar.service';
library.add(fas, far);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(pratikState),
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule,
        // BsDatepickerModule.forRoot(),
        // BuckswiseFrontEndDemoModule,
        // material
        CustomDirectiveModule,
        CustomMaterialModule,
        DashBoardModule
    ],
    declarations: [
        // HowItWorkComponent,
        SpendingComponent,
        SubscriptionComponent,
        IncomeComponent,
        UtilityComponent,
        HouseholdComponent,
        LoanComponent,
        CreditComponent,
        TravelComponent,
        MiscComponent,
        LifeComponent,
        HealthComponent,
        GeneralComponent
    ],
    providers: [
        IncomeService,
        UtilityService,
        HouseService,
        TravelService,
        MiscService,
        LoanService,
        LifeService,
        HealthService,
        GeneralService,
        CreditService,
        CanDeactivateGuard,
        CommonSidebarService
    ],
    entryComponents: [SpendingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndPratikModule {}
