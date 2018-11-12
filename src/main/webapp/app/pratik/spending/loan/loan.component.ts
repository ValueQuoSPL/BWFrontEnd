import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/core';
import { FormControl } from '@angular/forms';
import { Loan } from 'app/pratik/spending/spending.model';
import { LoanService } from 'app/pratik/spending/spending.service';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';

@Component({
    selector: 'jhi-loan',
    templateUrl: './loan.component.html',
    styleUrls: ['../spending.component.css']
})
export class LoanComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    dataChanged: boolean;
    isLoanData: boolean;
    changesSaved: boolean;
    dynamicLoanArray: any = [];
    dynamicLoan: any = [];
    tempLoanArray: any = [];
    loanDate = new FormControl(new Date());
    loanDate2 = new FormControl(new Date());
    repDate = new FormControl(new Date());
    loan: Loan = new Loan();
    currentDate = new Date();
    dbDate;
    out: any;
    myProfileArray;
    familyProfileArray;
    FamilyArray: any = [];

    LoanTypeArray = [
        { name: 'Home Loan' },
        { name: 'Personal Loan' },
        { name: 'Auto Loan' },
        { name: 'Educational Loan' },
        { name: 'Property Loan' },
        { name: 'Gold Loan' },
        { name: 'Hand Loan' }
    ];

    InterestTypeArray = [{ name: 'Fixed' }, { name: 'Floating' }, { name: 'Fixed-Floating' }];
    emi: number;
    totalEmi = 0;

    constructor(
        private loanService: LoanService,
        private principal: Principal,
        private modalService: NgbModal,
        private accountService: AccountService,
        private myProfileService: MyprofileService,
        private familyProfileService: FamilyprofileService
    ) {}

    ngOnInit() {
        this.getUserid();
        // loan
        this.loan.check = false;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';

        this.loan.amnt = '';
        this.loan.applicant = '';
        this.loan.check = false;
        this.loan.intrest_type = '';
        this.loanDate = new FormControl(new Date());
        this.repDate = new FormControl(new Date());
        this.loan.lender = '';
        this.loan.loan_type = '';
        this.loan.rdate = '';
        this.loan.roi = '';
        this.loan.tenure = '';
    }

    DateChangeDetector(event) {
        const date = new Date(event);
        date.setMonth(date.getMonth() + 1);
        this.repDate.setValue(date);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            this.clear();
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            this.clear();
            return 'by clicking on a backdrop';
        } else {
            this.clear();
            return `with: ${reason}`;
        }
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.getata();
                } else {
                }
            })
            .catch(err => {});
    }

    getata() {
        this.getLoanandDebt();
        this.getFamilyName();
    }

    getFamilyName() {
        this.myProfileService.getMyProfileByUid(this.uid).subscribe(res => {
            this.myProfileArray = res;
            this.myProfileArray.forEach(element => {
                this.FamilyArray.push({ name: element.firstName });
            });
        });
        this.familyProfileService.getFamilyProfileByUid(this.uid).subscribe(res => {
            this.familyProfileArray = res;
            this.familyProfileArray.forEach(element => {
                this.FamilyArray.push({ name: element.firstname });
            });
        });
    }

    getLoanandDebt() {
        this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
            this.dynamicLoan = response;

            this.dynamicLoanArray.splice(0, this.dynamicLoanArray.length);
            this.dynamicLoan.forEach(element => {
                this.emi = 0;
                this.dbDate = new Date(element.ldate);

                this.calculateEMI(element.amount, element.tenure, element.roi);
                element.outstandingpricipal = this.out;
                element.emi = Math.round(this.emi);
                this.totalEmi = +this.totalEmi + +element.emi;
                this.dynamicLoanArray.push(element);
            });

            if (this.dynamicLoanArray.length === 0) {
                this.isLoanData = false;
            } else {
                this.isLoanData = true;
            }
        });
    }

    calculateEMI(P, N, R) {
        this.out = null;

        if (this.dbDate < this.currentDate) {
            const ROI = R;
            R = R / 12 / 100;
            const A = Math.pow(1 + R, N);
            const up = P * R * A;
            const down = Math.pow(1 + R, N) - 1;
            this.emi = up / down;
            P = P - this.emi;
            this.dbDate.setMonth(this.dbDate.getMonth() + 1);
            this.calculateEMI(P, N, ROI);
        } else {
            this.out = Math.round(P);
        }
    }

    openLoan(loanModal) {
        this.clear();
        this.modalService.open(loanModal, { ariaLabelledBy: 'loanModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddLoan();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                this.clear();
            }
        );
    }

    AddLoan() {
        this.loan.loanModelArray.pop();
        this.calculateEMI(this.loan.amnt, this.loan.tenure, this.loan.roi);

        this.loan.loanModelArray.push({
            userid: this.uid,
            ltype: this.loan.loan_type,
            lender: this.loan.lender,
            app: this.loan.applicant,
            amnt: this.loan.amnt,
            ldate: this.loanDate.value,
            check: this.loan.check,
            tenure: this.loan.tenure,
            itype: this.loan.intrest_type,
            roi: this.loan.roi,
            rdate: this.repDate.value,
            OutstandingPricipal: this.out
        });
        this.onLoanSave();
        this.clear();
    }

    onLoanSave(): void {
        this.isLoanData = true;

        this.loanService.PostLoan(this.loan.loanModelArray).subscribe(data => {
            this.getLoanandDebt();
        });
    }

    onEditLoan(id, loanModal) {
        this.fillModal(id);
        this.modalService.open(loanModal, { ariaLabelledBy: 'loanModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillLoan(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    fillModal(id) {
        this.tempLoanArray = this.dynamicLoanArray;
        for (let i = 0; i < this.tempLoanArray.length; i++) {
            if (this.tempLoanArray[i].id === id) {
                this.loan.loan_type = this.tempLoanArray[i].ltype;
                this.loan.lender = this.tempLoanArray[i].lenderName;
                this.loan.applicant = this.tempLoanArray[i].appName;
                this.loan.amnt = this.tempLoanArray[i].amount;
                this.loan.ldate = this.tempLoanArray[i].ldate;
                this.loanDate = new FormControl(new Date(this.tempLoanArray[i].ldate));
                this.loan.check = this.tempLoanArray[i].checkType;
                this.loan.tenure = this.tempLoanArray[i].tenure;
                this.loan.intrest_type = this.tempLoanArray[i].itype;
                this.loan.roi = this.tempLoanArray[i].roi;
                this.loan.rdate = this.tempLoanArray[i].rdate;
                this.repDate = new FormControl(new Date(this.tempLoanArray[i].rdate));
            }
        }
    }

    fillLoan(id) {
        for (let i = 0; i < this.dynamicLoanArray.length; i++) {
            if (this.dynamicLoanArray[i].id === id) {
                this.dynamicLoanArray[i].id = this.loan.id;
                this.dynamicLoanArray[i].ltype = this.loan.loan_type;
                this.dynamicLoanArray[i].lenderName = this.loan.lender;
                this.dynamicLoanArray[i].appName = this.loan.applicant;
                this.dynamicLoanArray[i].amount = this.loan.amnt;
                this.dynamicLoanArray[i].ldate = this.loan.ldate;
                this.dynamicLoanArray[i].checkType = this.loan.check;
                this.dynamicLoanArray[i].tenure = this.loan.tenure;
                this.dynamicLoanArray[i].itype = this.loan.intrest_type;
                this.dynamicLoanArray[i].roi = this.loan.roi;
                this.dynamicLoanArray[i].rdate = this.loan.rdate;
            }
        }
        this.UpdateLoan(id);
    }

    UpdateLoan(id) {
        this.loan.id = id;
        this.loan.userid = this.uid;
        this.loanService.PutLoan(this.loan, this.uid).subscribe(res => {
            this.clear();
        });
    }

    RemoveLoan(index, id) {
        this.loanService.DeleteLoan(id).subscribe(responce => {});
        this.dynamicLoanArray.splice(index, 1);
    }
}
