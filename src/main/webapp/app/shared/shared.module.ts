import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import {
    BuckswiseFrontEndSharedLibsModule,
    BuckswiseFrontEndSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from 'app/shared';
import { CustomMaterialModule } from 'app/custom-material.module';

@NgModule({
    imports: [BuckswiseFrontEndSharedLibsModule, BuckswiseFrontEndSharedCommonModule, CustomMaterialModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [BuckswiseFrontEndSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndSharedModule {}
