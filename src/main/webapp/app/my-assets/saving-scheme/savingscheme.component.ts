import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SavingScheme } from 'app/my-assets/saving-scheme/savingscheme.modal';
import { SavingSchemeService } from './savingscheme.service';

@Component({
    selector: 'jhi-savingscheme',
    templateUrl: './savingscheme.component.html',
    styleUrls: ['./savingscheme.component.css']
})
export class SavingSchemeComponent implements OnInit {
    user: any;
    uid: any;
    output: any;
    closeResult: any;
    SavingDetails: any;
    conformkey: any;
    commonid: any;
    getdata: any;
    savingScheme: SavingScheme = new SavingScheme();
    isSaving;

    schemesArray = [
        { viewValue: 'FIXED DEPOSIT' },
        { viewValue: 'RECURRING DEPOSIT' },
        { viewValue: 'POST OFFICE SAVING' },
        { viewValue: 'NATIONAL SAVING SCHEME' },
        { viewValue: 'NATIONAL SAVINGS CERTIFICATE' },
        { viewValue: 'INDIRA VIKAS PATRA' },
        { viewValue: 'KISAN VIKAS PATRA' },
        { viewValue: 'MONTHLY INCOME SCHEME' },
        { viewValue: 'PF' },
        { viewValue: 'PPF' },
        { viewValue: 'GRATUITY' },
        { viewValue: 'SUPERANNUATION' },
        { viewValue: 'NPS' },
        { viewValue: 'GOVERNMENT BONDS' },
        { viewValue: 'CORPORATE BONDS' },
        { viewValue: 'INFRA BONDS' }
    ];
    dividendArray = [
        { name: 'Monthly' },
        { name: 'Quarterly' },
        { name: 'Half Yearly' },
        { name: 'Yearly' },
        { name: 'Monthly Re Investment' },
        { name: 'Quarterly Re Investment' },
        { name: 'Half Yearly Re Investment' },
        { name: 'Yearly Re Investment' }
    ];

    constructor(
        private account: AccountService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public savingSchemeService: SavingSchemeService
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
                this.savingScheme.userId = this.user.id;
                this.uid = this.savingScheme.userId;
                this.getSavingSchemeUid(this.uid);
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
    openSaving(content) {
        this.modalService.open(content, { ariaLabelledBy: 'savingModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.SavingScheme();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditSaving(editsavingModal, id) {
        this.commonid = id;
        this.getSavingSchemeByid(this.commonid);
        this.modalService.open(editsavingModal, { ariaLabelledBy: 'editsavingModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commonid);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    SavingScheme() {
        this.savingSchemeService.SavingSchemeDetails(this.savingScheme).subscribe(data => {
            alert('Added new Future and objective details');
        });
        this.getSavingSchemeUid(this.uid);
    }
    getSavingSchemeUid(uid) {
        this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
            this.SavingDetails = res;
        });
        // this.getAltInvestment(this.uid3);
    }
    getSavingSchemeByid(commonid) {
        console.log('common id', this.commonid);
        this.savingSchemeService.getSavingSchemeById(this.commonid).subscribe(res => {
            this.getdata = res;
            console.log('getdata in getsavingById', this.getdata);
            this.savingScheme.type = this.getdata.type;
            this.savingScheme.num = this.getdata.num;
            this.savingScheme.organisation_name = this.getdata.organisation_name;
            this.savingScheme.investor_name = this.getdata.investor_name;
            this.savingScheme.dividend_type = this.getdata.dividend_type;
            this.savingScheme.amount_invested = this.getdata.amount_invested;
            this.savingScheme.rate_of_interest = this.getdata.rate_of_interest;
            this.savingScheme.tenure = this.getdata.tenure;
            this.savingScheme.start_date = this.getdata.start_date;
            this.savingScheme.end_date = this.getdata.end_date;
            this.savingScheme.fund_value = this.getdata.fund_value;
            this.savingScheme.as_of_date = this.getdata.as_of_date;
            this.savingScheme.userId = this.getdata.userid;
            this.savingScheme.id = this.getdata.id;
        });
    }
    update(commonid) {
        // this.getStockId(this.id)
        this.savingScheme.id = this.commonid;
        // this.newid= this.stocks.id;
        // this.getStockId(this.newid);
        this.savingSchemeService.UpdateSaving(this.savingScheme).subscribe(data => {
            alert('Added new savingScheme details');
            this.getSavingSchemeUid(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            // this.conformkey = 'You pressed OK!';
            // this.getStockId(this.id)
            this.savingScheme.id = this.commonid;
            this.savingSchemeService.DeleteSaving(this.savingScheme.id).subscribe(data => {
                this.getSavingSchemeUid(this.uid);
            });
        } else {
            this.getSavingSchemeUid(this.uid);
        }
    }
    opendeleteSaving(id) {
        this.commonid = id;
        this.delete(this.commonid);
    }
}
