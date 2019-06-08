import { advisorRoot } from './advisor.route';
import { RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'app/custom-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [RouterModule.forRoot([advisorRoot]), CustomMaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
    declarations: [AdvisorComponent],
    providers: []
})
export class AdvisorModule {}
