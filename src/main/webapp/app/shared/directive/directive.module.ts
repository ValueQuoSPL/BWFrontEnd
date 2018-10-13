import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from 'app/shared/directive/number-only.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    NumberOnlyDirective
  ],
  exports: [
    NumberOnlyDirective
  ],
  providers: [
  ]
})
export class CustomDirectiveModule { }
