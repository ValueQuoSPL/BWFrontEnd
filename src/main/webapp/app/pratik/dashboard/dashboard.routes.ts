import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';

const DashRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(DashRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule {}
