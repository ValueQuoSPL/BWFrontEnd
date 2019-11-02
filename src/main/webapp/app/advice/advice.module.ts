import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdvicesComponent } from './advice.component';

@NgModule({
    declarations: [AdvicesComponent],
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class AdviceModule {}
