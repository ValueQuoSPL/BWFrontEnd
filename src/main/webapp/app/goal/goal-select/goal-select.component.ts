import { GoalResolveService } from './goal-selectResolve.service';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService, LoginService } from 'app/core';
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
import { isNumber } from 'util';

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

class Available {
    assetid: number;
    available: number;
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
    deletegoaltype;
    conformkey: Boolean;
    account: any;
    mappingTemp: any;
    LogedIn = false;

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
    id;

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
    data: any;

    stockTotal;
    mutualTotal;
    chitTotal;
    cashTotal;
    propertyTotal;
    altTotal;
    savingTotal;
    faoTotal;
    inflation = 0.07;
    singleGoalToal: any;
    isAssetSelected: boolean;
    fundShortage: boolean;
    isLoaded: boolean;

    goalComplete = false;
    mappedValue: number;
    currentValue: number;
    availableValue: number;
    requiredValue: number;

    available: Available = new Available();
    afterMap: boolean;
    content: any;

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private goalSelectService: GoalselectService,
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
        private commonService: CommonSidebarService,
        private loginService: LoginService
    ) {
        // let id = this._route.paramMap.get("id");
        this.GoalArray = this._route.snapshot.data['goaldata'];

        if (this.GoalArray) {
            this.GoalArray.sort((a, b) => (a.yeartogoal > b.yeartogoal ? 1 : b.yeartogoal > a.yeartogoal ? -1 : 0));
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
    }

    ngOnInit() {
        this.singleAssetTotal = 0;
        this.GrandTotal = 0;
        this.singleGoalToal = 0;
        this.stockTotal = 0;
        this.mutualTotal = 0;
        this.chitTotal = 0;
        this.cashTotal = 0;
        this.propertyTotal = 0;
        this.altTotal = 0;
        this.savingTotal = 0;
        this.faoTotal = 0;
        this.FetchId();
        this.checkLogIn();
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
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
        this.Vacationselect.goaltype = this.goaltype;
        this.Vacationselect.uid = this.uid;
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
        this.resetValues();
        this.isValid = false;
    }
    linkAssets() {
        this.router.navigate(['goalAdd']);
    }
    selectChange(event: any) {
        this.selectedday = event.target.value;
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
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.user = account;
            this.uid = this.user.id;
            this.mapping.uid = this.uid;
            this.getGoal();
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

        // this.goalSelectService.GetMapping(this.uid, this.commonid).subscribe(data => {
        //     this.AssetMappingDB = data;
        // });
    }
    viewUpdate() {
        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];

            // view update of modal for available cost
            if (element.id === this.commonid) {
                this.PresentCost = element.presentcost;
                this.GrandTotal = element.goalNotes;
                this.AvailableCost = +this.PresentCost - +this.GrandTotal;
                if (this.AvailableCost <= 0) {
                    this.goalComplete = true;
                    this.AvailableCost = 0;
                }
            }

            // Calculate future cost
            element.futurecost = Math.round(element.presentcost * Math.pow(1 + this.inflation, element.yeartogoal));

            /**
             * this.R = ((this.s) / ((( Math.pow ( 1 + this.ir, this.N) - 1) / this.ir) * (1 + this.ir)));
             */

            // Calculate required monthly investment
            const N = element.yeartogoal * 12;
            const IR = this.inflation / 12;
            element.requiremonthinvest = Math.round(element.futurecost / ((Math.pow(1 + IR, N) - 1) / IR * (1 + IR)));

            // calculate fund shortage
            element.isFundShortage = true;
            element.fundshortage = +element.presentcost - +element.goalNotes;
            if (element.fundshortage <= 0) {
                element.fundshortage = 0;
                element.isFundShortage = false;
            }
        }
    }

    /**
     * called by html when we click on link asset icon for particular goal
     * @author : Pratik
     * @param editLinkModal : Html page id for open ng-template
     * @param goalid : goal id for clicked goal
     * @param SingleGoalGrand : single goal tagged asset total from html page
     */
    openLinkAsset(editLinkModal, goalid, SingleGoalGrand) {
        this.isAssetSelected = false;
        this.goalComplete = false;
        this.afterMap = false;
        this.singleGoalToal = SingleGoalGrand;
        this.assettype = null;
        this.singleAssetTotal = 0;
        this.commonid = goalid;
        this.viewUpdate();

        this.HTMLArray.splice(0, this.HTMLArray.length);

        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];
            if (goalid === element.id) {
                this.PresentCost = Number(element.presentcost);
                this.GrandTotal = Number(element.goalNotes);

                // check goal complete or not

                if (this.PresentCost <= this.GrandTotal) {
                    alert('Congratulation! This Goal has completed its mapping');
                    this.goalComplete = true;
                }
                break;
            }
        }
        this.modalService.open(editLinkModal, { ariaLabelledBy: 'editLinkModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.clearAssetTotal();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    clearAssetTotal() {
        this.stockTotal = 0;
        this.mutualTotal = 0;
        this.chitTotal = 0;
        this.cashTotal = 0;
        this.propertyTotal = 0;
        this.faoTotal = 0;
        this.savingTotal = 0;
        this.altTotal = 0;
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

    deleteRecord(id) {}

    get(assetid) {}

    getMappedAsset() {
        this.goalSelectService.GetMapping(this.uid, this.commonid).subscribe(data => {
            this.AssetMappingDB = data;

            this.AssetViewUpdate('get mapped Asset');
        });
    }

    AssetViewUpdate(from) {
        this.singleAssetTotal = 0;
        this.HTMLArray.forEach(html => {
            for (let index = 0; index < this.AssetMappingDB.length; index++) {
                const db = this.AssetMappingDB[index];
                html.mappedvalue = 0;

                if (this.commonid === db.goalid) {
                    if (this.assettype === db.assettype && html.id === db.assetid) {
                        html.mappedvalue = db.valuetomap;
                        break;
                    }
                }
            }
        });

        this.calculateSingleAssetTotal();
    }

    /**
     * Function called by clicking on map button
     * @param assetid: current asset id
     * @param value : asset mapped value from db
     * @param available : available asset value to map
     */
    getMapValue(assetid, value, available) {
        this.availableValue = Number(available);
        // Add by Sanjay---start
        if (this.availableValue === 0) {
            alert('Asset available value is 0 as it is mapped to some other goal. Please select another asset');
        }
        // Add by Sanjay---close
        if (this.availableValue !== 0) {
            this.valtomap = prompt('Enter value to map ');

            this.mappedValue = Number(value);
            this.currentValue = Number(this.valtomap);
            this.requiredValue = Number(this.AvailableCost);
            const ret = isNaN(this.currentValue);

            // filter for checking the previously mapping
            if (this.mappedValue === 0) {
                // filter for value should not be null
                if (this.currentValue !== null) {
                    // filter for value should be number
                    if (!ret) {
                        // filter for required value should be greater than available
                        if (this.requiredValue >= this.availableValue + this.mappedValue) {
                            // filter for value should be less than available value
                            if (this.currentValue <= this.availableValue + this.mappedValue) {
                                for (let index = 0; index < this.HTMLArray.length; index++) {
                                    const element = this.HTMLArray[index];
                                    if (element.id === assetid) {
                                        // filter for comparing record id with asset id
                                        element.mappedvalue = this.currentValue;
                                        this.calculateSingleAssetTotal();
                                        break;
                                    }
                                }
                                this.ManipulateMapping(assetid);
                            } else {
                                alert('Please Enter value which is less than Available value');
                            }
                        } else {
                            // filter for value should be less than required value
                            if (this.currentValue <= this.requiredValue + this.mappedValue) {
                                if (this.currentValue <= this.availableValue + this.mappedValue) {
                                    for (let index = 0; index < this.HTMLArray.length; index++) {
                                        const element = this.HTMLArray[index];
                                        if (element.id === assetid) {
                                            // filter for comparing record id with asset id
                                            element.mappedvalue = this.currentValue;
                                            this.calculateSingleAssetTotal();
                                            break;
                                        }
                                    }
                                    this.ManipulateMapping(assetid);
                                } else {
                                    alert('Please Enter value which is less than Available value ');
                                }
                            } else {
                                // tslint:disable-next-line:max-line-length
                                alert('Please Enter value which is less than Goal Requirement value');
                            }
                        }
                    } else {
                        alert('Please enter Numbers(Digits) Only');
                    }
                } else {
                    // clicked cancel button
                }
            } else {
                alert('Please unmap this value before re-map');
            }
        }
        // else {
        //     alert('Congratulation! Your Goal is Completed!');
        // }
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
        this.isLoaded = true;
        this.updateGoal();
        return this.singleAssetTotal;
    }

    updateGoal() {
        this.SetGrandTotal();
        this.goalSelectService.UpdateGoal(this.GoalNotesUpdate).subscribe(res => {});
    }

    SetGrandTotal() {
        let total = 0;
        this.AssetMappingDB.forEach(element => {
            if (this.commonid === element.goalid) {
                total = total + element.valuetomap;
            }
        });
        this.singleGoalToal = total;
        this.GrandTotal = total;

        this.AvailableCost = +this.PresentCost - +this.GrandTotal;
        if (this.AvailableCost <= 0) {
            this.AvailableCost = 0;
        }
        this.GoalNotesUpdate.splice(0, this.GoalNotesUpdate.length);

        this.GoalNotesUpdate.push({
            id: this.commonid,
            notes: this.GrandTotal
        });

        for (let index = 0; index < this.GoalArray.length; index++) {
            const element = this.GoalArray[index];

            if (element.id === this.commonid) {
                element.goalNotes = this.GrandTotal;
                element.fundshortage = +element.futurecost - +element.goalNotes;
                if (element.fundshortage <= 0) {
                    element.fundshortage = 0;
                    element.isFundShortage = false;
                }
                break;
            }
        }
    }

    ManipulateMapping(assetid) {
        for (let index = 0; index < this.HTMLArray.length; index++) {
            const asset = this.HTMLArray[index];

            if (asset.id === this.assetid) {
                this.fillObject(this.assetid);

                if (this.checked === true) {
                    this.SaveMapping();
                }
                break;
            }
        }
    }

    fillObject(assetid) {
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

        this.available.assetid = assetid;
        this.available.available = this.availableValue - this.currentValue;
        this.UpdateAsset();
    }

    SaveMapping() {
        let flag = 0;
        for (let index = 0; index < this.AssetMappingDB.length; index++) {
            const db = this.AssetMappingDB[index];
            if (this.mapping.goalid === db.goalid && this.mapping.assettype === db.assettype && this.mapping.assetid === db.assetid) {
                flag = 0;
                this.GlobalFlag = false;
                this.mapping.id = db.id;

                this.goalSelectService.PutMapping(this.mapping).subscribe(res => {
                    this.getAsset();
                });

                break;
            } else {
                flag = 1;
                this.GlobalFlag = true;
            }
        }

        if (flag === 1 || this.AssetMappingDB.length === 0) {
            this.mapping.id = null;
            this.goalSelectService.PostMapping(this.mapping).subscribe(res => {
                this.getAsset();
            });
        }

        this.afterMap = true;
    }

    getAsset() {
        this.isAssetSelected = true;
        this.isLoaded = false;

        if (this.assettype === 'Stocks') {
            this.getStockById(this.uid);
        } else if (this.assettype === 'Mutual Fund') {
            this.getMutualFundByUid(this.uid);
        } else if (this.assettype === 'Chit Fund') {
            this.getChitFund();
        } else if (this.assettype === 'Future And Option') {
            this.getFAO();
        } else if (this.assettype === 'Saving Scheme') {
            this.getSaving();
        } else if (this.assettype === 'Alternative Investment') {
            this.getAlt();
        } else if (this.assettype === 'Cash') {
            this.getCash();
        } else if (this.assettype === 'Property And Household') {
            this.getProperty();
        }
    }
    getStockById(uid) {
        this.HTMLArray.splice(0, this.HTMLArray.length);
        return new Promise((resolve, reject) => {
            this.stockService.getStockById(this.uid).subscribe(
                res => {
                    resolve(res);
                    this.stockout = res;
                    this.AssetArray = res;

                    this.AssetArray.forEach(element => {
                        this.HTMLArray.push({
                            id: element.id,
                            assetname: element.company_name,
                            assetvalue: element.share_price * element.no_of_shares,
                            mappedvalue: 0,
                            available: element.available,
                            disable: true
                        });
                    });

                    this.getMappedAsset();
                },
                err => {
                    reject(err);
                }
            );
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
                    available: element.available,
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
                    available: element.available,
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
                    available: element.available,
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
                    available: element.available,
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
                    available: element.available,
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
                    assetname: element.cashsource,
                    assetvalue: element.amount,
                    mappedvalue: 0,
                    available: element.available,
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
                    available: element.available,
                    disable: true
                });
            });
            this.getMappedAsset();
        });
    }
    clear() {
        this.isValid = true;
    }
    resetValues() {
        this.goaltype = '';
        this.Educationselect.goaltype = '';
        this.Educationselect.goalname = '';
        this.Educationselect.priority = '';
        this.Educationselect.price = '';
        this.Educationselect.duration = '';
        this.Educationselect.notes = '';
        this.Educationselect.dateofcreation = '';
        this.Educationselect.yeartogoal = '';
        this.Educationselect.presentcost = '';
        this.goalselect.goaltype = '';
        this.goalselect.goalname = '';
        this.goalselect.priority = '';
        this.goalselect.dateofcreation = '';
        this.goalselect.yeartogoal = '';
        this.goalselect.presentcost = '';
        this.Vehicleselect.goaltype = '';
        this.Vehicleselect.goalname = '';
        this.Vehicleselect.priority = '';
        this.Vehicleselect.price = '';
        this.Vehicleselect.dateofcreation = '';
        this.Vehicleselect.yeartogoal = '';
        this.Vehicleselect.presentcost = '';
        this.Childbirthselect.goaltype = '';
        this.Childbirthselect.goalname = '';
        this.Childbirthselect.priority = '';
        this.Childbirthselect.price = '';
        this.Childbirthselect.dateofcreation = '';
        this.Childbirthselect.yeartogoal = '';
        this.Childbirthselect.presentcost = '';
        this.Merrageselect.goaltype = '';
        this.Merrageselect.goalname = '';
        this.Merrageselect.priority = '';
        this.Merrageselect.price = '';
        this.Merrageselect.dateofcreation = '';
        this.Merrageselect.yeartogoal = '';
        this.Merrageselect.presentcost = '';
        this.Businessselect.goaltype = '';
        this.Businessselect.goalname = '';
        this.Businessselect.priority = '';
        this.Businessselect.price = '';
        this.Businessselect.dateofcreation = '';
        this.Businessselect.yeartogoal = '';
        this.Businessselect.presentcost = '';
        this.FamilySupportselect.goaltype = '';
        this.FamilySupportselect.goalname = '';
        this.FamilySupportselect.priority = '';
        this.FamilySupportselect.price = '';
        this.FamilySupportselect.dateofcreation = '';
        this.FamilySupportselect.yeartogoal = '';
        this.FamilySupportselect.presentcost = '';
        this.Vacationselect.goaltype = '';
        this.Vacationselect.goalname = '';
        this.Vacationselect.priority = '';
        this.Vacationselect.price = '';
        this.Vacationselect.dateofcreation = '';
        this.Vacationselect.yeartogoal = '';
        this.Vacationselect.presentcost = '';
        this.EmergencyFundselect.goaltype = '';
        this.EmergencyFundselect.goalname = '';
        this.EmergencyFundselect.priority = '';
        this.EmergencyFundselect.price = '';
        this.EmergencyFundselect.dateofcreation = '';
        this.EmergencyFundselect.yeartogoal = '';
        this.EmergencyFundselect.presentcost = '';
        this.RetirementFundselect.goaltype = '';
        this.RetirementFundselect.goalname = '';
        this.RetirementFundselect.priority = '';
        this.RetirementFundselect.price = '';
        this.RetirementFundselect.dateofcreation = '';
        this.RetirementFundselect.yeartogoal = '';
        this.RetirementFundselect.presentcost = '';
        this.NewGoalselect.goaltype = '';
        this.NewGoalselect.goalname = '';
        this.NewGoalselect.priority = '';
        this.NewGoalselect.price = '';
        this.NewGoalselect.dateofcreation = '';
        this.NewGoalselect.yeartogoal = '';
        this.NewGoalselect.presentcost = '';
    }

    deleteGoal(goalid, content) {
        this.content = content;
        this.commonid = goalid;
        this.conformkey = confirm('Are you sure you Want to permanently delete this goal?');

        if (this.conformkey === true) {
            this.getMapping(goalid, 'deleteHelp');
        }
    }

    deleteHelper(goalid, data, helpText) {
        if (helpText === 'deleteHelp') {
            let flag = false;
            for (let index = 0; index < data.length; index++) {
                const db = data[index];

                if (this.commonid === db.goalid) {
                    flag = true;

                    break;
                } else {
                    console.error('7. mapping not found');
                    flag = false;
                }
            }

            if (flag === true) {
                const ret = confirm('Before deleting this goal, unmap all assets which are mapped to this goal');
                if (ret) {
                    this.viewMapping(goalid, this.content);
                } else {
                    alert('You cant delete goal without unmapping assets!');
                }
            } else {
                this.goalSelectService.DeleteGoal(this.commonid).subscribe(() => {
                    this.getGoal();
                });
            }
        }
    }

    // unmap from asset linking
    deleteMapping(assetid, availableValue, mappedValue) {
        const ret = confirm('Are you sure to you want to permanently delete mapping? This cant be undone!');

        if (ret) {
            this.available.assetid = assetid;
            this.available.available = +availableValue + +mappedValue;
            this.UpdateAsset();

            for (let j = 0; j < this.AssetMappingDB.length; j++) {
                const row = this.AssetMappingDB[j];
                if (row.assettype === this.assettype && row.assetid === assetid) {
                    const res = this.goalSelectService.DeleteMapping(row.id).subscribe(resdata => {
                        this.goalComplete = false;
                        this.getAsset();
                        this.getMappedAsset();
                    });
                    break;
                }
            }
        } else {
        }
        // this.goalSelectService.DeleteMapping(id).subscribe();
    }

    // unmap from mapped asset view
    deleteMappingToDeleteGoal(assetid, mappedValue, mappingid, goalid) {
        const ret = confirm('Delete this Mapping?, this cant be undone!');
        if (ret === true) {
            this.available.assetid = assetid;
            this.available.available = this.availableValue + mappedValue;
            this.UpdateAsset();

            this.goalSelectService.DeleteMapping(mappingid).subscribe(resdata => {
                this.goalComplete = false;
                this.getMapping(goalid, 'alreadyMapped');
                this.getMappedAsset();
            });
        }
    }

    async getMapping(goalid: number, helpText: string) {
        return new Promise((resolve, reject) => {
            this.goalSelectService.GetMapping(this.uid, goalid).subscribe(
                response => {
                    resolve(response);
                    this.MappedArrayDB = response;
                    this.deleteHelper(goalid, this.MappedArrayDB, helpText);
                    this.MappedArray.splice(0, this.MappedArray.length);
                    for (let index = 0; index < this.MappedArrayDB.length; index++) {
                        const element = this.MappedArrayDB[index];
                        if (element.goalid === goalid) {
                            this.MappedArray.push({ element });
                        }
                    }
                },
                err => {
                    reject(err);
                }
            );
        });
    }

    viewMapping(goalid, content) {
        this.goalid = goalid;

        this.MappedArray.splice(0, this.MappedArray.length);

        for (let index = 0; index < this.GoalArray.length; index++) {
            const goal = this.GoalArray[index];
            if (goal.id === this.goalid) {
                this.viewGoal(goalid, content);
                break;
            } else {
            }
        }
    }

    viewGoal(goalid, content) {
        // let total = 0;
        // this.goalSelectService.GetMapping(this.uid).subscribe(res => {
        //     this.MappedArrayDB = res;
        //     for (let index = 0; index < this.MappedArrayDB.length; index++) {
        //         const element = this.MappedArrayDB[index];
        //         if (element.goalid === goalid) {
        //             total = total + element.mappedvalue;
        //             this.MappedArray.push({ element });
        //         }
        //     }
        this.getMapping(goalid, 'viewGoal');

        this.OpenMappedAsset(content);
        // });
    }

    OpenMappedAsset(content) {
        this.modalService.open(content, { ariaLabelledBy: 'viewLinkedAssetModal', size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    UpdateAsset() {
        if (this.assettype === 'stocks') {
            this.updateStock();
        } else if (this.assettype === 'mutual') {
            this.updateMutualFund();
        } else if (this.assettype === 'ChitFund') {
            this.updateChitFund();
        } else if (this.assettype === 'FutureandOption') {
            this.updateFAO();
        } else if (this.assettype === 'SavingScheme') {
            this.updateSaving();
        } else if (this.assettype === 'AlternativeInvestment') {
            this.updateAlt();
        } else if (this.assettype === 'cash') {
            this.updateCash();
        } else if (this.assettype === 'Propertyandhousehold') {
            this.updateProperty();
        }
    }
    updateProperty(): any {
        this.propService.updateAvailable(this.available).subscribe();
    }
    updateCash(): any {
        this.cashService.updateAvailable(this.available).subscribe();
    }
    updateAlt(): any {
        this.altService.updateAvailable(this.available).subscribe();
    }
    updateSaving(): any {
        this.savingService.updateAvailable(this.available).subscribe();
    }
    updateFAO(): any {
        this.faoService.updateAvailable(this.available).subscribe();
    }
    updateChitFund(): any {
        this.chitService.updateAvailable(this.available).subscribe();
    }
    updateMutualFund(): any {
        this.Mutualfundservice.updateAvailable(this.available).subscribe();
    }
    updateStock(): any {
        this.stockService.updateAvailable(this.available).subscribe();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    checkLogIn() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.LogedIn = true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
