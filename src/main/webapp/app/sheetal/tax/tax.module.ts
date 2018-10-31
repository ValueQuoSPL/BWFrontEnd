import { Home } from 'app/sheetal/main/Services/home.model';
import { GrossComponent } from 'app/sheetal/tax/gross/gross.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuckswiseFrontEndSharedModule } from 'app/shared';
import { CustomMaterialModule } from 'app/custom-material.module';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EightycComponent } from 'app/sheetal/tax/eightyc/eightyc.component';
import { EightycService } from 'app/sheetal/tax/eightyc/eightyc.service';
import { GrossService } from 'app/sheetal/tax/gross/gross.service';
import { HomeComponent } from 'app/sheetal/tax/home/home.component';
import { HomeService } from 'app/sheetal/tax/home/home.service';
import { EightydComponent } from 'app/sheetal/tax/eightyd/eightyd.component';
import { EightydService } from 'app/sheetal/tax/eightyd/eightyd.service';
import { OtherComponent } from 'app/sheetal/tax/other/other.component';
import { OtherService } from 'app/sheetal/tax/other/other.service';
import { TaxComponent } from 'app/sheetal/tax/tax.component';
import { taxRoute } from 'app/sheetal/tax/tax.route';
@NgModule({
    imports: [
        FormsModule,
        BuckswiseFrontEndSharedModule,
        RouterModule.forRoot([taxRoute], { useHash: true }),
        CustomMaterialModule,
        MatInputModule
    ],
    declarations: [TaxComponent, GrossComponent, EightycComponent, HomeComponent, EightydComponent, OtherComponent],
    providers: [GrossService, EightycService, HomeService, EightydService, OtherService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuckswiseTaxModule {}
