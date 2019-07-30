import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'app/custom-material.module';
import { CurrentportfolioComponent } from './currentportfolio/currentportfolio.component';
import { GoalanalysisComponent } from './goalanalysis/goalanalysis.component';
import { InsuranceanalysisComponent } from './insuranceanalysis/insuranceanalysis.component';
import { TaxanalysisComponent } from './taxanalysis/taxanalysis.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { AdvisorViewComponent } from './advisorview.component';

@NgModule({
    imports: [FormsModule, CommonModule, CustomMaterialModule],
    declarations: [
        CurrentportfolioComponent,
        GoalanalysisComponent,
        InsuranceanalysisComponent,
        TaxanalysisComponent,
        RecommendationComponent,
        AdvisorViewComponent
    ],
    entryComponents: [RecommendationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class AdvisorViewModule {}
