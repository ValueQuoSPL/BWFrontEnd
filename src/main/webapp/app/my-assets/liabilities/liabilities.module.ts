import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomMaterialModule } from 'app/custom-material.module';
import { LiabilitiesComponent } from 'app/my-assets/liabilities/liabilities.component';
import { liRoute } from 'app/my-assets/liabilities/liabilities.route';
// import { CustomDirectiveModule } from '../pratik/directive/directive.module';
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
        RouterModule.forChild([liRoute]),
        CustomMaterialModule,
        CommonModule,
        // CustomDirectiveModule,
        NgbModule
    ],
    declarations: [LiabilitiesComponent],
    providers: [NgbActiveModal],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiabilitiesModule {}
