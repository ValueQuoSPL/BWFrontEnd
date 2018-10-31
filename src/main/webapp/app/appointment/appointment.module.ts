import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/Timepicker';
import { CustomMaterialModule } from 'app/custom-material.module';
import { DraggableModule } from 'app/pratik/draggable/draggable.module';
import { AppointmentComponent, appointRoot } from 'app/appointment';
import { CommonModule } from '@angular/common';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentResolverService } from 'app/appointment/appointment-resolver.service';

@NgModule({
    imports: [
        RouterModule.forRoot([appointRoot], { useHash: true }),
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        // DraggableModule,
        // FlatpickrModule.forRoot(),
        // BsDatepickerModule.forRoot(),
        NgbModalModule,
        TimepickerModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    declarations: [AppointmentComponent],
    entryComponents: [],
    providers: [AppointmentResolverService]
})
export class AppointmentModule {}
