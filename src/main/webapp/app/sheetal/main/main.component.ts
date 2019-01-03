import { NAMED_ENTITIES } from '@angular/compiler';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Component, OnInit } from '@angular/core';
import { Gross } from 'app/sheetal/main/Services/gross.model';
import { GrossService } from 'app/sheetal/main/Services/gross.service';
import { Eightyc } from 'app/sheetal/main/Services/eightyc.model';
import { EightycService } from 'app/sheetal/main/Services/eightyc.service';
import { Home } from 'app/sheetal/main/Services/home.model';
import { HomeService } from 'app/sheetal/main/Services/home.service';
import { Eightyd } from 'app/sheetal/main/Services/eightyd.model';
import { EightydService } from 'app/sheetal/main/Services/eightyd.service';
import { Other } from 'app/sheetal/main/Services/other.model';
import { OtherService } from 'app/sheetal/main/Services/other.service';
// import { error } from 'util';
import { AccountService, LoginService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    [x: string]: any;
    step = 0;
    public ServiceAPIParam: any;
    // public id= 11;
    public id;
    gross: Gross = new Gross();
    eightyc: Eightyc = new Eightyc();
    home: Home = new Home();
    eightyd: Eightyd = new Eightyd();
    other: Other = new Other();
    output: any = [];
    data: any;
    out: any;
    homeout: any;
    eightydout: any;
    otherout: any;
    user;
    public userID: any;
    // valid: boolean =true;
    valid = true;
    uid: any;
    accountService: any;
    modalRef: NgbModalRef;
    nameField: any;
    editField;
    closeResult: string;
    changesSaved: boolean;
    dataChanged: boolean;

    constructor(
        private modalService: NgbModal,
        private grossService: GrossService,
        private eightycService: EightycService,
        private homeService: HomeService,
        private eightydService: EightydService,
        private otherService: OtherService,
        private account: AccountService,
        private loginService: LoginService
    ) {}
    // conso
    ngOnInit() {
        this.FetchID();

        // for gross
        this.gross.bsalary = 0;
        this.gross.da = 0;
        this.gross.hra = 0;
        this.gross.conveyance = 0;
        this.gross.childedu = 0;
        this.gross.medical = 0;
        this.gross.lta = 0;
        this.gross.otherallown = 0;
        this.gross.bonus = 0;
        this.gross.rentincome = 0;
        this.gross.saving = 0;
        this.gross.bonds = 0;
        this.gross.conveyanceother = 0;

        // for eightyc
        this.eightyc.fixed = 0;
        this.eightyc.tution = 0;
        this.eightyc.nsc = 0;
        this.eightyc.nss = 0;
        this.eightyc.post = 0;
        this.eightyc.reinvest = 0;
        this.eightyc.licpremium = 0;
        this.eightyc.equity = 0;
        this.eightyc.pf = 0;
        this.eightyc.ppf = 0;
        this.eightyc.other = 0;
        this.eightyc.tutionfee = 0;
        this.eightyc.ulip = 0;

        // for Home
        this.home.homeloan = 0;
        this.home.prncpalloan = 0;
        this.home.rentclm = 0;
        this.home.remintrst = 0;
        this.home.rentclmgg = 0;

        // for 80D Deduction
        this.eightyd.medself = 0;
        this.eightyd.medparents = 0;
        this.eightyd.healthcheck = 0;

        // for other
        this.other.handicapped = 0;
        this.other.medicaltreat = 0;
        this.other.selfedu = 0;
        this.other.nps = 0;
        this.other.rgess = 0;
        this.other.donation = 0;
    }

    FetchID() {
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.uid = this.account2.id;
            this.eightyd.uid = this.uid;
            this.onEightydGet();
        }
    }
    // gross call function
    onGrossSave() {}
    // eightyc call function
    onEightycSave() {}
    // home call function
    onHomeSave() {}
    // eightyd call function
    onEightydSave() {
        this.eightydService.save(this.eightyd).subscribe();
    }
    // Other call function
    onOtherSave() {}
    // 80D Reset
    resetEightyd() {
        this.eightyd.medself = 0;
        this.eightyd.medparents = 0;
        this.eightyd.healthcheck = 0;
    }
    // Other Reset
    resetOther() {
        this.other.handicapped = 0;
        this.other.medicaltreat = 0;
        this.other.selfedu = 0;
        this.other.nps = 0;
        this.other.rgess = 0;
        this.other.donation = 0;
    }
    // Home reset
    resetHome() {
        this.home.homeloan = 0;
        this.home.prncpalloan = 0;
        this.home.rentclm = 0;
        this.home.remintrst = 0;
        this.home.rentclmgg = 0;
    }
    // EightyC Reset
    resetEightyc() {
        this.eightyc.fixed = 0;
        this.eightyc.tution = 0;
        this.eightyc.nsc = 0;
        this.eightyc.nss = 0;
        this.eightyc.post = 0;
        this.eightyc.reinvest = 0;
        this.eightyc.licpremium = 0;
        this.eightyc.equity = 0;
        this.eightyc.pf = 0;
        this.eightyc.ppf = 0;
        this.eightyc.other = 0;
        this.eightyc.tutionfee = 0;
        this.eightyc.ulip = 0;
    }
    // Gross Reset
    resetGross() {
        this.gross.bsalary = 0;
        this.gross.da = 0;
        this.gross.hra = 0;
        this.gross.conveyance = 0;
        this.gross.childedu = 0;
        this.gross.medical = 0;
        this.gross.lta = 0;
        this.gross.otherallown = 0;
        this.gross.bonus = 0;
        this.gross.rentincome = 0;
        this.gross.saving = 0;
        this.gross.bonds = 0;
        this.gross.conveyanceother = 0;
    }
    onGrossGet() {
        this.grossService.getgross(this.uid).subscribe(res => {
            this.output = res;
        });
        // this.onEightycGet(this.id);
    }
    onEightycGet() {
        this.eightycService.geteightyc(this.uid).subscribe(res => {
            this.out = res;
        });
    }
    onHomeGet() {
        this.homeService.gethome(this.uid).subscribe(res => {
            this.homeout = res;
        });
    }
    onEightydGet() {
        this.eightydService.geteightyd(this.uid).subscribe(res => {
            this.eightydout = res;
        });
    }
    onOtherGet() {
        this.otherService.getother(this.id).subscribe(res => {
            this.otherout = res;
        });
    }
    // updateEightyd() {
    //   this.eightyd.FetchID = this.id;
    //   this.eightydService.PutEightyd(this.eightyd, this.id).subscribe(data => {
    //     alert('Your data saved');
    //     this.changesSaved = true;
    //   });
    // }
    // eightyd modal
    onEditStaticField(nameField, modal) {
        this.nameField = nameField;
        if (nameField === 'Medical Insurance for Self') {
            this.nameField = 'Amount of Medical for self';
            this.editField = this.eightydout.medself;
        } else if (nameField === 'Medical Insurance for Parents ') {
            this.nameField = 'Amount of Medical for Parents';
            this.editField = this.eightydout.medparents;
        } else if (nameField === 'Preventive Health Checkup') {
            this.nameField = 'Amount of Preventive health checkup';
            this.editField = this.eightydout.healthcheck;
        }
        this.modalService.open(modal, { ariaLabelledBy: 'eightydEditContent' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.FillEditEightyd(nameField);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    FillEditEightyd(nameField) {
        if (nameField === 'Medical Insurance for Self') {
            this.eightydout.medself = this.editField;
            this.editField = '';
        } else if (nameField === 'Medical Insurance for Parents') {
            this.eightydout.medparents = this.editField;
            this.editField = '';
        } else if (nameField === 'Preventive Health Checkup') {
            this.eightydout.healthcheck = this.editField;
            this.editField = '';
        }
    }
    onEditOtherField(nameField, modal) {
        this.nameField = nameField;
        if (nameField === 'Medical Handicapped') {
            this.nameField = 'Amount';
            this.editField = this.otherout.handicapped;
        } else if (nameField === 'Medical Treatment') {
            this.nameField = 'Amount';
            this.editField = this.otherout.medicaltreat;
        } else if (nameField === 'Repayment') {
            this.nameField = 'Amount';
            this.editField = this.otherout.selfedu;
        } else if (nameField === 'nps') {
            this.nameField = 'Amount';
            this.editField = this.otherout.nps;
        } else if (nameField === 'rgess') {
            this.nameField = 'Amount';
            this.editField = this.otherout.rgess;
        } else if (nameField === 'donation') {
            this.nameField = 'Amount';
            this.editField = this.otherout.donation;
        }
        this.modalService.open(modal, { ariaLabelledBy: 'otherEditContent' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.FillEditOther(nameField);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    FillEditOther(nameField) {
        if (nameField === 'Medical Handicapped') {
            this.otherout.handicapped = this.editField;
            this.editField = '';
        } else if (nameField === 'Medical Treatment') {
            this.otherout.medicaltreat = this.editField;
            this.editField = '';
        } else if (nameField === 'Repayment') {
            this.otherout.selfedu = this.editField;
            this.editField = '';
        } else if (nameField === 'nps') {
            this.otherout.nps = this.editField;
            this.editField = '';
        } else if (nameField === 'rgess') {
            this.otherout.rgess = this.editField;
            this.editField = '';
        } else if (nameField === 'donation') {
            this.otherout.donation = this.editField;
            this.editField = '';
        }
    }
    onEditHomeField(nameField, modal) {
        this.nameField = nameField;
        if (nameField === 'Housing Loan') {
            this.nameField = 'Amount';
            this.editField = this.homeout.homeloan;
        } else if (nameField === 'Pricipal Loan') {
            this.nameField = 'Amount';
            this.editField = this.homeout.prncpalloan;
        } else if (nameField === 'Rent Claimed') {
            this.nameField = 'Amount';
            this.editField = this.homeout.rentclm;
        } else if (nameField === 'Remaining Interest') {
            this.nameField = 'Amount';
            this.editField = this.homeout.remintrst;
        } else if (nameField === 'Mentioned the Rent claimed') {
            this.nameField = 'Amount';
            this.editField = this.homeout.rentclmgg;
        }
        this.modalService.open(modal, { ariaLabelledBy: 'homeEditContent' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.FillEditHome(nameField);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    FillEditHome(nameField) {
        if (nameField === 'Housing Loan') {
            this.homeout.homeloan = this.editField;
            this.editField = '';
        } else if (nameField === 'Pricipal Loan') {
            this.homeout.prncpalloan = this.editField;
            this.editField = '';
        } else if (nameField === 'Rent Claimed') {
            this.homeout.rentclm = this.editField;
            this.editField = '';
        } else if (nameField === 'Remaining Interest') {
            this.homeout.remintrst = this.editField;
            this.editField = '';
        } else if (nameField === 'Mentioned the Rent claimed') {
            this.homeout.rentclmgg = this.editField;
            this.editField = '';
        }
    }
    onEditEightycField(nameField, modal) {
        this.nameField = nameField;
        if (nameField === 'Fixed Deposit in Schedule Bank') {
            this.nameField = 'Amount';
            this.editField = this.out.fixed;
        } else if (nameField === 'Tution Fees') {
            this.nameField = 'Amount';
            this.editField = this.out.tution;
        } else if (nameField === 'Deposite in NSC') {
            this.nameField = 'Amount';
            this.editField = this.out.nsc;
        } else if (nameField === 'Deposite in NSS') {
            this.nameField = 'Amount';
            this.editField = this.out.nss;
        } else if (nameField === 'Post Office saving Scheme') {
            this.nameField = 'Amount';
            this.editField = this.out.post;
        } else if (nameField === 'Interest on NSC Reinvested') {
            this.nameField = 'Amount';
            this.editField = this.out.reinvest;
        } else if (nameField === 'Life Insurance Premium') {
            this.nameField = 'Amount';
            this.editField = this.out.licpremium;
        } else if (nameField === 'Equity linked Savings Scheme') {
            this.nameField = 'Amount';
            this.editField = this.out.equity;
        } else if (nameField === 'Provident Fund') {
            this.nameField = 'Amount';
            this.editField = this.out.pf;
        } else if (nameField === 'Public Provident Fund') {
            this.nameField = 'Amount';
            this.editField = this.out.ppf;
        } else if (nameField === 'Others') {
            this.nameField = 'Amount';
            this.editField = this.out.other;
        } else if (nameField === 'ULIP of UTI/LIC') {
            this.nameField = 'Amount';
            this.editField = this.out.ulip;
        }
        this.modalService.open(modal, { ariaLabelledBy: 'eightycEditContent' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.FillEditEightyc(nameField);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    FillEditEightyc(nameField) {
        if (nameField === 'Fixed Deposit in Schedule Bank') {
            this.out.fixed = this.editField;
            this.editField = '';
        } else if (nameField === 'Tution Fees') {
            this.out.tution = this.editField;
            this.editField = '';
        } else if (nameField === 'Deposite in NSC') {
            this.out.nsc = this.editField;
            this.editField = '';
        } else if (nameField === 'Deposite in NSS') {
            this.out.nss = this.editField;
            this.editField = '';
        } else if (nameField === 'Post Office saving Scheme') {
            this.out.post = this.editField;
            this.editField = '';
        } else if (nameField === 'Interest on NSC Reinvested') {
            this.out.reinvest = this.editField;
            this.editField = '';
        } else if (nameField === 'Life Insurance Premium') {
            this.out.licpremium = this.editField;
            this.editField = '';
        } else if (nameField === 'Equity linked Savings Scheme') {
            this.out.equity = this.editField;
            this.editField = '';
        } else if (nameField === 'Provident Fund') {
            this.out.pf = this.editField;
            this.editField = '';
        } else if (nameField === 'Public Provident Fund') {
            this.out.ppf = this.editField;
            this.editField = '';
        } else if (nameField === 'Others') {
            this.out.other = this.editField;
            this.editField = '';
        } else if (nameField === 'ULIP of UTI/LIC') {
            this.out.ulip = this.editField;
            this.editField = '';
        }
    }
}
