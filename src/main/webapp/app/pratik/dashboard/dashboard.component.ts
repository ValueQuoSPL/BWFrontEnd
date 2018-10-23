import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, Principal, LoginModalService } from 'app/core';
import { DashboardService } from 'app/pratik/dashboard/dashboard.service';
import { Color } from 'ng2-charts';
// tslint:disable-next-line:max-line-length
import {
    GeneralService,
    HealthService,
    LifeService,
    LoanService,
    MiscService,
    TravelService,
    UtilityService,
    HouseService,
    IncomeService
} from 'app/pratik/spending/spending.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { MainComponent } from 'app/sheetal';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: []
})
export class DashboardComponent implements OnInit {
    subject = new BehaviorSubject(0);
    subject2 = new ReplaySubject(0);

    // [x: string]: any;
    uid: any;
    account: any;
    result: any = [];
    total: any;
    resultStock: any;
    totalStock: any;
    totalSaving: any;
    totalCash: any;
    totalChit: any;
    totalPCJ: any;
    totalAlterInvestment: any;
    totalFAO: any;
    resultSaving: any;
    resultCash: any;
    resultChit: any;
    resultPCJ: any;
    resultAlterInvestment: any;
    resultFAO: any;
    totalLiabilities: any;
    resultLiabilities: any;

    public pieChartableLabels: string[] = [];
    public pieChartData: number[] = [];
    public colors: Array<Color>;
    public assetChart = 'pie';

    public pieChartableLabel: any = [];
    public pieChartDataa: any = [];
    public color: Array<Color>;
    public liabilityChart = 'pie';

    // cardbar
    incomeTotal = 0;
    assetTotal = 0;
    expenseTotal = 0;
    networth = 0;
    liabilityTotal = 0;
    surplus = 0;
    currentDate = new Date();
    dbDate;
    emi: any;
    inflation = 0.07;

    GoalArray: any = [];
    HTMLGoalArray: any = [];
    dynamicCredit: any[];
    dynamicGeneral: any[];
    dynamicHealth: any[];
    HouseholdArray: any[];
    dynamicLifeArray: any[];
    dynamicLoan: any[];
    MiscArray: any[];
    TravelArray: any[];
    UtilityArray: any[];
    AssetArray: any = [];
    linkedasset: boolean;

    modalRef: NgbModalRef;
    shortLiability: any = [];
    longLiability: any = [];

    public chartClicked(e: any): void {}

    public chartHovered(e: any): void {}

