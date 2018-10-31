import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/core';
import { Travel } from 'app/pratik/spending/spending.model';
import { TravelService } from 'app/pratik/spending/spending.service';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';

class Newtravel {
    dynamicTravel: any = [];
    userid;
}

@Component({
    selector: 'jhi-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['../spending.component.css']
})
export class TravelComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    totalTravel;
    dataChanged: boolean;
    changesSaved: boolean;
    isTravelData: boolean;
    loadTravel: boolean;
    TravelArray: any = [];
    dynamicTravel: any = [];
    travel: Travel = new Travel();
    newTravel: Newtravel = new Newtravel();
    prevValue: any;
    globalflag: boolean;
    isFieldChange: boolean;

    constructor(
        private travelService: TravelService,
        private principal: Principal,
        private modalService: NgbModal,
        private accountService: AccountService,
        private routeGuard: SpendingRouteGuardService
    ) {}

    ngOnInit() {
        this.getUserid();
        this.totalTravel = 0;

        // travel
        this.travel.food = 0;
        this.travel.entertainment = 0;
        this.travel.dineout = 0;
        this.travel.vacation = 0;
        this.travel.hobby = 0;
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
                    this.GetTravel();
                } else {
                }
            })
            .catch(err => {});
    }

    GetTravel(): void {
        this.travelService.GetTravel(this.uid).subscribe((response: any[]) => {
            this.TravelArray = response;
            if (this.TravelArray.length === 0) {
                this.isTravelData = false;
            } else {
                this.isTravelData = true;

                this.FillTravelData();
            }
        });
    }
    FillTravelData() {
        for (let i = 0; i < this.TravelArray.length; i++) {
            if (this.TravelArray[i].name === 'food') {
                this.travel.food = +this.TravelArray[i].amount;
            } else if (this.TravelArray[i].name === 'entertainment') {
                this.travel.entertainment = +this.TravelArray[i].amount;
            } else if (this.TravelArray[i].name === 'dineout') {
                this.travel.dineout = +this.TravelArray[i].amount;
            } else if (this.TravelArray[i].name === 'vacation') {
                this.travel.vacation = +this.TravelArray[i].amount;
            } else if (this.TravelArray[i].name === 'hobby') {
                this.travel.hobby = +this.TravelArray[i].amount;
            } else if (this.TravelArray[i].name !== 'userid') {
                this.dynamicTravel.push({
                    id: this.TravelArray[i].id,
                    name: this.TravelArray[i].name,
                    value: this.TravelArray[i].amount
                });
            }
        }
        this.loadTravel = true;
        this.calcTravelTotal();
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
    // travel
    openTravel(content) {
        this.modalService.open(content, { ariaLabelledBy: 'expense-modal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddTravel();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    calcTravelTotal() {
        this.totalTravel = 0;
        for (let i = 0; i < this.dynamicTravel.length; i++) {
            const value1 = +this.dynamicTravel[i].value;
            this.totalTravel = +this.totalTravel + value1;
        }
    }
    AddTravel() {
        this.dynamicTravel.push({
            name: this.resource,
            value: this.expense
        });
        this.calcTravelTotal();
        this.newTravel.dynamicTravel.pop();
        this.newTravel.dynamicTravel.push({
            name: this.resource,
            value: this.expense
        });
        this.newTravel.userid = this.uid;

        this.travelService.PostTravel(this.newTravel).subscribe();
        this.clear();
    }
    RemoveTravel(index, id) {
        this.travelService.DeleteTravel(id).subscribe(responce => {});
        this.dynamicTravel.splice(index, 1);
        this.calcTravelTotal();
    }
    SaveTravel(): void {
        if (this.isSaveFieldChanged()) {
            this.travel.userid = this.uid;
            this.travelService.PostTravel(this.travel).subscribe(data => {
                this.isTravelData = true;
                this.routeGuard.GuardSource.next(false);
            });
        } else {
            alert('Nothing changed to be save');
        }
    }

    isSaveFieldChanged() {
        if (
            this.travel.dineout === 0 &&
            this.travel.food === 0 &&
            this.travel.hobby === 0 &&
            this.travel.vacation === 0 &&
            this.travel.entertainment === 0
        ) {
            return false;
        } else {
            return true;
        }
    }

    onEditStaticField(nameField, modal) {
        if (nameField === 'food') {
            this.nameField = 'Work Expenses(lunch, coffee) ';
            this.editField = this.travel.food;
        } else if (nameField === 'entertainment') {
            this.nameField = 'Entertainment';
            this.editField = this.travel.entertainment;
        } else if (nameField === 'dineout') {
            this.nameField = 'Dineout';
            this.editField = this.travel.dineout;
        } else if (nameField === 'vacation') {
            this.nameField = 'Vaccation/Travel';
            this.editField = this.travel.vacation;
        } else if (nameField === 'hobby') {
            this.nameField = 'Hobby';
            this.editField = this.travel.hobby;
        }

        {
            this.prevValue = this.editField;
            this.modalService.open(modal, { ariaLabelledBy: 'travelModal' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditTravel(nameField);
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
        this.changesSaved = false;
    }
    FillEditTravel(nameField) {
        if (nameField === 'food') {
            this.travel.food = this.editField;
            this.editField = '';
        } else if (nameField === 'entertainment') {
            this.travel.entertainment = this.editField;
            this.editField = '';
        } else if (nameField === 'vacation') {
            this.travel.vacation = this.editField;
            this.editField = '';
        } else if (nameField === 'dineout') {
            this.travel.dineout = this.editField;
            this.editField = '';
        } else if (nameField === 'hobby') {
            this.travel.hobby = this.editField;
            this.editField = '';
        }
        if (this.prevValue !== this.editField) {
            this.routeGuard.GuardSource.next(true);
        }
    }
    editDynamicField(index, modal) {
        this.nameField = this.dynamicTravel[index].name;
        this.editField = this.dynamicTravel[index].value;

        {
            this.modalService.open(modal, { ariaLabelledBy: 'travelModal' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.dynamicTravel[index].value = this.editField;
                    this.calcTravelTotal();
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
    }
    UpdateTravel() {
        this.travel.userid = this.uid;
        this.travel.dynamicTravel = this.dynamicTravel;
        this.travelService.PutTravel(this.travel, this.uid).subscribe(data => {
            this.changesSaved = true;
            this.routeGuard.GuardSource.next(false);
        });
    }

    isFieldChanged() {}
}
