import { taxfileRoute } from '../TaxFiling/taxfiling.route';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { TaxFilingComponent } from './taxfiling.component';
import { MatInputModule } from '@angular/material';

@NgModule({
    imports: [FormsModule, MatInputModule, RouterModule.forRoot([taxfileRoute], { useHash: true })],
    declarations: [TaxFilingComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaxFilingModule {}
