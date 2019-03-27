import { Component, OnInit } from '@angular/core';
import { SystemMaintenanceService } from './system-maintanence.service';

@Component({
    selector: 'jhi-system-maintenance',
    templateUrl: './system-maintenance.component.html',
    styles: []
})
export class SystemMaintenanceComponent implements OnInit {
    selectedFile: File;
    upload: any;
    constructor(private _systemmaintenance: SystemMaintenanceService) {}

    ngOnInit() {}

    Upload() {
        if (confirm('Are you sure want to Update NAV in Database')) {
            this.upload = 'ok';
            if (this.upload === 'ok') {
                console.log('u press ok');
                this._systemmaintenance.uploadExcel().subscribe();
            }
        } else {
            this.upload = 'Cancel';
        }
    }

    Edit() {
        if (confirm('Edit NAV table AMC code')) {
            this.upload = 'ok';
            if (this.upload === 'ok') {
                console.log('u press ok');
                this._systemmaintenance.editNavTable().subscribe();
            }
        } else {
            this.upload = 'Cancel';
        }
    }

    onFileSelected(event) {
        console.log(event.target.files[0]);
        this.selectedFile = null;
        this.selectedFile = event.target.files[0];
        if (confirm('Are you sure want to upload file')) {
            this.upload = 'ok';
            if (this.upload === 'ok') {
                console.log('u press ok');
                this.onFileUpload();
            }
        } else {
            this.upload = 'Cancel';
        }
    }

    onFileUpload() {
        if (this.selectedFile) {
            this._systemmaintenance.fileUpload(this.selectedFile).subscribe();
        } else {
        }
    }
}
