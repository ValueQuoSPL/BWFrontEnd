import './vendor.ts';
import * as moment from 'moment';

// From Inbuilt Angular Package
import { JhiEventManager } from 'ng-jhipster';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// From Inbuilt jhipster created Modules
import { BuckswiseFrontEndCoreModule } from 'app/core';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { BuckswiseFrontEndHomeModule } from 'app/home/home.module';
import { AuthInterceptor } from 'app/blocks/interceptor/auth.interceptor';
import { BuckswiseFrontEndEntityModule } from 'app/entities/entity.module';
import { BuckswiseFrontEndAppRoutingModule } from 'app/app-routing.module';
import { BuckswiseFrontEndAccountModule } from 'app/account/account.module';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';

// From Inbuilt Component
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from 'app/layouts';

// From Downloaded Package
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

// From Production module
import { CustomMaterialModule } from 'app/custom-material.module';
import { CustomDirectiveModule } from 'app/pratik/directive/directive.module';
import { DraggableModule } from 'app/pratik/draggable/draggable.module';

import { FamilyModule } from 'app/family/family.module';
import { PromoCodeModule } from 'app/home/subscriber/promo-code';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { SubscriberModule } from 'app/home/subscriber/subscriber.module';
import { BuckswiseFrontEndRiskModule } from 'app/risk/risk.module';
import { GoalModule } from 'app/goal/goal.module';
import { BuckswiseFrontEndMyAssetsModule } from 'app/my-assets/my-assets.module';
import { AppointmentModule } from 'app/appointment/appointment.module';
import { BuckswiseAppSheetalModule } from 'app/sheetal/sheetal.module';

// From Production Component
import { SuccessComponent } from 'app/success/success.component';
import { IncomeComponent } from 'app/pratik/income/income.component';
import { UtilityComponent } from 'app/pratik/spending/utility/utility.component';
import { HouseholdComponent } from 'app/pratik/spending/household/household.component';
import { LoanComponent } from 'app/pratik/spending/loan/loan.component';
import { CreditComponent } from 'app/pratik/spending/credit/credit.component';
import { TravelComponent } from 'app/pratik/spending/travel/travel.component';
import { MiscComponent } from 'app/pratik/spending/misc/misc.component';
import { LifeComponent } from 'app/pratik/spending/life/life.component';
import { GeneralComponent } from 'app/pratik/spending/general/general.component';
import { HealthComponent } from 'app/pratik/spending/health/health.component';
import { DashboardComponent } from 'app/pratik/dashboard/dashboard.component';

// From Production Services
import { WINDOW_PROVIDERS } from 'app/layouts/navbar/window.service';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import {
    IncomeService,
    UtilityService,
    HouseService,
    TravelService,
    MiscService,
    LoanService,
    LifeService,
    HealthService,
    GeneralService,
    CreditService
} from 'app/pratik/spending/spending.service';
// From Production Directive
import { ActiveMenuDirective } from 'app/layouts/navbar/active-menu.directive';

// From Production Routes
import { pratikState, SpendingComponent, CanDeactivateGuard, SubscriptionComponent } from 'app/pratik';
import { DashRoute } from 'app/pratik/dashboard/dashboard.routes';
import { advisorRoot } from 'app/advisor/advisor.route';
import { AdvisorComponent } from 'app/advisor/advisor.component';
import { AdvisorFilterPipe } from 'app/advisor/advisor-filter.pipe';
import { successRoute } from 'app/success/success.route';
import { appointRoot } from 'app/appointment';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        BuckswiseFrontEndAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        DeviceDetectorModule.forRoot(),
        RouterModule.forChild(pratikState),
        RouterModule.forRoot([DashRoute], { useHash: true }),
        RouterModule.forRoot([advisorRoot], { useHash: true }),
        RouterModule.forRoot([successRoute], { useHash: true }),
        RouterModule.forRoot([appointRoot], { useHash: true }),
        BuckswiseFrontEndSharedModule,
        BuckswiseFrontEndCoreModule,
        BuckswiseFrontEndHomeModule,
        BuckswiseFrontEndAccountModule,
        BuckswiseFrontEndEntityModule,
        FontAwesomeModule,
        NgbDropdownModule.forRoot(),
        ChartsModule,
        NgCircleProgressModule.forRoot({
            radius: 60,
            space: -10,
            outerStrokeWidth: 10,
            outerStrokeColor: '#4882c2',
            innerStrokeColor: '#e7e8ea',
            innerStrokeWidth: 10,
            toFixed: 0,
            animateTitle: true,
            animationDuration: 1000,
            showUnits: false,
            showBackground: false,
            clockwise: true,
            startFromZero: true
        }),
        // production module
        DraggableModule,
        CustomDirectiveModule,
        CustomMaterialModule,
        AppointmentModule,
        SubscriberModule,
        PromoCodeModule,
        FamilyModule,
        GoalModule,
        BuckswiseAppSheetalModule,
        BuckswiseFrontEndRiskModule,
        BuckswiseFrontEndMyAssetsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        DashboardComponent,
        AdvisorComponent,
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        ActiveMenuDirective,
        // Production Component
        SidebarComponent,
        SuccessComponent,
        SpendingComponent,
        IncomeComponent,
        UtilityComponent,
        HouseholdComponent,
        LoanComponent,
        CreditComponent,
        TravelComponent,
        MiscComponent,
        LifeComponent,
        HealthComponent,
        GeneralComponent,
        AdvisorFilterPipe,
        SubscriptionComponent
        // Production directive
    ],
    providers: [
        NavbarComponent,
        // Production Services
        CanDeactivateGuard,
        IncomeService,
        UtilityService,
        HouseService,
        TravelService,
        MiscService,
        LoanService,
        LifeService,
        HealthService,
        GeneralService,
        CreditService,
        CommonSidebarService,
        SpendingRouteGuardService,
        WINDOW_PROVIDERS,
        SidebarComponent,
        SpendingComponent,
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
    entryComponents: [SpendingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [JhiMainComponent]
})
export class BuckswiseFrontEndAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
