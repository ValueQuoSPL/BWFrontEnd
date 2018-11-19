import { NgModule } from '@angular/core';

import { BuckswiseFrontEndSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from 'app/shared';
import { CookieModule } from 'ngx-cookie';

@NgModule({
    imports: [BuckswiseFrontEndSharedLibsModule, CookieModule.forRoot()],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BuckswiseFrontEndSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BuckswiseFrontEndSharedCommonModule {}
