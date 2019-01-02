import { Component, OnInit } from '@angular/core';
import { FAO } from 'app/my-assets/future-option/futureoption.modal';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
import { DocumentComponent } from 'app/document/document.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-futureoption',
    templateUrl: './futureoption.component.html',
    styleUrls: []
})
export class FutureOptionComponent implements OnInit {
    user: any;
    closeResult: string;
    commonid: number;
    conformkey: boolean;
    uid: any;
    getdata: any;
    out: any;
    FutureOptionDetails: any;
    fao: FAO = new FAO();
    isSaving;
    account: any;
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public futureOptionService: FutureOptionService,
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
            this.fao.userid = this.account.id;
            this.getFAOByUid(this.uid);
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
    openFuture(content) {
        this.resetFieldValue();
        this.modalService.open(content, { ariaLabelledBy: 'futureModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.SaveFAO();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditFuture(editfutureModal, id) {
        this.commonid = id;
        this.getFutureById(this.commonid);
        this.modalService.open(editfutureModal, { ariaLabelledBy: 'editfutureModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commonid);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    opendeleteFuture(id) {
        this.commonid = id;
        this.delete(this.commonid);
    }
    getFutureById(commonid) {
        this.futureOptionService.getFutureById(this.commonid).subscribe(res => {
            this.getdata = res;
            this.fao.num = this.getdata.num;
            this.fao.investment_type = this.getdata.investment_type;
            this.fao.asset_type = this.getdata.asset_type;
            this.fao.investor_name = this.getdata.investor_name;
            this.fao.asset_name = this.getdata.asset_name;
            this.fao.no_of_contracts = this.getdata.no_of_contracts;
            this.fao.p_date = this.getdata.p_date;
            this.fao.contract_p_value = this.getdata.contract_p_value;
            this.fao.contract_m_value = this.getdata.contract_m_value;
            this.fao.as_of_date = this.getdata.as_of_date;
            this.fao.notes = this.getdata.notes;
        });
    }
    SaveFAO() {
        this.fao.userid = this.uid;
        this.futureOptionService.SaveFAO(this.fao).subscribe(data => {
            this.getFAOByUid(this.uid);
        });
    }
    getFAOByUid(uid) {
        this.futureOptionService.getFAOByUid(this.uid).subscribe(res => {
            this.FutureOptionDetails = res;
        });
    }
    update(commonid) {
        this.fao.id = this.commonid;
        this.futureOptionService.UpdateFuture(this.fao).subscribe(data => {
            this.getFAOByUid(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            this.fao.id = this.commonid;
            this.futureOptionService.DeleteFuture(this.fao.id).subscribe(data => {
                this.getFAOByUid(this.uid);
            });
        } else {
            this.getFAOByUid(this.uid);
        }
    }
    resetFieldValue() {
        this.fao.num = null;
        this.fao.investment_type = '';
        this.fao.asset_type = '';
        this.fao.investor_name = '';
        this.fao.asset_name = '';
        this.fao.no_of_contracts = null;
        this.fao.p_date = '';
        this.fao.contract_p_value = null;
        this.fao.contract_m_value = null;
        this.fao.as_of_date = '';
        this.fao.notes = '';
    }

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}
