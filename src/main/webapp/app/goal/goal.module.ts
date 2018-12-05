import { goalAddRoute } from './goal-add-button/goal-add-button.route';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { goalSelectRoute } from 'app/goal/goal-select/goal-select.route';
//  import { GoalComponent, goalRoot } from './';
// import { GoalSelectComponent } from './Goal-select/goalselect.component';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';
import { CustomMaterialModule } from 'app/custom-material.module';
import { GoalComponent, goalRoot } from 'app/goal';
import { GoalAddButtonComponent } from 'app/goal/goal-add-button/goal-add-button.component';
import { GoalSelectComponent } from 'app/goal/goal-select/goal-select.component';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { CustomDirectiveModule } from 'app/pratik/directive/directive.module';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { CashService } from 'app/my-assets/cash/cash.service';
import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
import { PropertyService } from 'app/my-assets/property/property.service';
import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { GoalResolveService } from 'app/goal/goal-select/goal-selectResolve.service';
library.add(fas, far);

@NgModule({
    imports: [
        RouterModule.forRoot([goalAddRoute], { useHash: true }),
        RouterModule.forRoot([goalSelectRoute], { useHash: true }),
        // BsDatepickerModule.forRoot(),
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        NgbModule,
        MatDialogModule,
        CustomDirectiveModule,
        FontAwesomeModule
    ],
    declarations: [
        GoalComponent,
        GoalAddButtonComponent,
        GoalSelectComponent
        // GoalSelectComponent,
        // GoalAddComponent
    ],
    entryComponents: [GoalSelectComponent],
    providers: [
        GoalselectService,
        StockService,
        FutureOptionService,
        NgbActiveModal,
        PropertyService,
        MutualfundService,
        SavingSchemeService,
        AlternateService,
        CashService,
        ChitFundService,
        GoalResolveService
    ]
})
export class GoalModule {}
