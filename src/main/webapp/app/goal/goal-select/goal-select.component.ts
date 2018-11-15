import { GoalResolveService } from './goal-selectResolve.service';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GoalselectService } from 'app/goal/goal-select/goalselect.service';
import { MatDialog } from '@angular/material';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { GoalAddButtonComponent } from 'app/goal/goal-add-button/goal-add-button.component';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { CashService } from 'app/my-assets/cash/cash.service';
import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
import { PropertyService } from 'app/my-assets/property/property.service';
import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {
    GoalSelect,
    EducationSelect,
    VehicleSelect,
    ChildBirthSelect,
    MerrageSelect,
    BusinessSelect,
    FamilySupportSelect,
    VacationSelect,
    EmergencyFundSelect,
    RetirementFundSelect,
    NewGoalSelect
} from 'app/goal/goal-select/goalselect.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core';
import { keyframes } from '@angular/animations';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

class Mapping {
    id;
    uid;
    goalid;
    assetname;
    assetid;
    valuetomap;
    assetValue;
    assettype;
}

// class GoalUpdate {
//   id;
//   notes;
// }

@Component({
    selector: 'jhi-goal-select',
    templateUrl: './goal-select.component.html',
    styleUrls: ['./goal-select.component.css']
})
export class GoalSelectComponent implements OnInit {
    selectedday = '';
    isValid: boolean;
    isSaving: boolean;
    resource: any;
    amount: any;
    closeResult: string;
    assettype: any;
    dialogRef: any;
    commonid: number;
    AssetArray: any;
    assetname: any = [];
    mapping: Mapping = new Mapping();
    checked;
    mutualres: any;
    valtomap: any;
    HTMLArray: any = [];

    goalselect: GoalSelect = new GoalSelect();
    Educationselect: EducationSelect = new EducationSelect();
    Vehicleselect: VehicleSelect = new VehicleSelect();
    Childbirthselect: ChildBirthSelect = new ChildBirthSelect();
    Merrageselect: MerrageSelect = new MerrageSelect();
    Businessselect: BusinessSelect = new BusinessSelect();
    FamilySupportselect: FamilySupportSelect = new FamilySupportSelect();
    Vacationselect: VacationSelect = new VacationSelect();
    EmergencyFundselect: EmergencyFundSelect = new EmergencyFundSelect();
    RetirementFundselect: RetirementFundSelect = new RetirementFundSelect();
    NewGoalselect: NewGoalSelect = new NewGoalSelect();

    GoalNotesUpdate: any = []; // amount
    modalRef: NgbModalRef;
    goaltype: any;
    userId: any;
    user: any;
    public uid: any;
    public output: any;
    animal: string;
    name: string;
    stockout: any = [];
    keyid: number;

    tempArray: any = [];
    AssetMappingDB: any = [];
    AfterDeleteAssetMappingDB: any = [];
    MappedArray: any = [];
    MappedArrayDB: any = [];
    GoalArray: any = [];
    SingleGoal: any = [];
    goalid: any;
    assetid: any;
    singleAssetTotal;
    AvailableCost;
    GrandTotal;
    PrevGrandTotal;
    PresentCost;
    prevGoalID;
    GlobalFlag;

