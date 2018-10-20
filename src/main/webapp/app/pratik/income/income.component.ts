import { Component, OnInit } from '@angular/core';
import { Income } from 'app/pratik/spending/spending.model';
import { IncomeService } from 'app/pratik/spending/spending.service';
import { AccountService, LoginModalService, Principal } from 'app/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { Observable } from 'rxjs';

class NewIncome {
    dynamicIncome: any = [];
    userid;
}

class RemoveIncome {
    name;
}

@Component({
    selector: 'jhi-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.css']
})
export class IncomeComponent implements OnInit, CanComponentDeactivate {
    resource: any;
    amount: any;
    dynamicIncome: any = [];
    IncomeArray: any = [];
    tempIncomeArray: any = [];
    totalIncome: number;
    income: Income = new Income();
    newIncome: NewIncome = new NewIncome();
    removeIncome: RemoveIncome = new RemoveIncome();
    closeResult: string;
    step = 0;
    uid: any;
    modalRef: NgbModalRef;
    account: Account;
    isIncomeData;
    loadIncome = false;
    dynamicTotal: number;
    nameField;
    editField;
    panelOpenState;

    changesSaved: boolean;
    dataChanged: boolean;
    globalflag: boolean;

    prevValue;
    isFieldChange = false;

    constructor(
        private accountService: AccountService,
        private modalService: NgbModal,
        private incomeService: IncomeService,
        private loginModalService: LoginModalService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.getUserid();
        this.totalIncome = 0;
        this.dynamicTotal = 0;
        this.income.incomeSalary = 0;
        this.income.incomeAward = 0;
        this.income.incomeBonus = 0;
        this.income.incomeDeposit = 0;
        this.income.incomePension = 0;
        this.income.incomeRental = 0;
        this.income.incomeSaving = 0;
        this.changesSaved = false;
        this.dataChanged = true;

        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getUserid() {
        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.onIncomeGet();
                } else {
                }
            })
            .catch(err => {});
    }

    onIncomeGet() {
        this.incomeService.GetIncome(this.uid).subscribe((response: any[]) => {
            this.tempIncomeArray = response;
            if (this.tempIncomeArray.length === 0) {
                this.isIncomeData = false;
            } else {
                this.fillIncomeData();
                this.isIncomeData = true;
            }
        });
    }

    clear() {
        this.resource = '';
        this.amount = '';
    }

    reset() {
        prompt('All saved data of Income will be lost. Are you sure to continue');
        this.totalIncome = 0;
        this.income.incomeSalary = 0;
        this.income.incomeAward = 0;
        this.income.incomeBonus = 0;
        this.income.incomeDeposit = 0;
        this.income.incomePension = 0;
        this.income.incomeRental = 0;
        this.income.incomeSaving = 0;
    }

    fillIncomeData() {
        this.IncomeArray = this.tempIncomeArray;
        this.dynamicIncome.splice(0, this.dynamicIncome.length);
        for (let i = 0; i < this.IncomeArray.length; i++) {
            if (this.IncomeArray[i].name === 'incomeSalary') {
                this.income.incomeSalary = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomeAward') {
                this.income.incomeAward = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomeBonus') {
                this.income.incomeBonus = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomePension') {
                this.income.incomePension = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomeSaving') {
                this.income.incomeSaving = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomeDeposit') {
                this.income.incomeDeposit = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name === 'incomeRental') {
                this.income.incomeRental = +this.IncomeArray[i].amount;
            } else if (this.IncomeArray[i].name !== 'userid') {
                this.dynamicIncome.push({
                    id: this.IncomeArray[i].id,
                    name: this.IncomeArray[i].name,
                    value: this.IncomeArray[i].amount
                });
                this.calcTotalIncome();
                this.calcIncomeTotal();
                // this.clear();
            }
        }
        this.loadIncome = true;
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

    openIncome(incomeContent) {
        this.modalService.open(incomeContent, { ariaLabelledBy: 'incomeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddIncome();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    calcTotalIncome() {
        this.totalIncome = 0;
        for (let j = 0; j < this.IncomeArray.length; j++) {
            if (this.IncomeArray[j].name !== 'userid') {
                this.totalIncome = +this.totalIncome + +this.IncomeArray[j].amount;
            }
        }
    }

    calcIncomeTotal() {
        this.totalIncome = 0;
        this.dynamicTotal = 0;
        for (let j = 0; j < this.dynamicIncome.length; j++) {
            this.totalIncome = +this.totalIncome + +this.dynamicIncome[j].value;
            this.dynamicTotal = +this.dynamicTotal + +this.dynamicIncome[j].value;
        }
    }

    AddIncome() {
        this.dynamicIncome.push({
            name: this.resource,
            value: this.amount
        });
        this.newIncome.dynamicIncome.pop();
        this.newIncome.dynamicIncome.push({
            name: this.resource,
            value: this.amount
        });
        this.newIncome.userid = this.uid;
        this.incomeService.PostIncome(this.newIncome).subscribe(data => {
            this.onIncomeGet();
        });
        this.clear();
    }

    deleteFieldValue(index, id) {
        if (id) {
            this.removeIncome.name = this.dynamicIncome[index].name;
            this.incomeService.DeleteIncome(id).subscribe(responce => {});
        }

        this.dynamicIncome.splice(index, 1);
        this.calcIncomeTotal();
    }

    saveIncome(): void {
        this.income.userid = this.uid;
        // this.income.dynamicIncome = this.dynamicIncome;
        this.incomeService.PostIncome(this.income).subscribe(data => {
            alert('Your data saved');
            this.isIncomeData = true;
            this.changesSaved = true;
        });
    }

    updateIncome() {
        this.income.userid = this.uid;
        this.income.dynamicIncome = this.dynamicIncome;
        this.incomeService.PutIncome(this.income, this.uid).subscribe(data => {
            alert('Your data saved');
            this.changesSaved = true;
        });
    }

    onEditStaticField(nameField, modal) {
        if (nameField === 'salary') {
            this.nameField = 'Post Tax Take Home Salary';
            this.editField = this.income.incomeSalary;
        } else if (nameField === 'award') {
            this.nameField = 'Performance award / bonus';
            this.editField = this.income.incomeAward;
        } else if (nameField === 'bonus') {
            this.nameField = 'Sign-up Bonus';
            this.editField = this.income.incomeBonus;
        } else if (nameField === 'pension') {
            this.nameField = 'Pensions';
            this.editField = this.income.incomePension;
        } else if (nameField === 'saving') {
            this.nameField = 'Interest Earned on Saving';
            this.editField = this.income.incomeSaving;
        } else if (nameField === 'deposit') {
            this.nameField = 'Income from investments(Deposites, Securities)';
            this.editField = this.income.incomeDeposit;
        } else if (nameField === 'rental') {
            this.nameField = 'Rental Income';
            this.editField = this.income.incomeRental;
        }
        {
            this.prevValue = this.editField;
            this.modalService.open(modal, { ariaLabelledBy: 'incomeEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditIncome(nameField);
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }

        this.changesSaved = false;
    }

    DetectChange(event) {
        if (this.prevValue === event || this.prevValue === null) {
            this.globalflag = false;
            this.isFieldChange = false;
        } else {
            this.globalflag = true;
            this.isFieldChange = true;
        }
    }

    onEditDynamicField(index, modal) {
        this.nameField = this.dynamicIncome[index].name;
        this.editField = this.dynamicIncome[index].value;

        {
            this.modalService.open(modal, { ariaLabelledBy: 'incomeEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.dynamicIncome[index].value = this.editField;
                    this.calcIncomeTotal();
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
    }

    FillEditIncome(nameField) {
        if (nameField === 'salary') {
            this.income.incomeSalary = this.editField;
            this.editField = '';
        } else if (nameField === 'award') {
            this.income.incomeAward = this.editField;
            this.editField = '';
        } else if (nameField === 'bonus') {
            this.income.incomeBonus = this.editField;
            this.editField = '';
        } else if (nameField === 'pension') {
            this.income.incomePension = this.editField;
            this.editField = '';
        } else if (nameField === 'saving') {
            this.income.incomeSaving = this.editField;
            this.editField = '';
        } else if (nameField === 'deposit') {
            this.income.incomeDeposit = this.editField;
            this.editField = '';
        } else if (nameField === 'rental') {
            this.income.incomeRental = this.editField;
            this.editField = '';
        }
    }

    isFieldChanged(): boolean {
        for (let i = 0; i < this.IncomeArray.length; i++) {
            if (this.IncomeArray[i].name === 'incomeSalary') {
                if (+this.income.incomeSalary !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomeAward') {
                if (+this.income.incomeAward !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomeBonus') {
                if (+this.income.incomeBonus !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomePension') {
                if (+this.income.incomePension !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomeSaving') {
                if (+this.income.incomeSaving !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomeDeposit') {
                if (+this.income.incomeDeposit !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name === 'incomeRental') {
                if (+this.income.incomeRental !== +this.IncomeArray[i].amount) {
                    return false;
                }
            } else if (this.IncomeArray[i].name !== 'userid') {
                for (let j = 0; j < this.dynamicIncome.length; j++) {
                    if (this.dynamicIncome[j].name === this.IncomeArray[i].name) {
                        if (+this.dynamicIncome[j].value !== +this.IncomeArray[i].amount) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.dataChanged = this.isFieldChanged();
        if (!this.dataChanged && !this.changesSaved) {
            return confirm('Do you want to leave this page Before changes saved ? ' + '<Cancel> to cancel leaving <OK> to leave page');
        } else {
            return true;
        }
    }
}
