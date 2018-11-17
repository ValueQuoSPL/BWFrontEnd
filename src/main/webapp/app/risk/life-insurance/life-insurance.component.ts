import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifeInsurance } from 'app/risk/risk.model';
import { RiskService } from 'app/risk/risk.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreditService, LoanService } from 'app/pratik/spending/spending.service';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';
import { Principal, AccountService } from 'app/core';

@Component({
    selector: 'jhi-life-insurance',
    templateUrl: './life-insurance.component.html',
    styleUrls: ['./life-insurance.component.css']
})
export class LifeInsuranceComponent implements OnInit {
    account: Account;
    uid;
    lifeInsurance: LifeInsurance = new LifeInsurance();
    lifeArray = [];
    deleteFieldValue: any;
    liabilitiyArray: any;
    liability: any = [];
    total: any;
    isSaving: any;
    save: any;
    clear: any;
    resetFieldValue: any;
    closeResult: string;
    public output: any;
    commanId: any;

    checkLife: any;
    dynamicGoalArray: any;
    dynamicLoanArray: any = [];
    dynamicCreditArray: any = [];
    updateGoalArray: any = [];
    familyName: any = [];
    check;
    goalLife: any;
    futurecost: any;
    outstandingpricipal: any;
    result: any;
    i;
    goalId: any;
    tick: any;
    ischecked;
    unchecked;

    constructor(
        private principal: Principal,
        private accountService: AccountService,
        private router: Router,
        private riskService: RiskService,
        private modalService: NgbModal,
        private creditService: CreditService,
        private loanService: LoanService,
        private goalService: GoalselectService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
            this.uid = account.id;
        });
        this.getUserid();
    }
    checklife(checked, id) {
        this.goalId = id;
        this.checkLife = checked;
        this.updateGoalArray.push({
            id: this.goalId,
            check: this.checkLife
        });
        this.riskService.updateGoal(this.updateGoalArray).subscribe(data => {});
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.getGoal();
                    this.getCredit(this.uid);
                    this.getLoan(this.uid);
                    this.onGetLife();
                    this.getName(this.uid);
                } else {
                }
            })
            .catch(err => {});
    }

    getGoal() {
        this.goalService.getgoalbyid().subscribe((response: any[]) => {
            this.dynamicGoalArray = response;
            for (let i = 0; i < this.dynamicGoalArray.length; i++) {
                this.futurecost = this.dynamicGoalArray[i].futurecost;
                this.ischecked = this.dynamicGoalArray[i].check;
            }
        });
    }

    getCredit(uid) {
        this.creditService.GetCredit(uid).subscribe((response: any[]) => {
            this.dynamicCreditArray = response;
        });
    }

    getLoan(uid) {
        this.loanService.GetLoan(uid).subscribe((response: any[]) => {
            this.dynamicLoanArray = response;
            for (let i = 0; i < this.dynamicLoanArray.length; i++) {
                const type = this.dynamicLoanArray[i].checkType;
                this.outstandingpricipal = this.dynamicLoanArray[i].outstandingpricipal;
                if (type === true) {
                } else {
                    this.liability.push(this.dynamicLoanArray[i]);
                }
            }
            this.check = this.dynamicLoanArray.checkType;
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

    // life
    openLife(lifeContent) {
        this.sum();
        this.modalService.open(lifeContent, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.saveLifeInsurance();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    sum() {
        this.lifeInsurance.total = +this.futurecost + +this.outstandingpricipal;
    }

    saveLifeInsurance() {
        this.lifeInsurance.userid = this.uid;
        this.lifeArray.push({
            risk_coverage: this.lifeInsurance.risk_coverage,
            expense_cover: this.lifeInsurance.expense_cover,
            total_yearly_expenses: this.lifeInsurance.total,
            userid: this.lifeInsurance.userid
        });
        this.riskService.SaveLifeInsurance(this.lifeInsurance).subscribe(data => {
            this.onGetLife();
        });
    }

    opnLife(id, lifeContent) {
        this.getGoal();
        this.commanId = id;
        this.modalService.open(lifeContent, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commanId);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    // deleteField(index, id) {}
    onGetLife() {
        this.riskService.getLifeInsurance(this.uid).subscribe(data => {
            this.goalLife = data;
        });
    }
    // update service for lifeInsurance
    update(commanId) {
        this.lifeInsurance.id = this.commanId;
        this.lifeInsurance.userid = this.uid;
        this.riskService.updatelifeInsurance(this.lifeInsurance).subscribe(data => {
            this.onGetLife();
        });
    }

    deleteField(index, id) {
        this.riskService.delete(id).subscribe(data => {});
        this.goalLife.splice(index, 1);
    }
    // getid
    getid(id) {
        this.riskService.getbyid(id).subscribe(data => {
            this.result = data;
            this.lifeInsurance.id = this.result.id;
            this.lifeInsurance.userid = this.result.userid;
            this.lifeInsurance.expense_cover = this.result.expense_cover;
            this.lifeInsurance.total = this.result.total;
            this.lifeInsurance.risk_coverage = this.result.risk_coverage;
        });
    }

    // get family profile name
    getName(uid) {
        this.riskService.getFamilyName(this.uid).subscribe(data => {
            this.familyName = data;
        });
    }

    get(id) {
        let flag = 0;
        for (let i = 0; i < this.dynamicGoalArray.length; i++) {
            const goal = this.dynamicGoalArray[i];
            if (goal.id === id) {
                const value = goal.check;
                if (value === 'true') {
                    flag = 1;
                    return true;
                } else {
                    flag = 0;
                    return false;
                }
            }
        }
    }

    resetModal() {
        this.lifeInsurance.expense_cover = null;
        this.lifeInsurance.total = null;
        this.lifeInsurance.risk_coverage = null;
    }
}
