import { mainRoute } from './sheetal/main/main.route';
import { AdvisorViewComponent } from 'app/advisorview/advisorview.component';
import { advisorview } from './advisorview/advisor.route';
import './vendor.ts';
import * as moment from 'moment';

// From Inbuilt Angular Package
import { JhiEventManager } from 'ng-jhipster';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ChangeDetectorRef } from '@angular/core';
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
import { FooterpageModule } from './footer-pages/footerpage/footerpage.module';
import { TaxFilingModule } from './TaxFiling/taxfiling.module';

// From Inbuilt Component
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    PageRibbonComponent,
    ErrorComponent,
    SessionTimeoutComponent,
    IdleAlertComponent,
    navbarRoute
} from 'app/layouts';

// From Downloaded Package
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

// From Production module
import { CustomMaterialModule } from 'app/custom-material.module';
import { CustomDirectiveModule } from 'app/pratik/directive/directive.module';
import { DraggableModule } from 'app/pratik/draggable/draggable.module';

// import { FamilyModule } from 'app/family/family.module';
import { PromoCodeModule } from 'app/home/subscriber/promo-code';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { SubscriberModule } from 'app/home/subscriber/subscriber.module';
// import { BuckswiseFrontEndRiskModule } from 'app/risk/risk.module';
import { GoalModule } from 'app/goal/goal.module';
// import { BuckswiseFrontEndMyAssetsModule } from 'app/my-assets/my-assets.module';
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
import { AdvisorFilterPipe } from 'app/advisor/advisor-filter.pipe';
import { successRoute } from 'app/success/success.route';
import { appointRoot } from 'app/appointment';
import { CookieService } from 'ngx-cookie-service';
import { UserIdleModule } from 'angular-user-idle';
import { privacyRoute } from './footer-pages/footerpage/privacy-policy/privacy-policy.route';
import { cookieRoute } from './footer-pages/footerpage/cookie-policy/cookie-policy.route';
import { termRoute } from './footer-pages/footerpage/terms-condition/terms-condition.route';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { failRoute } from './fail-payment/fail-payment.route';
import { NotificationComponent } from './pratik/notification/notification.component';
import { DocumentComponent } from './document/document.component';
import { MutualFundManageComponent } from './pratik/mutual-fund-manage/mutual-fund-manage.component';
import { AuthGuard } from './auth.guard';
import { TaxService } from './TaxFiling/tax-filing.service';
import { AdvisorModule } from './advisor/advisor.module';
// import { AdvisorViewModule } from './advisorview/advisorview.module';
import { AdviceModule } from './advice/advice.module';
import { MyprofileService } from './family/myprofile/myprofile.service';
import { FamilyprofileService } from './family/familyprofile/familyprofile.service';
import { FamilyserviceService } from './family/familyservice.service';
import { AccountProfileSerivce } from './family/accountprofile/accountProfile.service';

// jhipster-needle-angular-add-module-import JHipster will add new module here

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 3000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        //  CommonModule,
        BuckswiseFrontEndAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        DeviceDetectorModule.forRoot(),
        FooterpageModule,
        TaxFilingModule,
        /* Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
        * Default values: `idle` is 600 (10 minutes),
        * `timeout` is 300 (5 minutes)
        * and `ping` is 120 (2 minutes). */
        UserIdleModule.forRoot({ idle: 300, timeout: 60, ping: 120 }),
        RouterModule.forChild(pratikState),
        RouterModule.forRoot([DashRoute], { useHash: true }),
        RouterModule.forRoot([advisorRoot], { useHash: true }),
        RouterModule.forRoot([successRoute], { useHash: true }),
        RouterModule.forRoot([failRoute], { useHash: true }),
        RouterModule.forRoot([termRoute], { useHash: true }),
        RouterModule.forRoot([privacyRoute], { useHash: true }),
        RouterModule.forRoot([cookieRoute], { useHash: true }),
        RouterModule.forRoot([navbarRoute], { useHash: true }),
        RouterModule.forRoot([mainRoute], { useHash: true }),
        BuckswiseFrontEndSharedModule,
        BuckswiseFrontEndCoreModule,
        BuckswiseFrontEndHomeModule,
        BuckswiseFrontEndAccountModule,
        BuckswiseFrontEndEntityModule,
        FontAwesomeModule,
        NgbDropdownModule.forRoot(),
        ChartsModule,
        NotifierModule.withConfig(customNotifierOptions),
        NgCircleProgressModule.forRoot({
            radius: 60,
            space: -10,
            outerStrokeWidth: 10,
            outerStrokeColor: '#4882c2',
            innerStrokeColor: '#e7e8ea',
            innerStrokeWidth: 10,
            toFixed: 0,
            animateTitle: true,
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
        AdvisorModule,
        SubscriberModule,
        PromoCodeModule,
        // FamilyModule,
        GoalModule,
        BuckswiseAppSheetalModule,
        // BuckswiseFrontEndRiskModule,
        // BuckswiseFrontEndMyAssetsModule,
        // AdvisorViewModule,
        AdviceModule

        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        DashboardComponent,
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        ActiveMenuDirective,
        DocumentComponent,
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
        SubscriptionComponent,
        FailPaymentComponent,
        NotificationComponent,
        IdleAlertComponent,
        SessionTimeoutComponent,
        MutualFundManageComponent
        // Production directive
    ],
    providers: [
        MyprofileService,
        FamilyprofileService,
        FamilyserviceService,
        AccountProfileSerivce,
        NavbarComponent,
        CookieService,
        AuthGuard,
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
        TaxService,
        JhiMainComponent,
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
    entryComponents: [SpendingComponent, IdleAlertComponent, SessionTimeoutComponent, DocumentComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [JhiMainComponent]
})
export class BuckswiseFrontEndAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
