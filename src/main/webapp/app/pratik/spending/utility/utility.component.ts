import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';
import { Utility } from '../spending.model';
import { UtilityService } from '../spending.service';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';

class NewUtility {
    dynamicUtility: any = [];
    userid;
}

@Component({
    selector: 'jhi-utility',
    templateUrl: './utility.component.html',
    styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    totalUtility;
    loadUtility: boolean;
    dataChanged: boolean;
    changesSaved: boolean;
    isUtilityData: boolean;
    UtilityArray: any = [];
    tempUtilityArray: any = [];
    dynamicUtilityArray: any = [];
    utility: Utility = new Utility();
    newUtility: NewUtility = new NewUtility();
    prevValue: any;
    globalflag: boolean;
    isFieldChange: boolean;

    constructor(
        private utilityService: UtilityService,
        private modalService: NgbModal,
        private accountService: AccountService,
        private routeGuard: SpendingRouteGuardService
    ) {}

    ngOnInit() {
        this.getUserid();

        this.totalUtility = 0;
        this.utility.electricity = 0;
        this.utility.gas = 0;
        this.utility.internet = 0;
        this.utility.mobile = 0;
        this.utility.news = 0;
        this.utility.telephone = 0;
        this.utility.tv = 0;
        this.utility.vcd = 0;
        this.utility.water = 0;
    }

    DetectChange(currentValue) {
        if (this.prevValue === currentValue || currentValue === null) {
            this.globalflag = false;
            this.isFieldChange = false;
        } else {
            this.globalflag = true;
            this.isFieldChange = true;
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
                    this.GetUtility();
                } else {
                }
            })
            .catch(err => {});
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';
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

    openUtility(content) {
        this.modalService.open(content, { ariaLabelledBy: 'expense-modal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddUtility();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    calcUtilityTotal() {
        this.totalUtility = 0;
        for (let i = 0; i < this.dynamicUtilityArray.length; i++) {
            const value1 = +this.dynamicUtilityArray[i].value;
            this.totalUtility = +this.totalUtility + value1;
        }
    }

    AddUtility() {
        this.dynamicUtilityArray.push({
            name: this.resource,
            value: this.expense
        });

        this.calcUtilityTotal();
        this.newUtility.dynamicUtility.pop();
        this.newUtility.dynamicUtility.push({
            name: this.resource,
            value: this.expense
        });
        this.newUtility.userid = this.uid;
        this.utilityService.PostUtility(this.newUtility).subscribe();
        this.clear();
    }

    RemoveUtility(index, id) {
        this.utilityService.DeleteUtility(id).subscribe(responce => {});
        this.dynamicUtilityArray.splice(index, 1);
        this.calcUtilityTotal();
    }

    SaveUtility(): void {
        this.utility.userid = this.uid;
        // this.utility.dynamicUtility = this.dynamicUtilityArray;
        this.utilityService.PostUtility(this.utility).subscribe(data => {
            alert('Your utility data saved');
            this.routeGuard.GuardSource.next(false);

            this.isUtilityData = true;
            this.changesSaved = true;
        });
    }

    GetUtility(): void {
        this.utilityService.GetUtility(this.uid).subscribe((response: any[]) => {
            this.UtilityArray = response;
            if (this.UtilityArray.length === 0) {
                this.isUtilityData = false;
            } else {
                this.isUtilityData = true;
                this.FillUtilityData();
            }
        });
    }

    FillUtilityData() {
        for (let i = 0; i < this.UtilityArray.length; i++) {
            if (this.UtilityArray[i].name === 'electricity') {
                this.utility.electricity = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'gas') {
                this.utility.gas = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'water') {
                this.utility.water = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'telephone') {
                this.utility.telephone = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'mobile') {
                this.utility.mobile = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'internet') {
                this.utility.internet = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'tv') {
                this.utility.tv = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'vcd') {
                this.utility.vcd = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name === 'news') {
                this.utility.news = +this.UtilityArray[i].amount;
            } else if (this.UtilityArray[i].name !== 'userid') {
                this.dynamicUtilityArray.push({
                    id: this.UtilityArray[i].id,
                    name: this.UtilityArray[i].name,
                    value: this.UtilityArray[i].amount
                });
            }
        }
        this.loadUtility = true;
        this.calcUtilityTotal();
    }

    isFieldChanged() {
        return true;
    }

    onEditStaticField(nameField, modal) {
        if (nameField === 'electricity') {
            this.nameField = 'Electricity';
            this.editField = this.utility.electricity;
        } else if (nameField === 'gas') {
            this.nameField = 'Gas';
            this.editField = this.utility.gas;
        } else if (nameField === 'water') {
            this.nameField = 'Water';
            this.editField = this.utility.water;
        } else if (nameField === 'telephone') {
            this.nameField = 'Telephone';
            this.editField = this.utility.telephone;
        } else if (nameField === 'mobile') {
            this.nameField = 'Mobile';
            this.editField = this.utility.mobile;
        } else if (nameField === 'internet') {
            this.nameField = 'Internet';
            this.editField = this.utility.internet;
        } else if (nameField === 'tv') {
            this.nameField = 'Satellite TV';
            this.editField = this.utility.tv;
        } else if (nameField === 'vcd') {
            this.nameField = 'Video / CD Rentals';
            this.editField = this.utility.vcd;
        } else if (nameField === 'news') {
            this.nameField = 'Rental utility';
            this.editField = this.utility.news;
        }
        this.prevValue = this.editField;

        {
            this.modalService.open(modal, { ariaLabelledBy: 'utilityEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditUtility(nameField);
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
        this.changesSaved = false;
    }

    FillEditUtility(nameField) {
        if (nameField === 'electricity') {
            this.utility.electricity = this.editField;
            this.editField = '';
        } else if (nameField === 'gas') {
            this.utility.gas = this.editField;
            this.editField = '';
        } else if (nameField === 'water') {
            this.utility.water = this.editField;
            this.editField = '';
        } else if (nameField === 'telephone') {
            this.utility.telephone = this.editField;
            this.editField = '';
        } else if (nameField === 'mobile') {
            this.utility.mobile = this.editField;
            this.editField = '';
        } else if (nameField === 'internet') {
            this.utility.internet = this.editField;
            this.editField = '';
        } else if (nameField === 'tv') {
            this.utility.tv = this.editField;
            this.editField = '';
        } else if (nameField === 'vcd') {
            this.utility.vcd = this.editField;
            this.editField = '';
        } else if (nameField === 'news') {
            this.utility.news = this.editField;
            this.editField = '';
        }
        if (this.prevValue !== this.editField) {
            this.routeGuard.GuardSource.next(true);
        }
    }

    onEditDynamicField(index, modal) {
        this.nameField = this.dynamicUtilityArray[index].name;
        this.editField = this.dynamicUtilityArray[index].value;

        {
            this.modalService.open(modal, { ariaLabelledBy: 'incomeEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.dynamicUtilityArray[index].value = this.editField;
                    this.calcUtilityTotal();
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
    }

    UpdateUtility() {
        this.utility.userid = this.uid;
        this.utility.dynamicUtility = this.dynamicUtilityArray;
        this.utilityService.PutUtility(this.utility, this.uid).subscribe(data => {
            alert('Your data saved');
            this.routeGuard.GuardSource.next(false);

            this.changesSaved = true;
        });
    }
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.dataChanged = this.isFieldChanged();
        if (!this.dataChanged && !this.changesSaved) {
            return confirm('Do you want to leave this page Before changes saved ?');
        } else {
            return true;
        }
    }
}
