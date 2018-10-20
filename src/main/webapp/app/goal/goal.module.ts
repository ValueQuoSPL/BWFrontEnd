import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuckswiseFrontEndSharedModule } from '../shared';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { goalSelectRoute } from './goal-select/goal-select.route';
//  import { GoalComponent, goalRoot } from './';
// import { GoalSelectComponent } from './Goal-select/goalselect.component';
// import { GoalAddComponent } from './Goal-AddButton/goalAddButton.component';
import { GoalselectService } from './goal-select/goalselect.service';
import { CustomMaterialModule } from '../custom-material.module';
import { GoalComponent, goalRoot } from './';
import { GoalAddButtonComponent } from './goal-add-button/goal-add-button.component';
import { GoalSelectComponent } from './goal-select/goal-select.component';
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

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

@NgModule({
    imports: [
        // RouterModule.forRoot([goalRoot], { useHash: true }),
        RouterModule.forRoot([goalSelectRoute], { useHash: true }),
        // BsDatepickerModule.forRoot(),
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        NgbModule,
        MatDialogModule,
        CustomDirectiveModule
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
        ChitFundService
    ]
})
export class GoalModule {}
