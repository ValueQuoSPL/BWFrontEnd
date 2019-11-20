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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { advisorview } from './advisor.route';

@NgModule({
    imports: [FormsModule, CommonModule, CustomMaterialModule, FontAwesomeModule, RouterModule.forChild([advisorview])],
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
