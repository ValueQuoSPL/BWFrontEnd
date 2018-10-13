import { NgModule } from '@angular/core';

import { BuckswiseFrontEndSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BuckswiseFrontEndSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BuckswiseFrontEndSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BuckswiseFrontEndSharedCommonModule {}
