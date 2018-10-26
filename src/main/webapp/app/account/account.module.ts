import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { UserMgmtComponent } from 'app/admin';

import {
    Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService,
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';
import { CustomMaterialModule } from 'app/custom-material.module';
import { MobileOtpComponent } from './mobile-otp/mobile-otp.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { CustomDirectiveModule } from 'app/pratik/directive/directive.module';
import { MyloginService } from 'app/account/mobile-otp/mylogin.service';
import { UserService } from 'app/core';

@NgModule({
    imports: [
        BuckswiseFrontEndSharedModule,
        RouterModule.forChild(accountState),
        RecaptchaModule.forRoot(),
        CustomMaterialModule,
        RecaptchaFormsModule,
        CustomDirectiveModule
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        MobileOtpComponent
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService,
        UserMgmtComponent,
        UserService,
        MyloginService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: '6Lca-nUUAAAAAJyHWjKfB8YhUUFa98MhgY1qs1WR'
            } as RecaptchaSettings
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAccountModule {}
