import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material.module';
import {
  PromoCodeComponent,
  PromoCodeService,
  PromoCodeModalService
} from './';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CustomMaterialModule,
    FormsModule,
    CommonModule
  ],
  declarations: [PromoCodeComponent],
  providers: [PromoCodeService, PromoCodeModalService],
  entryComponents: [PromoCodeComponent],
  exports: [PromoCodeComponent, FormsModule, CommonModule, NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromoCodeModule {}
