import { JhiEventManager } from 'ng-jhipster';
import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import './vendor.ts';
import * as moment from 'moment';
import { BuckswiseFrontEndCoreModule } from 'app/core';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { BuckswiseFrontEndHomeModule } from './home/home.module';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { BuckswiseFrontEndEntityModule } from './entities/entity.module';
import { BuckswiseFrontEndAppRoutingModule } from './app-routing.module';
import { BuckswiseFrontEndAccountModule } from './account/account.module';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';

// jhipster-needle-angular-add-module-import JHipster will add new module here
// Downloaded Package Module
import { DeviceDetectorModule } from 'ngx-device-detector';

// Production module
import { FamilyModule } from './family/family.module';
import { PromoCodeModule } from './home/subscriber/promo-code';
import { CustomMaterialModule } from './custom-material.module';
import { WINDOW_PROVIDERS } from './layouts/navbar/window.service';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SubscriberModule } from './home/subscriber/subscriber.module';
import { BuckswiseFrontEndPratikModule } from './pratik/pratik.module';
import { BuckswiseFrontEndRiskModule } from './risk/risk.module';
import { GoalModule } from './goal/goal.module';
import { BuckswiseFrontEndMyAssetsModule } from './my-assets/my-assets.module';
import { AppointmentModule } from './appointment/appointment.module';
import { BuckswiseAppSheetalModule } from './sheetal/sheetal.module';
import { SuccessComponent } from './success/success.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        BuckswiseFrontEndAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        DeviceDetectorModule.forRoot(),
        BuckswiseFrontEndSharedModule,
        BuckswiseFrontEndCoreModule,
        BuckswiseFrontEndHomeModule,
        BuckswiseFrontEndAccountModule,
        BuckswiseFrontEndEntityModule,
        CustomMaterialModule,
        AppointmentModule,
        SubscriberModule,
        PromoCodeModule,
        FamilyModule,
        GoalModule,
        BuckswiseAppSheetalModule,
        BuckswiseFrontEndRiskModule,
        BuckswiseFrontEndPratikModule,
        BuckswiseFrontEndMyAssetsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        SidebarComponent,
        SuccessComponent,
        ActiveMenuDirective
    ],
    providers: [
        WINDOW_PROVIDERS,
        SidebarComponent,
        NavbarComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class BuckswiseFrontEndAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
