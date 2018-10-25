import { Component, OnInit } from '@angular/core';
import { ChitFund } from './chitfund.modal';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChitFundService } from './chitfund.service';

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

    constructor(
        private account: AccountService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public chitfundService: ChitFundService
    ) {}

    ngOnInit() {
        this.FetchId();
    }
    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.chitfund.userid = this.user.id;
                this.uid = this.chitfund.userid;
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
            this.chitfund.m_payment = this.getdata.m_payment;
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
        this.chitfund.m_payment = null;
        this.chitfund.current_value = null;
        this.chitfund.isCashed = '';
        this.chitfund.notes = '';
    }
}
