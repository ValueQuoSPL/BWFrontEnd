import { Component, OnInit } from '@angular/core';
import { SystemMaintenanceService } from './system-maintanence.service';

@Component({
    selector: 'jhi-system-maintenance',
    templateUrl: './system-maintenance.component.html',
    styles: []
})
export class SystemMaintenanceComponent implements OnInit {
    constructor(private _systemmaintenance: SystemMaintenanceService) {}

    ngOnInit() {}

    Upload() {
        this._systemmaintenance.uploadExcel().subscribe();
    }

    Edit() {
        this._systemmaintenance.editNavTable().subscribe();
    }
}
