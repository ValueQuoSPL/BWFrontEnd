import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { myasstsRoute } from 'app/my-assets/my-assets.route';
import { CustomMaterialModule } from 'app/custom-material.module';
import { LiabilitiesComponent } from 'app/my-assets/liabilities/liabilities.component';
import { liRoute } from 'app/my-assets/liabilities/liabilities.route';
import { StockComponent } from 'app/my-assets/stocks/stocks.component';
import { PropertyComponent } from 'app/my-assets/property/property.component';
import { SavingSchemeComponent } from 'app/my-assets/saving-scheme/savingscheme.component';
import { FutureOptionComponent } from 'app/my-assets/future-option/futureoption.component';
import { ChitFundComponent } from 'app/my-assets/chit-funds/chitfund.component';
import { CashComponent } from 'app/my-assets/cash/cash.component';
import { AlternativeComponent } from 'app/my-assets/alternate-investment/alternateinvest.component';
import { MyAssetsComponent } from 'app/my-assets/my-assets.component';
import { MutualComponent } from 'app/my-assets/mutual/mutual.component';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { CashService } from 'app/my-assets/cash/cash.service';
import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
import { PropertyService } from 'app/my-assets/property/property.service';
import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { CustomDirectiveModule } from '../pratik/directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BuckswiseFrontEndSharedModule,
        RouterModule.forRoot([myasstsRoute], { useHash: true }),
        RouterModule.forRoot([liRoute], { useHash: true }),
        CustomMaterialModule,
        CommonModule,
        CustomDirectiveModule,
        NgbModule
    ],
    declarations: [
        MutualComponent,
        LiabilitiesComponent,
        AlternativeComponent,
        CashComponent,
        ChitFundComponent,
        FutureOptionComponent,
        PropertyComponent,
        SavingSchemeComponent,
        StockComponent,
        MyAssetsComponent
    ],
    providers: [
        StockService,
        FutureOptionService,
        NgbActiveModal,
        PropertyService,
        MutualfundService,
        SavingSchemeService,
        AlternateService,
        CashService,
        ChitFundService,
        StockComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndMyAssetsModule {}
