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
    getTempDate = new Date();
    setTempDate = new Date();

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
                this.uid = this.user.id;
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
        this.resetFieldValue();
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
    // SavingScheme() {
    //     this.savingScheme.userId = this.uid;
    //     console.log('saving data', this.savingScheme);
    //     this.savingSchemeService.SavingSchemeDetails(this.savingScheme).subscribe(data => {
    //     });
    //     this.getSavingSchemeUid(this.uid);
    // }
    SavingScheme() {
        this.getTempDate = this.savingScheme.start_date;
        const year = this.getTempDate.getFullYear();
        this.setTempDate.setFullYear(year + this.savingScheme.tenure);
        this.savingScheme.end_date = this.setTempDate;
        this.savingScheme.userId = this.uid;
        this.savingSchemeService.SavingSchemeDetails(this.savingScheme).subscribe(responce => {
            console.log(responce), this.getSavingSchemeUid(this.uid);
        }, error => error);
    }
    getSavingSchemeUid(uid) {
        this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
            this.SavingDetails = res;
            console.log('response of saving', this.SavingDetails);
        });
    }
    getSavingSchemeByid(commonid) {
        console.log('common id', this.commonid);
        this.savingSchemeService.getSavingSchemeById(this.commonid).subscribe(res => {
            this.getdata = res;
            console.log('getdata in getsavingById', this.getdata);
            this.savingScheme.type = this.getdata[0].type;
            this.savingScheme.num = this.getdata[0].num;
            this.savingScheme.organisation_name = this.getdata[0].organisation_name;
            this.savingScheme.investor_name = this.getdata[0].investor_name;
            this.savingScheme.dividend_type = this.getdata[0].dividend_type;
            this.savingScheme.amount_invested = this.getdata[0].amount_invested;
            this.savingScheme.rate_of_interest = this.getdata[0].rate_of_interest;
            this.savingScheme.tenure = this.getdata[0].tenure;
            this.savingScheme.start_date = this.getdata[0].start_date;
            this.savingScheme.end_date = this.getdata[0].end_date;
            this.savingScheme.fund_value = this.getdata[0].fund_value;
            this.savingScheme.as_of_date = this.getdata[0].as_of_date;
            this.savingScheme.userId = this.getdata[0].userid;
            this.savingScheme.id = this.getdata[0].id;
        });
    }
    update(commonid) {
        this.savingScheme.id = this.commonid;
        this.savingSchemeService.UpdateSaving(this.savingScheme).subscribe(data => {
            this.getSavingSchemeUid(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
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
    resetFieldValue() {
        this.savingScheme.type = '';
        this.savingScheme.num = null;
        this.savingScheme.organisation_name = '';
        this.savingScheme.investor_name = '';
        this.savingScheme.dividend_type = '';
        this.savingScheme.amount_invested = null;
        this.savingScheme.rate_of_interest = null;
        this.savingScheme.tenure = null;
        this.savingScheme.start_date = null;
        this.savingScheme.end_date = null;
        this.savingScheme.fund_value = null;
        this.savingScheme.as_of_date = '';
        this.savingScheme.userId = null;
        this.savingScheme.id = null;
    }
}
