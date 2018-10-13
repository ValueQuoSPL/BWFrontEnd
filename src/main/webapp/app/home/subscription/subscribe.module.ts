import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SubscriptionComponent } from './subscription.component';
// import { BsDatepickeModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { subscribeRoute } from 'app/home/subscription/subscribe.route';

@NgModule({
  imports: [
    RouterModule.forRoot([subscribeRoute], { useHash: true }),
    FormsModule,
    CommonModule
    // BsDatepickerModule.forRoot()
  ],
  declarations: [
    // SubscriptionComponent
  ],
  entryComponents: [],
  providers: []
})
export class SubscriptionModule {}