    constructor(
        // private main: MainComponent,
        private router: Router,
        private dashboardService: DashboardService,
        private accountService: AccountService,
        private principal: Principal,
        private generalService: GeneralService,
        private healthService: HealthService,
        private lifeService: LifeService,
        private loanService: LoanService,
        private miscService: MiscService,
        private travelService: TravelService,
        private utilityService: UtilityService,
        private houseService: HouseService,
        private incomeService: IncomeService,
        private loginModalService: LoginModalService
    ) {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    ngOnInit() {
        this.getUserid();
        // this.main.toggleSide(true);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.getMutualFund(this.uid);
                    this.getStock(this.uid);
                    this.getSaving(this.uid);
                    this.getChit(this.uid);
                    this.getCash(this.uid);
                    this.getAlterInvestment(this.uid);
                    this.getPCJ(this.uid);
                    this.getFAO(this.uid);
                    this.getLiabilities(this.uid);
                    this.getGoal();
                    this.getIncome();
                    this.getExpense();
                }
            });
        // .catch(err => {});
    }

    // liabilities
    getLiabilities(uid) {
        this.totalLiabilities = 0;
        this.dashboardService.getLiabilities(this.uid).subscribe(data => {
            this.resultLiabilities = data;
            this.divideLiability(this.resultLiabilities);

            for (let i = 0; i < this.resultLiabilities.length; i++) {
                this.totalLiabilities = this.totalLiabilities + +this.resultLiabilities[i].outstandingpricipal;
            }
            this.liabilityTotal = this.totalLiabilities;
            this.liabilitiesChart(this.totalLiabilities);
        });
    }

    divideLiability(data) {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const duration = data[index].tenure;

            if (duration <= 5) {
                this.shortLiability.push({
                    name: element.ltype,
                    out: element.outstandingpricipal
                });
            } else {
                this.longLiability.push({
                    name: element.ltype,
                    out: element.outstandingpricipal
                });
            }
        }
    }

    // income
    getIncome() {
        this.incomeService.GetIncome(this.uid).subscribe((response: any[]) => {
            let value = 0;
            response.forEach(element => {
                value = +value + +element.amount;
            });
            this.incomeTotal = value;
        });
    }

    // expense
    getExpense() {
        this.getUtility();
        this.getHousehold();
        this.getTravel();
        this.getMisc();
        this.getHealth();
        this.getLife();
        this.getGeneral();
        // this.getCredit();
        this.getLoan();
    }

    calcExpense(value, from) {
        this.expenseTotal = +this.expenseTotal + +value;

        this.surplus = +this.incomeTotal - +this.expenseTotal;
    }

    getGeneral(): void {
        this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.premium;
                });
                this.calcExpense(value, 'general');
            } else {
            }
        });
    }

    getHealth(): void {
        this.healthService.GetHealth(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.premium;
                });
                this.calcExpense(value, 'health');
            } else {
            }
        });
    }

    getHousehold(): void {
        this.houseService.GetHouse(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.amount;
                });
                this.calcExpense(value, 'house');
            } else {
            }
        });
    }

    getLife(): void {
        this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.premium;
                });
                this.calcExpense(value, 'life');
            } else {
            }
        });
    }

    getLoan() {
        this.loanService.GetLoan(this.uid).subscribe((response: any[]) => {
            let value = 0;
            if (response.length !== 0) {
                response.forEach(element => {
                    this.dbDate = new Date(element.ldate);
                    this.calculateEMI(element.amount, element.tenure, element.roi);
                    value = +value + +this.emi;
                });
                this.calcExpense(value, 'loan');
            } else {
            }
        });
    }

    calculateEMI(P, N, R) {
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
            this.emi = Math.round(this.emi);
        }
    }

    getMisc(): void {
        this.miscService.GetMisc(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.amount;
                });
                this.calcExpense(value, 'misc');
            } else {
            }
        });
    }

    getTravel(): void {
        this.travelService.GetTravel(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.amount;
                });
                this.calcExpense(value, 'travel');
            } else {
            }
        });
    }

    getUtility(): void {
        this.utilityService.GetUtility(this.uid).subscribe((response: any[]) => {
            if (response.length !== 0) {
                let value = 0;
                response.forEach(element => {
                    value = +value + +element.amount;
                });
                this.calcExpense(value, 'utility');
            } else {
            }
        });
    }
    // end expense

    onLiabilityEdit() {
        this.router.navigate(['liability']);
    }

    onAssetEdit() {
        this.router.navigate(['asstesroute']);
    }

    getGoal() {
        this.dashboardService.getGoal(this.uid).subscribe(data => {
            this.GoalArray = data;

            this.FillGoalCircle();
        });
    }

    linkAssetGoal() {
        this.router.navigate(['goalselect']);
    }

    FillGoalCircle() {
        this.HTMLGoalArray.splice(0, this.HTMLGoalArray.length);
        let flag = false;

        this.GoalArray.forEach(element => {
            let calc = 0;
            if (element.goalNotes === null && flag === false) {
                this.linkedasset = false;
            } else {
                flag = true;
                element.futurecost = Math.round(element.presentcost * Math.pow(1 + this.inflation, element.yeartogoal));

                calc = +element.goalNotes / +element.futurecost * 100;
                calc = Math.round(calc);

                this.HTMLGoalArray.push({
                    name: element.goalname,
                    percent: calc,
                    cost: element.futurecost,
                    tagged: element.goalNotes
                });

                this.linkedasset = true;
            }
        });
    }

    // asset
    getMutualFund(uid) {
        this.total = 0;
        this.dashboardService.getMutualFund(this.uid).subscribe(data => {
            this.result = data;
            if (this.result.length !== 0) {
                for (let i = 0; i < this.result.length; i++) {
                    this.total = this.total + +this.result[i].currentvalue;
                }
                this.assetTotal = +this.assetTotal + +this.total;
            } else {
            }
        });
    }

    getStock(uid) {
        this.totalStock = 0;
        this.dashboardService.getStock(this.uid).subscribe(data => {
            this.resultStock = data;

            if (this.resultStock !== 0) {
                for (let i = 0; i < this.resultStock.length; i++) {
                    this.totalStock = this.totalStock + +this.resultStock[i].no_of_shares;
                }
                this.assetTotal = +this.assetTotal + +this.totalStock;
            }
        });
    }

    getSaving(uid) {
        this.totalSaving = 0;
        this.dashboardService.getSaving(this.uid).subscribe(data => {
            this.resultSaving = data;

            if (this.resultSaving !== 0) {
                for (let i = 0; i < this.resultSaving.length; i++) {
                    this.totalSaving = this.totalSaving + +this.resultSaving[i].amount_invested;
                }
                this.assetTotal = +this.assetTotal + +this.totalSaving;
            }
        });
    }

    getChit(uid) {
        this.totalChit = 0;
        this.dashboardService.getChit(this.uid).subscribe(data => {
            this.resultChit = data;
            if (this.resultChit !== 0) {
                for (let i = 0; i < this.resultChit.length; i++) {
                    this.totalChit = this.totalChit + +this.resultChit[i].current_value;
                }
                this.assetTotal = +this.assetTotal + +this.totalChit;
            }
        });
    }

    getCash(uid) {
        this.totalCash = 0;
        this.dashboardService.getCash(this.uid).subscribe(data => {
            this.resultCash = data;
            if (this.resultCash !== 0) {
                for (let i = 0; i < this.resultCash.length; i++) {
                    this.totalCash = this.totalCash + +this.resultCash[i].amount;
                }
                this.assetTotal = +this.assetTotal + +this.totalCash;
            }
        });
    }

    getAlterInvestment(uid) {
        this.totalAlterInvestment = 0;
        this.dashboardService.getAlterInvestment(this.uid).subscribe(data => {
            this.resultAlterInvestment = data;
            if (this.resultAlterInvestment !== 0) {
                for (let i = 0; i < this.resultAlterInvestment.length; i++) {
                    this.totalAlterInvestment = this.totalAlterInvestment + +this.resultAlterInvestment[i].amount_invested;
                }
                this.assetTotal = +this.assetTotal + +this.totalAlterInvestment;
            }
        });
    }

    getPCJ(uid) {
        this.totalPCJ = 0;
        this.dashboardService.getPCJ(this.uid).subscribe(data => {
            this.resultPCJ = data;
            if (this.resultPCJ !== 0) {
                for (let i = 0; i < this.resultPCJ.length; i++) {
                    this.totalPCJ = this.totalPCJ + +this.resultPCJ[i].current_m_value;
                }
                this.assetTotal = +this.assetTotal + +this.totalPCJ;
            }
        });
    }

    getFAO(uid) {
        this.totalFAO = 0;
        this.dashboardService.getFAO(this.uid).subscribe(data => {
            this.resultFAO = data;

            if (this.resultFAO !== 0) {
                for (let i = 0; i < this.resultFAO.length; i++) {
                    this.totalFAO = this.totalFAO + +this.resultFAO[i].contract_m_value;
                }
                this.assetTotal = +this.assetTotal + +this.totalFAO;
            }

            this.piechart(
                this.total,
                this.totalStock,
                this.totalSaving,
                this.totalChit,
                this.totalCash,
                this.totalAlterInvestment,
                this.totalPCJ,
                this.totalFAO
            );
        });
    }

    piechart(total, totalStock, totalSaving, totalChit, totalCash, totalAlterInvestment, totalPCJ, totalFAO) {
        this.pieChartableLabels.push('MutualFund', 'stock', 'saving', 'chit', 'cash', 'alterInvest', 'pcj', 'fao');
        this.pieChartData.push(total, totalStock, totalSaving, totalChit, totalCash, totalAlterInvestment, totalPCJ, totalFAO);

        this.AssetArray.push(
            { name: 'Mutual Fund', value: total },
            { name: 'Stock', value: totalStock },
            { name: 'Saving Scheme', value: totalSaving },
            { name: 'Chit Fund', value: totalChit },
            { name: 'Cash', value: totalCash },
            { name: 'Alternative Investment', value: totalAlterInvestment },
            { name: 'Property, Jewellery & Others', value: totalPCJ },
            { name: 'Future and Options', value: totalFAO }
        );
        // this.assetChart = 'pie';
        this.colors = [
            {
                backgroundColor: ['#FF69B4', '#ff0000', '	#9400D3', '#696969', '#1E90FF', '#00CED1', '#FFD700', '#00FF00', '#FF4500']
            }
        ];
    }

    liabilitiesChart(totalLiabilities) {
        this.pieChartableLabel.push('totalLiabilities');
        this.pieChartDataa.push(totalLiabilities);
        this.color = [{ backgroundColor: ['#808080'] }];
    }

    // this.subject.next(1);
}
