import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuckswiseFrontEndSharedModule } from 'app/shared';

import { HOME_ROUTE, HomeComponent } from 'app/home';
import { HeaderComponent } from 'app/home/header/header.component';
import { BannerComponent } from 'app/home/banner/banner.component';
import { MainBodyComponent } from 'app/home/main-body/main-body.component';
import { IntroComponent } from 'app/home/intro/intro.component';
import { ServicesComponent } from 'app/home/services/services.component';
import { SubscriptionComponent } from 'app/home/subscription/subscription.component';
import { ReferComponent } from 'app/home/refer/refer.component';
import { HowDoWeDoItComponent } from 'app/home/how-do-we-do-it/how-do-we-do-it.component';
import { PartnersComponent } from 'app/home/partners/partners.component';
import { SubscriptionModule } from 'app/home/subscription/subscribe.module';
import { SubscriberModule } from 'app/home/subscriber/subscriber.module';

@NgModule({
    imports: [
        BuckswiseFrontEndSharedModule,
        SubscriptionModule,
        SubscriberModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        BannerComponent,
        MainBodyComponent,
        IntroComponent,
        ServicesComponent,
        SubscriptionComponent,
        ReferComponent,
        HowDoWeDoItComponent,
        PartnersComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseFrontEndHomeModule {}
