import { Component, OnInit } from '@angular/core';
import { AltInvest } from 'app/my-assets/alternate-investment/alternateinvestment.modal';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
@Component({
    selector: 'jhi-alternative',
    templateUrl: './alternateinvest.component.html',
    styles: []
})
export class AlternativeComponent implements OnInit {
    user: any;
    closeResult: string;
    commonid: number;
    conformkey: boolean;
    account: any;
    uid: any;
    getdata: any;
    out: any;
    alternateinvest: any;
    altInvest: AltInvest = new AltInvest();
    isSaving;

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public alternateservice: AlternateService,
        public commonService: CommonSidebarService
    ) {}

    ngOnInit() {
        this.FetchId();
    }
    // FetchId(): Promise<any> {
    //     return this.account
    //         .get()
    //         .toPromise()
    //         .then(response => {
    //             this.user = response.body;
    //             this.altInvest.userId = this.user.id;
    //             this.uid = this.altInvest.userId;
    //             this.getAltInvestment(this.uid);
    //         });
    // }
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.altInvest.userId = this.account.id;
            this.getAltInvestment(this.uid);
        });
    }
    openAlt(altModal) {
        this.resetFieldValue();
        this.modalService.open(altModal, { ariaLabelledBy: 'altModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AltInvestment();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditAltInvest(editAltModal, id) {
        this.commonid = id;
        this.getAltInvestById(this.commonid);
        this.modalService.open(editAltModal, { ariaLabelledBy: 'editAltModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commonid);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openDeleteAltInvest(id) {
        this.commonid = id;
        this.delete(this.commonid);
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
    AltInvestment() {
        this.alternateservice.AltInvestDetails(this.altInvest).subscribe(data => {
            this.getAltInvestment(this.uid);
        });
    }
    getAltInvestment(uid) {
        this.alternateservice.getAltInvestmentByuid(this.uid).subscribe(res => {
            this.alternateinvest = res;
        });
    }
    getAltInvestById(commonid) {
        this.alternateservice.getAltInvestById(this.commonid).subscribe(res => {
            this.getdata = res;
            console.log('res of altinvest', this.getdata.investor_name);
            this.altInvest.num = this.getdata.num;
            this.altInvest.amount_invested = this.getdata.amount_invested;
            this.altInvest.fund_name = this.getdata.fund_name;
            this.altInvest.p_date = this.getdata.p_date;
            this.altInvest.market_value = this.getdata.market_value;
            this.altInvest.as_of_date = this.getdata.as_of_date;
            this.altInvest.notes = this.getdata.notes;
            this.altInvest.investor_name = this.getdata.investor_name;
            console.log('res of altinvest', this.altInvest.investor_name);
            this.altInvest.investment_type = this.getdata.investment_type;
        });
    }
    update(commonid) {
        this.altInvest.id = this.commonid;
        this.alternateservice.UpdateAltInvest(this.altInvest).subscribe(data => {
            this.getAltInvestment(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            this.altInvest.id = this.commonid;
            this.alternateservice.DeleteAltInvest(this.altInvest.id).subscribe(data => {
                this.getAltInvestment(this.uid);
            });
        } else {
            this.getAltInvestment(this.uid);
        }
    }
    resetFieldValue() {
        this.altInvest.num = null;
        this.altInvest.amount_invested = null;
        this.altInvest.fund_name = '';
        this.altInvest.p_date = '';
        this.altInvest.market_value = null;
        this.altInvest.as_of_date = '';
        this.altInvest.notes = '';
        this.altInvest.investor_name = '';
        this.altInvest.investment_type = '';
    }
}
