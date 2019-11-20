import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskService } from 'app/risk/risk.service';

import {
    LifeInsuranceComponent,
    MedicalInsuranceComponent,
    QuestionnaireComponent,
    lifeRoute,
    medicalRoute,
    questionnaireRoute,
    riskRoute
} from 'app/risk';
import { CustomMaterialModule } from 'app/custom-material.module';
import { RiskComponent } from 'app/risk/risk.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BuckswiseFrontEndSharedModule, RouterModule.forChild([riskRoute]), CustomMaterialModule, FormsModule],
    declarations: [LifeInsuranceComponent, MedicalInsuranceComponent, QuestionnaireComponent, RiskComponent],
    providers: [NgbActiveModal, RiskService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndRiskModule {}
