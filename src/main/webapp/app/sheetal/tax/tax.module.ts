import { Home } from 'app/sheetal/main/Services/home.model';
import { GrossComponent } from './gross/gross.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { CustomMaterialModule } from 'app/custom-material.module';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EightycComponent } from './eightyc/eightyc.component';
import { EightycService } from './eightyc/eightyc.service';
import { GrossService } from './gross/gross.service';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { EightydComponent } from './eightyd/eightyd.component';
import { EightydService } from './eightyd/eightyd.service';
import { OtherComponent } from './other/other.component';
import { OtherService } from './other/other.service';
import { TaxComponent } from './tax.component';
import { taxRoute } from './tax.route';
@NgModule({
  imports: [
    FormsModule,
    BuckswiseFrontEndSharedModule,
    RouterModule.forRoot([taxRoute], { useHash: true }),
    CustomMaterialModule,
    MatInputModule
  ],
  declarations: [
    TaxComponent,
    GrossComponent,
    EightycComponent,
    HomeComponent,
    EightydComponent,
    OtherComponent
  ],
  providers: [
    GrossService,
    EightycService,
    HomeService,
    EightydService,
    OtherService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseTaxModule {}