    stockTotal;
    mutualTotal;
    chitTotal;
    cashTotal;
    propertyTotal;
    altTotal;
    savingTotal;
    faoTotal;
    inflation = 0.07;

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private goalSelectService: GoalselectService,
        private ActiveModal: NgbActiveModal,
        private account: AccountService,
        public dialog: MatDialog,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public stockService: StockService,
        public Mutualfundservice: MutualfundService,
        public altService: AlternateService,
        public cashService: CashService,
        public chitService: ChitFundService,
        public propService: PropertyService,
        public faoService: FutureOptionService,
        public savingService: SavingSchemeService,
        private _route: ActivatedRoute,
        private commonService: CommonSidebarService
    ) {
        this.GoalArray = this._route.snapshot.data['goaldata'];

        this.output = this.GoalArray;
        for (let i = 0; i < this.output.length; i++) {
            const element = this.output[i];
            if (element.uid === 0) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        }
    }

    ngOnInit() {
        this.singleAssetTotal = 0;
        this.GrandTotal = 0;
        this.stockTotal = 0;
        this.mutualTotal = 0;
        this.chitTotal = 0;
        this.cashTotal = 0;
        this.propertyTotal = 0;
        this.altTotal = 0;
        this.savingTotal = 0;
        this.faoTotal = 0;
        this.FetchId();
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }
    Home() {
        this.goalselect.goaltype = this.goaltype;
        this.goalselect.uid = this.uid;
        this.goalSelectService.saveHome(this.goalselect).subscribe(
            responce => {
                this.getGoal();
            },
            error => {}
        );
        this.isValid = true;
    }

    Education() {
        this.Educationselect.goaltype = this.goaltype;
        this.Educationselect.uid = this.uid;
        this.goalSelectService.saveEducation(this.Educationselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Vehicle() {
        this.Vehicleselect.goaltype = this.goaltype;
        this.Vehicleselect.uid = this.uid;
        this.goalSelectService.saveVehicle(this.Vehicleselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Childbirth() {
        this.Childbirthselect.goaltype = this.goaltype;
        this.Childbirthselect.uid = this.uid;
        this.goalSelectService.saveChildBirth(this.Childbirthselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Merrage() {
        this.Merrageselect.goaltype = this.goaltype;
        this.Merrageselect.uid = this.uid;
        this.goalSelectService.saveMerrage(this.Merrageselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Business() {
        this.Businessselect.goaltype = this.goaltype;
        this.Businessselect.uid = this.uid;
        this.goalSelectService.saveBusiness(this.Businessselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Familysupport() {
        this.FamilySupportselect.goaltype = this.goaltype;
        this.FamilySupportselect.uid = this.uid;
        this.goalSelectService.saveFamilySupport(this.FamilySupportselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    Vacation() {
        this.goalSelectService.saveVacation(this.Vacationselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    EmergencyFund() {
        this.EmergencyFundselect.goaltype = this.goaltype;
        this.EmergencyFundselect.uid = this.uid;
        this.goalSelectService.saveEmergencyFund(this.EmergencyFundselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    RetairementFund() {
        this.RetirementFundselect.goaltype = this.goaltype;
        this.RetirementFundselect.uid = this.uid;
        this.goalSelectService.saveRetirementFund(this.RetirementFundselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    NewGoal() {
        this.NewGoalselect.goaltype = this.goaltype;
        this.NewGoalselect.uid = this.uid;
        this.goalSelectService.saveNewGoal(this.NewGoalselect).subscribe(responce => {
            this.getGoal();
        });
        this.isValid = true;
    }
    AddGoal() {
        this.isValid = false;
    }
    linkAssets() {
        this.router.navigate(['goalAdd']);
    }
    selectChange(event: any) {
        this.selectedday = event.target.value;
    }
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.user = account;
            this.uid = this.user.id;
            this.mapping.uid = this.uid;
        });
    }

    getGoal() {
        this.goalSelectService.getgoalbyid().subscribe(res => {
            this.GoalArray = res;
            this.viewUpdate();
            this.output = this.GoalArray;
            for (let i = 0; i < this.output.length; i++) {
                const element = this.output[i];
                if (element.uid === 0) {
                    this.isValid = false;
                } else {
                    this.isValid = true;
                }
            }
        });

        this.goalSelectService.GetMapping(this.uid).subscribe(data => {
            this.AssetMappingDB = data;
        });
    }

    viewUpdate() {
        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];

            // view update of modal for available cost
            if (element.id === this.commonid) {
                this.PresentCost = element.presentcost;
                this.GrandTotal = element.goalNotes;
                this.AvailableCost = +this.PresentCost - +this.GrandTotal;
            }

            let F = 0;
            F = this.calculateFuturecCost(element.presentcost, element.yeartogoal);
            element.futurecost = F;

            let M = 0;
            M = this.calculateMonthlyAmount(element.futurecost, element.yeartogoal);
            element.requiremonthinvest = M;
            element.fundshortage = +element.futurecost - +element.goalNotes;
        }
    }

    calculateFuturecCost(C, Y) {
        let F = 0;
        let K = 0;
        K = C * Math.pow(1 + this.inflation, Y);
        F = Math.round(K);

        return F;
    }
    // F = M((((1+R)^n)-1)/R) (1+R)
    // M = F / ( ( ( (1+R)^n)-1)/R) (1+R)
    // Where
    // M = Regular monthly investment
    // F = Future value of investment
    // R = Interest rate assumed / 12
    // N = Duration (number of months or number of years *12)
    calculateMonthlyAmount(F, Y) {
        let N = 0,
            R = 0,
            M = 0;
        N = Y * 12;
        R = this.inflation;

        M = Math.round(F / ((Math.pow(1 + R, N) - 1) / R * (1 + R)));
        return M;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(GoalAddButtonComponent, {
            width: '550px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    getGoalbyId(commonid) {
        this.goalSelectService.getGoalbyId(this.commonid).subscribe(res => {
            this.SingleGoal = res;
        });
    }
    openLinkAsset(editLinkModal, goalid) {
        this.commonid = goalid;
        this.viewUpdate();
        this.HTMLArray.splice(0, this.HTMLArray.length);

        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];
            if (goalid === element.id) {
                this.PresentCost = element.presentcost;
                this.GrandTotal = element.goalNotes;
                break;
            }
        }

        this.getGoalbyId(this.commonid);
        this.modalService.open(editLinkModal, { ariaLabelledBy: 'editLinkModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.updateGoal();
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
    updateGoal() {
        this.SetGrandTotal();

        this.goalSelectService.UpdateGoal(this.GoalNotesUpdate).subscribe(res => {});
    }

    SetGrandTotal() {
        this.GrandTotal =
            +this.stockTotal +
            +this.mutualTotal +
            +this.chitTotal +
            +this.cashTotal +
            +this.propertyTotal +
            +this.faoTotal +
            +this.savingTotal +
            +this.altTotal;

        this.AvailableCost = +this.PresentCost - +this.GrandTotal;
        this.GoalNotesUpdate.splice(0, this.GoalNotesUpdate.length);

        this.GoalNotesUpdate.push({
            id: this.commonid,
            notes: this.GrandTotal
        });

        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];

            if (element.id === this.commonid) {
                element.goalNotes = this.GrandTotal;
                break;
            }
        }
    }

    selectedRecord(checked, id) {
        this.assetid = id;
        this.checked = checked;

        for (let index = 0; index < this.HTMLArray.length; index++) {
            const element = this.HTMLArray[index];

            if (element.id === id) {
                if (checked) {
                    element.disable = false;
                } else {
                    element.disable = true;
                }
                break;
            }
        }
    }

    getMapValue(assetid) {
        this.valtomap = prompt('Enter value to map ');

        for (let index = 0; index < this.HTMLArray.length; index++) {
            const element = this.HTMLArray[index];

            if (element.id === assetid) {
                if (element.assetvalue >= this.valtomap) {
                    element.mappedvalue = this.valtomap;
                    const total = this.calculateSingleAssetTotal();
                } else {
                    alert('Please enter value which is less than Asset Value');
                }
                break;
            }
        }
        this.ManipulateMapping(assetid);
    }

    calculateSingleAssetTotal() {
        this.singleAssetTotal = 0;

        for (let index = 0; index < this.HTMLArray.length; index++) {
            const element = this.HTMLArray[index];
            this.singleAssetTotal = this.singleAssetTotal + +element.mappedvalue;
        }

        if (this.assettype === 'stocks') {
            this.stockTotal = this.singleAssetTotal;
        } else if (this.assettype === 'mutual') {
            this.mutualTotal = this.singleAssetTotal;
        } else if (this.assettype === 'ChitFund') {
            this.chitTotal = this.singleAssetTotal;
        } else if (this.assettype === 'FutureandOption') {
            this.faoTotal = this.singleAssetTotal;
        } else if (this.assettype === 'SavingScheme') {
            this.savingTotal = this.singleAssetTotal;
        } else if (this.assettype === 'AlternativeInvestment') {
            this.altTotal = this.singleAssetTotal;
        } else if (this.assettype === 'cash') {
            this.cashTotal = this.singleAssetTotal;
        } else if (this.assettype === 'Propertyandhousehold') {
            this.propertyTotal = this.singleAssetTotal;
        }

        return this.singleAssetTotal;
    }

    ManipulateMapping(assetid) {
        for (let index = 0; index < this.HTMLArray.length; index++) {
            const asset = this.HTMLArray[index];

            if (asset.id === this.assetid) {
                this.findAssetAndFillMapping(this.assetid);

                if (this.checked === true) {
                    this.PostMapping();
                    this.SetGrandTotal();
                } else {
                    for (let j = 0; j < this.AssetMappingDB.length; j++) {
                        const row = this.AssetMappingDB[j];
                        if (row.assettype === this.assettype && row.assetid === assetid) {
                            const res = this.goalSelectService.DeleteMapping(row.id).subscribe();
                            break;
                        }
                    }
                }
                break;
            }
        }
    }

    PostMapping() {
        let flag = 0;
        for (let index = 0; index < this.AssetMappingDB.length; index++) {
            const db = this.AssetMappingDB[index];
            if (this.mapping.goalid === db.goalid && this.mapping.assettype === db.assettype && this.mapping.assetid === db.assetid) {
                flag = 0;
                this.GlobalFlag = false;
                this.mapping.id = db.id;

                this.goalSelectService.PutMapping(this.mapping).subscribe(res => {
                    this.getMappedAsset();
                });

                break;
            } else {
                flag = 1;
                this.GlobalFlag = true;
            }
        }

        if (flag === 1 || this.AssetMappingDB.length === 0) {
            this.goalSelectService.PostMapping(this.mapping).subscribe(res => {
                this.getMappedAsset();
            });
        }
    }

    findAssetAndFillMapping(assetid) {
        for (let index = 0; index < this.HTMLArray.length; index++) {
            const element = this.HTMLArray[index];
            if (assetid === element.id) {
                this.mapping.goalid = this.commonid;
                this.mapping.assettype = this.assettype;
                this.mapping.assetname = element.assetname;
                this.mapping.assetid = element.id;
                this.mapping.assetValue = element.assetvalue;
                this.mapping.valuetomap = element.mappedvalue;
                break;
            }
        }
    }

    viewByGoalId(id, content) {
        this.goalid = id;

        this.MappedArray.splice(0, this.MappedArray.length);

        for (let index = 0; index < this.GoalArray.length; index++) {
            const goal = this.GoalArray[index];
            if (goal.id === this.goalid) {
                this.viewGoal(id, content);
                break;
            } else {
            }
        }
    }

    viewGoal(id, content) {
        this.goalSelectService.GetMapping(this.uid).subscribe(res => {
            this.MappedArrayDB = res;
            for (let index = 0; index < this.MappedArrayDB.length; index++) {
                const element = this.MappedArrayDB[index];
                if (element.goalid === id) {
                    this.MappedArray.push({ element });
                }
            }
            this.OpenMappedAsset(content);
        });
    }

    OpenMappedAsset(content) {
        this.modalService.open(content, { ariaLabelledBy: 'viewLinkedAssetModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    deleteRecord(id) {}

    get(assetid) {}

    getAsset() {
        if (this.assettype === 'stocks') {
            this.getStockById(this.uid);
        } else if (this.assettype === 'mutual') {
            this.getMutualFundByUid(this.uid);
        } else if (this.assettype === 'ChitFund') {
            this.getChitFund();
        } else if (this.assettype === 'FutureandOption') {
            this.getFAO();
        } else if (this.assettype === 'SavingScheme') {
            this.getSaving();
        } else if (this.assettype === 'AlternativeInvestment') {
            this.getAlt();
        } else if (this.assettype === 'cash') {
            this.getCash();
        } else if (this.assettype === 'Propertyandhousehold') {
            this.getProperty();
        }
    }
    getMappedAsset() {
        this.goalSelectService.GetMapping(this.uid).subscribe(data => {
            this.AssetMappingDB = data;
            this.AssetViewUpdate();
        });
    }

    AssetViewUpdate() {
        this.singleAssetTotal = 0;
        this.HTMLArray.forEach(html => {
            for (let index = 0; index < this.AssetMappingDB.length; index++) {
                const db = this.AssetMappingDB[index];
                if (this.commonid === db.goalid && this.assettype === db.assettype && html.id === db.assetid) {
                    html.mappedvalue = db.valuetomap;
                    break;
                }
            }
        });

        this.calculateSingleAssetTotal();
    }

    getStockById(uid) {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.stockService.getStockById(this.uid).subscribe(res => {
            this.stockout = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.company_name,
                    assetvalue: element.share_price,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getMutualFundByUid(uid) {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.Mutualfundservice.getMutualFund(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.mfscheme,
                    assetvalue: element.currentvalue,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getChitFund() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.chitService.getChitByuid(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.chit_name,
                    assetvalue: element.current_value,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getFAO() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.faoService.getFAOByUid(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.asset_name,
                    assetvalue: element.contract_m_value,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getSaving() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.savingService.getSavingScheme(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.organisation_name,
                    assetvalue: element.amount_invested,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getAlt() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.altService.getAltInvestmentByuid(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.fund_name,
                    assetvalue: element.market_value,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getCash() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.cashService.getCashDetailsByuid(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.cash_source,
                    assetvalue: element.amount,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    getProperty() {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        this.propService.getsavePropertyByuid(this.uid).subscribe(res => {
            this.mutualres = res;
            this.AssetArray = res;
            this.AssetArray.forEach(element => {
                this.HTMLArray.push({
                    id: element.id,
                    assetname: element.prop_name,
                    assetvalue: element.current_m_value,
                    mappedvalue: 0,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    clear() {
        this.isValid = true;
    }
}
