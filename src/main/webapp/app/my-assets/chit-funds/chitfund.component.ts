import { Component, OnInit } from '@angular/core';
import { ChitFund } from './chitfund.modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChitFundService } from './chitfund.service';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
import { DocumentComponent } from 'app/document/document.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-chitfund',
    templateUrl: './chitfund.component.html',
    styles: []
})
export class ChitFundComponent implements OnInit {
    user: any;
    closeResult: string;
    commonid: number;
    conformkey: boolean;
    uid: any;
    getdata: any;
    chitfundDetails: any;
    chitfund: ChitFund = new ChitFund();
    isSaving;
    account: any;

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public chitfundService: ChitFundService,
        public commonService: CommonSidebarService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.FetchId();
    }
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.chitfund.userid = this.account.id;
            this.getChitByuid(this.uid);
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    openChit(content) {
        this.resetFieldValue();
        this.modalService.open(content, { ariaLabelledBy: 'chitModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.saveChit();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditchit(editChitModal, id) {
        this.commonid = id;
        this.getChitById(this.commonid);
        this.modalService.open(editChitModal, { ariaLabelledBy: 'editChitModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commonid);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    getChitById(commonid) {
        this.chitfundService.getChitById(this.commonid).subscribe(res => {
            this.getdata = res;
            this.chitfund.chit_name = this.getdata.chit_name;
            this.chitfund.chit_holder_name = this.getdata.chit_holder_name;
            this.chitfund.chit_start_date = this.getdata.chit_start_date;
            this.chitfund.chit_holder_name = this.getdata.chit_holder_name;
            this.chitfund.chit_value = this.getdata.chit_value;
            this.chitfund.tenure = this.getdata.tenure;
            this.chitfund.monthly_investment = this.getdata.monthly_investment;
            this.chitfund.current_value = this.getdata.current_value;
            this.chitfund.isCashed = this.getdata.isCashed;
            this.chitfund.notes = this.getdata.notes;
        });
    }
    opendeleteChit(id) {
        this.commonid = id;
        this.delete(this.commonid);
    }
    saveChit() {
        this.chitfundService.ChitFundDetails(this.chitfund).subscribe(data => {
            this.getChitByuid(this.uid);
        });
    }
    getChitByuid(uid) {
        this.chitfundService.getChitByuid(this.uid).subscribe(res => {
            this.chitfundDetails = res;
        });
    }
    update(commonid) {
        this.chitfund.id = this.commonid;
        this.chitfundService.UpdateChit(this.chitfund).subscribe(data => {
            this.getChitByuid(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            this.chitfund.id = this.commonid;
            this.chitfundService.DeleteChit(this.chitfund.id).subscribe(data => {
                this.getChitByuid(this.uid);
            });
        } else {
            this.getChitByuid(this.uid);
        }
    }
    resetFieldValue() {
        this.chitfund.chit_name = '';
        this.chitfund.chit_holder_name = '';
        this.chitfund.chit_start_date = '';
        this.chitfund.chit_holder_name = '';
        this.chitfund.chit_value = null;
        this.chitfund.tenure = null;
        this.chitfund.monthly_investment = null;
        this.chitfund.current_value = null;
        this.chitfund.isCashed = '';
        this.chitfund.notes = '';
    }

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}
