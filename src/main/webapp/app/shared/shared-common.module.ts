import { NgModule } from '@angular/core';

import { BuckswiseFrontEndSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from 'app/shared';

@NgModule({
    imports: [BuckswiseFrontEndSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BuckswiseFrontEndSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BuckswiseFrontEndSharedCommonModule {}
