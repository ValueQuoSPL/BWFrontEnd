import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from 'app/pratik/dashboard/dashboard.routes';
import { DashboardComponent } from 'app/pratik/dashboard/dashboard.component';
import { DraggableModule } from '../draggable/draggable.module';
import { CustomMaterialModule } from 'app/custom-material.module';
import { ChartsModule } from 'ng2-charts';
// import { myasstsRoute } from 'app/my-assets/my-assets.route';
// import { liRoute } from 'app/my-assets/liabilities/liabilities.route';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    DraggableModule,
    CustomMaterialModule,
    ChartsModule,
    // RouterModule.forRoot([myasstsRoute], { useHash: true }),
    // RouterModule.forRoot([liRoute], { useHash: true }),
    NgbDropdownModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 60,
      space: -10,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      toFixed: 0,
      animateTitle: true,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      clockwise: true,
      startFromZero: true
    })
  ],
  exports: [],
  providers: [],
  declarations: [DashboardComponent]
})
export class DashBoardModule {}

// 'radius';: 60,
// 'space'; : -10,
// 'outerStrokeWidth'; : 10,
// 'outerStrokeColor'; : '#4882c2',
// 'innerStrokeColor'; : '#e7e8ea',
// 'innerStrokeWidth'; : 10,
// 'title'; : 'UI',
// 'animateTitle'; : false,
// 'animationDuration'; : 1000,
// 'showUnits'; : false,
// 'showBackground'; : false,
// 'startFromZero'; : false;
