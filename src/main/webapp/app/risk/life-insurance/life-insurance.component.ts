import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifeInsurance } from 'app/risk/risk.model';
import { RiskService } from 'app/risk/risk.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreditService, LoanService } from 'app/pratik/spending/spending.service';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';
import { Principal, AccountService } from 'app/core';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';
import { IncomeService } from 'app/pratik/spending/spending.service';

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
    panelFutureState = true;
    panelLiabilityState = false;

    checkLife: any;
    dynamicGoalArray: any;
    dynamicLoanArray: any = [];
    dynamicCreditArray: any = [];
    updateGoalArray: any = [];
    familyName: any = [];
    check;
    goalLife: any;
    futurecost = 0;
    outstandingpricipal = 0;
    result: any;
    i;
    goalId: any;
    tick: any;
    ischecked;
    unchecked;
    edit: any;
    names: any = [];
    tempIncomeArray: any[];
    percentage: any;
    totalIncome = 0;
    annualIncome = 0;
    totalIncomeYearly: number;
    showAdd = false;

    constructor(
        private principal: Principal,
        private accountService: AccountService,
        private router: Router,
        private riskService: RiskService,
        private modalService: NgbModal,
        private creditService: CreditService,
        private loanService: LoanService,
        private goalService: GoalselectService,
        private MyProfileSer: MyprofileService,
        private incomeService: IncomeService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
            this.uid = account.id;
        });
        this.getUserid();
    }
    checklife(checked, id, cost) {
        this.lifeInsurance.total = 0;
        if (checked) {
            this.futurecost = +this.futurecost + +cost;
            this.lifeInsurance.total = +this.futurecost + +this.outstandingpricipal;
            this.lifeInsurance.total = +this.lifeInsurance.total + +this.totalIncomeYearly;
        } else {
            this.futurecost = +this.futurecost - +cost;
            this.lifeInsurance.total = +this.futurecost + +this.outstandingpricipal;
            this.lifeInsurance.total = +this.lifeInsurance.total + +this.totalIncomeYearly;
        }
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
                    this.getCredit();
                    this.getLoan();
                    this.onGetLife();
                    this.onIncomeGet();
                } else {
                }
            })
            .catch(err => {});
    }

    getGoal() {
        this.goalService.getgoalbyid().subscribe((response: any[]) => {
            this.dynamicGoalArray = response;
            for (let i = 0; i < this.dynamicGoalArray.length; i++) {
                const element = this.dynamicGoalArray[i];
                if (element.check === 'true') {
                    this.futurecost = +this.futurecost + +element.futurecost;
                }
                this.ischecked = this.dynamicGoalArray[i].check;
            }
        });
    }
    getGoal1() {
        this.goalService.getgoalbyid().subscribe((response: any[]) => {
            this.dynamicGoalArray = response;
        });
    }

    getCredit() {
        this.creditService.GetCredit(this.uid).subscribe((response: any[]) => {
            this.dynamicCreditArray = response;
        });
    }

    getLoan() {
        this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
            this.dynamicLoanArray = response;
            this.outstandingpricipal = 0;
            for (let i = 0; i < this.dynamicLoanArray.length; i++) {
                const type = this.dynamicLoanArray[i].checkType;
                this.outstandingpricipal = +this.outstandingpricipal + +this.dynamicLoanArray[i].outstandingpricipal;
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
        this.edit = false;
        this.lifeInsurance.total = 0;
        this.futurecost = 0;
        for (let i = 0; i < this.dynamicGoalArray.length; i++) {
            const goal = this.dynamicGoalArray[i];
            goal.check = false;
        }
        this.resetModal();
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
        this.lifeInsurance.total = 0;
        this.lifeInsurance.total = +this.futurecost + +this.outstandingpricipal;
    }

    detectChange(value) {
        this.totalIncomeYearly = 0;
        this.percentage = value;
        this.totalIncomeYearly = this.annualIncome * this.percentage / 100;
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
        this.edit = true;
        this.lifeInsurance.total = 0;
        this.getGoal1();
        this.commanId = id;
        for (let i = 0; i < this.dynamicGoalArray.length; i++) {
            const goal = this.dynamicGoalArray[i];
            goal.check = false;
        }
        this.getid();
        this.modalService.open(lifeContent, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update();
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
            if (this.goalLife.length === 0) {
                this.showAdd = false;
            } else {
                this.showAdd = true;
            }
        });
    }
    // update service for lifeInsurance
    update() {
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
    getid() {
        this.riskService.getbyid(this.commanId).subscribe(data => {
            this.result = data;
            this.lifeInsurance.id = this.result.id;
            this.lifeInsurance.userid = this.result.userid;
            this.lifeInsurance.name = this.result.name;
            this.lifeInsurance.expense_cover = this.result.expense_cover;
            this.lifeInsurance.total = this.result.total;
            this.lifeInsurance.risk_coverage = this.result.risk_coverage;
        });
    }

    // get family profile name
    getName() {
        this.riskService.getFamilyName(this.uid).subscribe(data => {
            this.familyName = data;
            this.familyName.forEach(element => {
                this.names.push({ nameFirst: element.firstname });
            });
            this.MyProfileSer.getMyProfileByUid(this.uid).subscribe(res => {
                this.output = res;
                this.output.forEach(element => {
                    this.names.push({ nameFirst: element.firstName });
                });
            });
        });
    }

    // get income data
    onIncomeGet() {
        this.incomeService.GetIncome(this.uid).subscribe((response: any[]) => {
            this.tempIncomeArray = response;
            for (let j = 0; j < this.tempIncomeArray.length; j++) {
                this.totalIncome = +this.totalIncome + +this.tempIncomeArray[j].amount;
            }
            this.annualIncome = this.totalIncome * 12;
        });
    }

    get(id) {
        if (this.edit) {
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
        } else {
            return false;
        }
    }

    resetModal() {
        this.lifeInsurance.id = null;
        this.lifeInsurance.expense_cover = null;
        this.lifeInsurance.total = null;
        this.lifeInsurance.risk_coverage = null;
        this.lifeInsurance.name = null;
    }
}
