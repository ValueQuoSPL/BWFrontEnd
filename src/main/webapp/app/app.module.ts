import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { BuckswiseFrontEndCoreModule } from 'app/core';
import { BuckswiseFrontEndAppRoutingModule } from './app-routing.module';
import { BuckswiseFrontEndHomeModule } from './home/home.module';
import { BuckswiseFrontEndAccountModule } from './account/account.module';
import { BuckswiseFrontEndEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { CustomMaterialModule } from './custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { WINDOW_PROVIDERS } from './layouts/navbar/window.service';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { SubscriberModule } from './home/subscriber/subscriber.module';
import { PromoCodeModule } from './home/subscriber/promo-code';
import { BuckswiseFrontEndPratikModule } from './pratik/pratik.module';

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
        SubscriberModule,
        PromoCodeModule,
        BuckswiseFrontEndPratikModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent,
    SidebarComponent],
    providers: [
        WINDOW_PROVIDERS,
        SidebarComponent,
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
