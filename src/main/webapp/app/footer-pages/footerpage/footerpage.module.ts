import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { termRoute } from './terms-condition/terms-condition.route';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { privacyRoute } from './privacy-policy/privacy-policy.route';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { cookieRoute } from './cookie-policy/cookie-policy.route';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([termRoute], { useHash: true }),
        RouterModule.forRoot([privacyRoute], { useHash: true }),
        RouterModule.forRoot([cookieRoute], { useHash: true })
    ],
    declarations: [TermsConditionComponent, PrivacyPolicyComponent, CookiePolicyComponent]
})
export class FooterpageModule {}
