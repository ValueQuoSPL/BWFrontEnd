import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from 'app/pratik/directive/number-only.directive';
import { CharsOnlyDirective } from './chars-only.directive';

@NgModule({
    imports: [CommonModule, BrowserModule],
    declarations: [NumberOnlyDirective, CharsOnlyDirective],
    exports: [NumberOnlyDirective, CharsOnlyDirective],
    providers: []
})
export class CustomDirectiveModule {}
