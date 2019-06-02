import { advisorRoot } from './advisor.route';
import { RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [RouterModule.forRoot([advisorRoot])],
    declarations: [AdvisorComponent],
    providers: []
})
export class AdvisorModule {}
