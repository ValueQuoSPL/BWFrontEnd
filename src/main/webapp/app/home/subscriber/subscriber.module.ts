import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriberComponent } from 'app/home/subscriber/subscriber.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { subscriberRoute } from 'app/home/subscriber/subscriber.route';
import { PaymentComponent, PaymentService } from 'app/home/subscriber';
import { CustomMaterialModule } from '../../custom-material.module';
import { UserPlanService } from './userplan.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PromoCodeService, PromoCodeModalService, PromoCodeComponent } from './promo-code';
import { payRoute } from './payment/payment.route';
// import { FooterComponent } from '../layouts';
@NgModule({
    imports: [
        RouterModule.forRoot([subscriberRoute, payRoute], { useHash: true }),
        FormsModule,
        CommonModule,
        CustomMaterialModule
        // BsDatepickerModule.forRoot()
    ],
    declarations: [
        SubscriberComponent,
        // FooterComponent
        PaymentComponent
    ],
    entryComponents: [PromoCodeComponent],
    providers: [PaymentService, UserPlanService, NgbActiveModal],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscriberModule {}
