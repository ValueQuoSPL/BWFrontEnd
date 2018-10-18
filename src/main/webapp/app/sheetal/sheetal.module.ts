import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { CustomMaterialModule } from 'app/custom-material.module';
import { MatInputModule } from '@angular/material';
import { SheetalComponent } from '.././sheetal/sheetal.component';

import {
  MainComponent,
  mainRoute,
  RequestmeetingComponent,
  meetRoute,
  taxRoute
} from 'app/sheetal';
import { FormsModule } from '@angular/forms';
import { MeetService } from 'app/sheetal/requestmeeting/meet.service';
import { AdviceComponent } from './advice/advice.component';
import { BuckswiseTaxModule } from './tax/tax.module';
import { BuckswiseContactModule } from './contactus/contact.module';

@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    CustomMaterialModule,
    MatInputModule,
    BuckswiseTaxModule,
    BuckswiseContactModule
  ],
  declarations: [
    MainComponent,
    RequestmeetingComponent,
    AdviceComponent,
    SheetalComponent
  ],
  providers: [MeetService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseAppSheetalModule {}
