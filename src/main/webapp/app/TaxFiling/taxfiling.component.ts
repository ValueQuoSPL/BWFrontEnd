import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { DocumentComponent } from 'app/document/document.component';
import { TaxService } from './tax-filing.service';

@Component({
    selector: 'jhi-taxfiling',
    templateUrl: './taxfiling.component.html',
    styleUrls: ['./taxfiling.component.css']
})
export class TaxFilingComponent implements OnInit {
    selectedFile: File;
    constructor(private dialog: MatDialog, private _taxService: TaxService) {}

    // openDialog(id, type): void {
    //     console.log(type);
    //     const dialogRef = this.dialog.open(DocumentComponent, {
    //         data: { tid: id, Type: type }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {});
    // }

    onFileSelected(event) {
        console.log(event.target.files[0]);
        this.selectedFile = null;
        this.selectedFile = event.target.files[0];
        this.onFileUpload();
    }

    onFileUpload() {
        if (this.selectedFile) {
            this._taxService.uploadFile(this.selectedFile).subscribe();
        }
    }
    ngOnInit() {}
}
