import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuckswiseFrontEndSharedModule } from 'app/shared';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState,
} from './';
import { Register } from './register/register.service';
import { CustomMaterialModule } from 'app/custom-material.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { MobileOtpComponent } from './mobile-otp/mobile-otp.component';

@NgModule({
    imports: [BuckswiseFrontEndSharedModule, RouterModule.forChild(accountState),
        RecaptchaModule.forRoot(), CustomMaterialModule,
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
    providers: [Register],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndAccountModule {}
