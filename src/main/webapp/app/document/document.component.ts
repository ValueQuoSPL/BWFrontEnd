import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LifeService } from 'app/pratik';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

export interface DialogData {
    tid: number;
    Type: string;
    name: string;
}

@Component({
    selector: 'jhi-document',
    templateUrl: './document.component.html',
    styles: []
})
export class DocumentComponent implements OnInit {
    selectedFile: File;
    responseUrl: any;
    driveLink: any;
    account: any = [];
    uid: any;
    fileResult: any = [];

    constructor(
        private lifeService: LifeService,
        private commonService: CommonSidebarService,
        private ref: ChangeDetectorRef,
        public dialogRef: MatDialogRef<DocumentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.getUserid();
    }

    ngOnInit() {
        // console.log(this.data.tid);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getUserid() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });
        this.getFilesData();
    }

    onFileSelected(event) {
        console.log(event.target.files[0]);
        this.selectedFile = null;
        this.selectedFile = event.target.files[0];
        this.onFileUpload();
    }

    onFileUpload() {
        if (this.selectedFile) {
            this.lifeService.uploadFile2(this.selectedFile, this.data.tid, this.uid, this.data.Type, this.data.name).subscribe(
                res => {
                    this.responseUrl = res;
                    if (this.responseUrl.body) {
                        this.driveLink = this.responseUrl.body.url;
                    }
                    setInterval(() => {
                        this.ref.detectChanges();
                        this.getFilesData();
                    }, 3000);
                },
                err => {
                    console.log('error', err);
                }
            );
        }
    }

    getFilesData() {
        this.lifeService.getFile(this.uid).subscribe(data => {
            this.fileResult = data.filter(data1 => {
                return data1.type === this.data.Type;
            });
        });
    }

    delete(id) {
        this.lifeService.deleteFile(id).subscribe(data => {
            this.getFilesData();
        });
    }
}
