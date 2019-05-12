import { log } from 'util';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MutualFund } from 'app/my-assets/mutual/mutual.modal';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
import { DocumentComponent } from 'app/document/document.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface ArrAmc {}

@Component({
    selector: 'jhi-mutualfund',
    templateUrl: './mutual.component.html',
    styles: ['./mutual.component.css']
})
export class MutualComponent implements OnInit {
    arr: any = [];
    showCagr = false;
    siparray: any = [
        { sipday: 1, sipname: '1st Day of Month' },
        { sipday: 2, sipname: '2nd Day of Month' },
        { sipday: 3, sipname: '3rd Day of Month' },
        { sipday: 4, sipname: '4th Day of Month' },
        { sipday: 5, sipname: '5th Day of Month' },
        { sipday: 6, sipname: '6th Day of Month' },
        { sipday: 7, sipname: '7th Day of Month' },
        { sipday: 8, sipname: '8th Day of Month' },
        { sipday: 9, sipname: '9th Day of Month' },
        { sipday: 10, sipname: '10th Day of Month' },
        { sipday: 11, sipname: '11th Day of Month' },
        { sipday: 12, sipname: '12th Day of Month' },
        { sipday: 13, sipname: '13th Day of Month' },
        { sipday: 14, sipname: '14th Day of Month' },
        { sipday: 15, sipname: '15th Day of Month' },
        { sipday: 16, sipname: '16th Day of Month' },
        { sipday: 17, sipname: '17th Day of Month' },
        { sipday: 18, sipname: '18th Day of Month' },
        { sipday: 19, sipname: '19th Day of Month' },
        { sipday: 20, sipname: '20th Day of Month' },
        { sipday: 21, sipname: '21st Day of Month' },
        { sipday: 22, sipname: '22nd Day of Month' },
        { sipday: 23, sipname: '23rd Day of Month' },
        { sipday: 24, sipname: '24th Day of Month' },
        { sipday: 25, sipname: '25th Day of Month' },
        { sipday: 26, sipname: '26th Day of Month' },
        { sipday: 27, sipname: '27th Day of Month' },
        { sipday: 28, sipname: '28th Day of Month' },
        { sipday: 29, sipname: '29th Day of Month' },
        { sipday: 30, sipname: '30th Day of Month' },
        { sipday: 31, sipname: '31st Day of Month' }
    ];
    arrAmc: any = [];
    select: any;
    arri: any = [];
    filteredOptions: Observable<string[]>;
    user: any;
    AmcVar: any;
    type: any;
    uid: any;
    output: any;
    getdata: any;
    commonid: any;
    conformkey: any;
    closeResult: any;
    mutualfund: MutualFund = new MutualFund();
    isSaving;
    account: any;
    myControl = new FormControl();
    sectedamc: any;
    option: any;
    siparr: any;
    schemeCodeArr: any;
    x: any;
    sipname: any;
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public mutualFundService: MutualfundService,
        public commonService: CommonSidebarService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.FetchId();
        this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    }
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.mutualfund.userid = this.account.id;
            this.getMutualFundByUid(this.uid);
        });
        this.getNAVdata();
    }

    getNAVdata() {
        this.mutualFundService.onGetNAVdata().subscribe(data => {});
        this.callAllAmc();
    }

    openMutual(mutualModel) {
        this.resetFieldValue();
        this.modalService.open(mutualModel, { ariaLabelledBy: 'mutualModal', size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.saveMutual();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditMutual(editMutualModal, id) {
        this.commonid = id;
        this.getMutualFundByid(this.commonid);
        this.modalService.open(editMutualModal, { ariaLabelledBy: 'editMutualModal', size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    viewMutualFund(viewMutualModal, id) {
        this.commonid = id;
        this.getViewMutualFundByid(this.commonid);
        this.modalService.open(viewMutualModal, { ariaLabelledBy: 'viewMutualModal', size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
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
    saveMutual(): void {
        this.mutualfund.userid = this.uid;
        this.mutualfund.type = this.type;
        this.mutualFundService.SubmitUser(this.mutualfund).subscribe(data => {
            this.getMutualFundByUid(this.uid);
        });
    }
    getMutualFundByUid(uid) {
        this.mutualFundService.getMutualFund(this.uid).subscribe(res => {
            this.output = res;
            let days;
            this.output.forEach(element => {
                if (element.holdingdays < 365) {
                    this.showCagr = false;
                } else {
                    days = element.holdingdays;
                    element.cagr = this.cagr(element.currentvalue, element.purchesprice, days);
                    this.showCagr = true;
                }
                this.x = this.cal(element.currentvalue, element.purchesprice);
                element.gainloss = this.x;
                element.absolutereturn = this.absoluteReturn(element.currentvalue, element.purchesprice);
            });
        });
    }
    cal(currentValue, purchasePrice) {
        return +currentValue - +purchasePrice;
    }

    absoluteReturn(currentValue, purchasePrice) {
        const absolute = Math.round(+currentValue - +purchasePrice) / purchasePrice * 100;
        return absolute.toFixed(2);
    }

    cagr(currentValue, purchasePrice, days) {
        const years = days / 365;
        const x = Math.round(((currentValue / purchasePrice) ** (1 / years) - 1) * 100);
        return x;
    }
    getMutualFundByid(commonid) {
        this.mutualFundService.getMutualFundByid(this.commonid).subscribe(res => {
            this.getdata = res;
            this.mutualfund.id = this.getdata.id;
            this.mutualfund.amcname = this.getdata.amcname;
            this.mutualfund.mfscheme = this.getdata.mfscheme;
            this.mutualfund.folionumber = this.getdata.folionumber;
            this.mutualfund.holdingdays = this.getdata.holdingdays;
            this.mutualfund.purchesprice = this.getdata.purchesprice;
            this.mutualfund.currentvalue = this.getdata.currentvalue;
            this.mutualfund.gainloss = this.getdata.gainloss;
            this.mutualfund.p_date = this.getdata.p_date;
            this.type = this.getdata.type;
            this.mutualfund.type = this.type;
            this.mutualfund.absolutereturn = this.getdata.absolutereturn;
            this.mutualfund.cagr = this.getdata.cagr;
            this.mutualfund.unitbalance = this.getdata.unitbalance;
            this.mutualfund.frequency = this.getdata.frequency;
            this.mutualfund.sipday = this.getdata.sipday;
            this.mutualfund.sipamount = this.getdata.sipamount;
            this.mutualfund.userid = this.getdata.userid;
            this.mutualfund.schemecode = this.getdata.schemecode;
            this.mutualfund.navatpurchase = this.getdata.navatpurchase;
        });
    }
    getViewMutualFundByid(commonid) {
        this.mutualFundService.getMutualFundByid(this.commonid).subscribe(res => {
            this.getdata = res;
            if (this.getdata.type === 'Sip') {
                this.getdata.navatpurchase = 'NA';
            }
            if (this.getdata.type === 'LumpSum') {
                this.getdata.sipday = 'NA';
                this.getdata.sipamount = 'NA';
                this.getdata.frequency = 'NA';
            }
            this.x = this.cal(this.getdata.currentvalue, this.getdata.purchesprice);
            this.getdata.gainloss = this.x;
            this.getdata.absolutereturn = this.absoluteReturn(this.getdata.currentvalue, this.getdata.purchesprice);
            this.getdata.cagr = this.cagr(this.getdata.currentvalue, this.getdata.purchesprice, this.getdata.holdingdays);
            // this.getdata.gainloss = this.getdata.currentvalue;
        });
    }
    opendeleteMutual(id) {
        this.commonid = id;
        this.delete(this.commonid);
    }
    update() {
        this.mutualfund.id = this.commonid;
        this.mutualFundService.UpdateMutualFund(this.mutualfund).subscribe(data => {
            this.getMutualFundByUid(this.uid);
        });
    }
    // resetFieldValue() used to reset all the values
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            this.mutualfund.id = this.commonid;
            this.mutualFundService.DeleteMutualFund(this.mutualfund.id).subscribe(data => {
                this.getMutualFundByUid(this.uid);
            });
        } else {
            this.getMutualFundByUid(this.uid);
        }
    }
    // resetFieldValue() used to reset all the values
    resetFieldValue() {
        this.mutualfund.id = null;
        this.mutualfund.mfscheme = null;
        this.mutualfund.folionumber = null;
        this.mutualfund.holdingdays = null;
        this.mutualfund.purchesprice = null;
        this.mutualfund.currentvalue = null;
        this.mutualfund.gainloss = null;
        this.mutualfund.absolutereturn = null;
        this.mutualfund.cagr = null;
        this.mutualfund.p_date = null;
        this.mutualfund.frequency = null;
        this.mutualfund.unitbalance = null;
        this.mutualfund.type = null;
        this.mutualfund.amcname = null;
        this.mutualfund.sipday = null;
        this.mutualfund.sipamount = null;
        this.mutualfund.schemecode = null;
        this.type = null;
    }
    // openDialog() used to upload doc
    openDialog(id, type): void {
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
    public onChange(event) {
        // event will give you full breif of action
        const newVal = event;
    }

    callAllAmc() {
        this.mutualFundService.getAllAmc().subscribe(data => {
            this.arrAmc = data;
        });
    }
    private _filter(value: string): string[] {
        const filterValue = value;
        return this.arrAmc.filter(option => option.amc_code.toLowerCase().indexOf(filterValue) === 0);
    }

    callAmc(option, i) {
        this.arri = option;
        this.mutualfund.amcname = this.arri.amc_name;
        this.AmcVar = this.arri.amc_code;
        this.mutualFundService.CallAmcMethod(this.AmcVar).subscribe(res => {
            this.arr = res;
        });
    }
    getSipDay(sip, i) {
        this.siparr = sip;
        this.mutualfund.sipday = this.siparr.sipday;
    }
    getSchemeCode(code, i) {
        this.schemeCodeArr = code;
        this.mutualfund.mfscheme = this.schemeCodeArr.schemeName;
        this.mutualfund.schemecode = this.schemeCodeArr.schemeCode;
    }
}
