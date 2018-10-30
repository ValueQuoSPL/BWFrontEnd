import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/core';
import { Misc } from 'app/pratik/spending/spending.model';
import { MiscService } from 'app/pratik/spending/spending.service';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';

class NewMisc {
    dynamicMisc: any = [];
    userid;
}
@Component({
    selector: 'jhi-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['../spending.component.css']
})
export class MiscComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    totalMisc;
    isMiscData: boolean;
    loadMisc: boolean;
    dataChanged: boolean;
    changesSaved: boolean;
    MiscArray: any = [];
    dynamicMisc: any = [];
    misc: Misc = new Misc();
    newMisc: NewMisc = new NewMisc();
    prevValue: any;
    globalflag: boolean;
    isFieldChange: boolean;

    constructor(
        private miscService: MiscService,
        private principal: Principal,
        private modalService: NgbModal,
        private accountService: AccountService,
        private routeGuard: SpendingRouteGuardService
    ) {}

    ngOnInit() {
        this.getUserid();
        this.totalMisc = 0;

        // misc
        this.misc.shoes = 0;
        this.misc.pet = 0;
        this.misc.electronics = 0;
        this.misc.furniture = 0;
        this.misc.charity = 0;
        this.misc.gift = 0;
        this.misc.cloth = 0;
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

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.GetMisc();
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

    GetMisc(): void {
        this.miscService.GetMisc(this.uid).subscribe((response: any[]) => {
            this.MiscArray = response;
            if (this.MiscArray.length === 0) {
                this.isMiscData = false;
            } else {
                this.isMiscData = true;

                this.FillMiscData();
            }
        });
    }
    FillMiscData() {
        for (let i = 0; i < this.MiscArray.length; i++) {
            if (this.MiscArray[i].name === 'shoes') {
                this.misc.shoes = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'pet') {
                this.misc.pet = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'electronics') {
                this.misc.electronics = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'furniture') {
                this.misc.furniture = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'charity') {
                this.misc.charity = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'gift') {
                this.misc.gift = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name === 'cloth') {
                this.misc.cloth = +this.MiscArray[i].amount;
            } else if (this.MiscArray[i].name !== 'userid') {
                this.dynamicMisc.push({
                    id: this.MiscArray[i].id,
                    name: this.MiscArray[i].name,
                    value: this.MiscArray[i].amount
                });
            }
        }
        this.loadMisc = true;
        this.calcMiscTotal();
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
    // misc
    openMisc(content) {
        this.modalService.open(content, { ariaLabelledBy: 'expense-modal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddMisc();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    calcMiscTotal() {
        this.totalMisc = 0;
        for (let i = 0; i < this.dynamicMisc.length; i++) {
            const value1 = +this.dynamicMisc[i].value;
            this.totalMisc = +this.totalMisc + value1;
        }
    }

    AddMisc() {
        this.dynamicMisc.push({
            name: this.resource,
            value: this.expense
        });
        this.calcMiscTotal();
        this.newMisc.dynamicMisc.pop();
        this.newMisc.dynamicMisc.push({
            name: this.resource,
            value: this.expense
        });
        this.newMisc.userid = this.uid;

        this.miscService.PostMisc(this.newMisc).subscribe();
        this.clear();
    }

    RemoveMisc(index, id) {
        this.miscService.DeleteMisc(id).subscribe(responce => {});
        this.dynamicMisc.splice(index, 1);
        this.calcMiscTotal();
    }

    SaveMisc(): void {
        this.misc.userid = this.uid;
        this.isMiscData = true;
        // this.misc.dynamicMisc = this.dynamicMisc;
        this.miscService.PostMisc(this.misc).subscribe(data => {
            this.routeGuard.GuardSource.next(false);
        });
    }

    UpdateMisc() {
        this.misc.userid = this.uid;
        this.misc.dynamicMisc = this.dynamicMisc;
        this.miscService.PutMisc(this.misc, this.uid).subscribe(data => {
            this.changesSaved = true;
            this.routeGuard.GuardSource.next(false);
        });
    }

    isFieldChanged() {
        return true;
    }

    onEditStaticField(nameField, modal) {
        if (nameField === 'shoes') {
            this.nameField = 'Shoes ';
            this.editField = this.misc.shoes;
        } else if (nameField === 'pet') {
            this.nameField = 'Pet Care';
            this.editField = this.misc.pet;
        } else if (nameField === 'electronics') {
            this.nameField = 'Electronics';
            this.editField = this.misc.electronics;
        } else if (nameField === 'furniture') {
            this.nameField = 'Furniture';
            this.editField = this.misc.furniture;
        } else if (nameField === 'charity') {
            this.nameField = 'Charity';
            this.editField = this.misc.charity;
        } else if (nameField === 'cloth') {
            this.nameField = 'Cloths';
            this.editField = this.misc.cloth;
        } else if (nameField === 'gift') {
            this.nameField = 'Gift';
            this.editField = this.misc.gift;
        }

        {
            this.prevValue = this.editField;
            this.modalService.open(modal, { ariaLabelledBy: 'miscModal' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditMisc(nameField);
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
        this.changesSaved = false;
    }

    FillEditMisc(nameField) {
        if (nameField === 'shoes') {
            this.misc.shoes = this.editField;
            this.editField = '';
        } else if (nameField === 'pet') {
            this.misc.pet = this.editField;
            this.editField = '';
        } else if (nameField === 'electronics') {
            this.misc.electronics = this.editField;
            this.editField = '';
        } else if (nameField === 'furniture') {
            this.misc.furniture = this.editField;
            this.editField = '';
        } else if (nameField === 'charity') {
            this.misc.charity = this.editField;
            this.editField = '';
        } else if (nameField === 'gift') {
            this.misc.gift = this.editField;
            this.editField = '';
        } else if (nameField === 'cloth') {
            this.misc.cloth = this.editField;
            this.editField = '';
        }
        if (this.prevValue !== this.editField) {
            this.routeGuard.GuardSource.next(true);
        }
    }

    editDynamicField(index, modal) {
        this.nameField = this.dynamicMisc[index].name;
        this.editField = this.dynamicMisc[index].value;

        {
            this.modalService.open(modal, { ariaLabelledBy: 'editMisc' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.dynamicMisc[index].value = this.editField;
                    this.calcMiscTotal();
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
    }
}
