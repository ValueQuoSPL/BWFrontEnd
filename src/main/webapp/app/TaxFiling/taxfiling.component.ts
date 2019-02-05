import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { DocumentComponent } from 'app/document/document.component';

@Component({
    selector: 'jhi-taxfiling',
    templateUrl: './taxfiling.component.html',
    styleUrls: ['./taxfiling.component.css']
})
export class TaxFilingComponent implements OnInit {
    constructor(private dialog: MatDialog) {}

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }

    ngOnInit() {}
}
