import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Life } from 'app/pratik/spending/spending.model';
import { PrevLife } from 'app/pratik/spending/spending.model';
import { LifeService } from 'app/pratik/spending/spending.service';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Component({
    selector: 'jhi-life',
    templateUrl: './life.component.html',
    styleUrls: ['../spending.component.css']
})
export class LifeComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    totalUtility;
    premium_mode;
    loadUtility: boolean;
    dataChanged: boolean;
    changesSaved: boolean;
    isUtilityData: boolean;
    UtilityArray: any = [];
    tempLifeArray: any = [];
    dynamicLifeArray: any = [];
    account: any = [];
    life: Life = new Life();
    prevLife: PrevLife = new PrevLife();

    lifeDate = new FormControl(new Date());
    isFieldChanged = false;
    update = false;

    PolicyTypeArray = [
        { name: 'Child Policy' },
        { name: 'Retirement Policy' },
        { name: 'Saving Policy' },
        { name: 'Investment Policy' },
        { name: 'Term Policy' }
    ];
    PremiumTypeArray = [{ name: 'Single' }, { name: 'Monthly' }, { name: 'Quarterly' }, { name: 'Half Yearly' }, { name: 'Yearly' }];
    isLifeData: boolean;
    constructor(private lifeService: LifeService, private modalService: NgbModal, private commonService: CommonSidebarService) {}

    ngOnInit() {
        this.getUserid();
    }

    getUserid() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            console.log('uid received in life', this.uid);
            this.onGetLife();
        });
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';
        this.lifeDate = new FormControl(new Date());

        this.life.ins_name = '';
        this.life.issuer = '';
        this.life.policy_name = '';
        this.life.policy_term = '';
        this.life.premium = '';
        this.life.premium_mode = '';
        this.life.premium_term = '';
        this.life.proposer_name = '';
        this.life.start_date = '';
        this.life.sum = '';
        this.life.type = '';
        this.life.policynumber = '';
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
    // life insurance
    openLife(lifeModal) {
        this.clear();
        this.update = false;
        this.modalService.open(lifeModal, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddLifeInsurance();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    AddLifeInsurance() {
        this.dynamicLifeArray.push({
            iName: this.life.type,
            issuer: this.life.issuer,
            ins_name: this.life.ins_name,
            prName: this.life.proposer_name,
            sDate: this.lifeDate.value,
            pterm: this.life.policy_term,
            pMode: this.life.premium_mode,
            pName: this.life.policy_name,
            sum: this.life.sum,
            policynumber: this.life.policynumber,
            premium: this.life.premium,
            term: this.life.premium_term,
            userid: this.uid
        });
        this.life.lifeModelArray.pop();
        this.life.lifeModelArray.push({
            iName: this.life.type,
            issuer: this.life.issuer,
            ins_name: this.life.ins_name,
            prName: this.life.proposer_name,
            sDate: this.lifeDate.value,
            pterm: this.life.policy_term,
            pMode: this.life.premium_mode,
            pName: this.life.policy_name,
            sum: this.life.sum,
            policynumber: this.life.policynumber,
            premium: this.life.premium,
            term: this.life.premium_term,
            userid: this.uid
        });
        this.onLifeSave();
        this.clear();
    }
    onLifeSave(): void {
        this.life.userid = this.uid;

        this.lifeService.PostLife(this.life.lifeModelArray).subscribe(data => {
            this.onGetLife();
        });
    }
    onGetLife(): void {
        console.log('fetching life data');

        this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
            this.dynamicLifeArray = response;
            console.log('life data received', this.dynamicLifeArray);

            if (this.dynamicLifeArray.length === 0) {
                this.isLifeData = false;
            } else {
                this.isLifeData = true;
            }
        });
    }
    RemoveLifeInsurance(index, id) {
        const res = confirm('Are you Sure?');

        if (res) {
            this.lifeService.DeleteLife(id).subscribe(responce => {});
            this.dynamicLifeArray.splice(index, 1);
        }
    }

    onEditLife(id, lifeModal) {
        this.update = true;
        this.isFieldChanged = false;
        this.fillModal(id);
        this.modalService.open(lifeModal, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillLifeArray(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    ChangeDetector(event, from) {
        if (from === 'number') {
            if (this.prevLife.policynumber !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'issuer') {
            if (this.prevLife.issuer !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'insured') {
            if (this.prevLife.ins_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'proposer') {
            if (this.prevLife.proposer_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'date') {
            const prevdate = new Date(this.prevLife.start_date.value);
            prevdate.setHours(0);
            prevdate.setMinutes(0);
            prevdate.setSeconds(0);

            const newdate = new Date(this.lifeDate.value);
            newdate.setHours(0);
            newdate.setMinutes(0);
            newdate.setSeconds(0);

            // tslint:disable-next-line:triple-equals
            if (prevdate !== newdate) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'term') {
            if (this.prevLife.policy_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'type') {
            if (this.prevLife.type !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'mode') {
            if (this.prevLife.premium_mode !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'policy') {
            if (this.prevLife.policy_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'sum') {
            if (this.prevLife.sum !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premium') {
            if (this.prevLife.premium !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premiumterm') {
            if (this.prevLife.premium_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        }
    }
    fillModal(id) {
        this.tempLifeArray = this.dynamicLifeArray;
        for (let i = 0; i < this.tempLifeArray.length; i++) {
            if (this.tempLifeArray[i].id === id) {
                this.life.type = this.tempLifeArray[i].name;
                this.life.ins_name = this.tempLifeArray[i].insuranceName;
                this.life.policy_name = this.tempLifeArray[i].pName;
                this.life.premium = this.tempLifeArray[i].premium;
                this.life.policy_term = this.tempLifeArray[i].pterm;
                this.life.issuer = this.tempLifeArray[i].issuer;
                this.life.start_date = new FormControl(new Date(this.tempLifeArray[i].sDate));
                this.life.proposer_name = this.tempLifeArray[i].premiumName;
                this.life.sum = this.tempLifeArray[i].sum;
                this.life.policynumber = this.tempLifeArray[i].policynumber;
                this.life.premium_term = this.tempLifeArray[i].term;
                this.life.premium_mode = this.tempLifeArray[i].pMode;
                this.lifeDate = new FormControl(new Date(this.tempLifeArray[i].sDate));

                this.prevLife.type = this.tempLifeArray[i].name;
                this.prevLife.ins_name = this.tempLifeArray[i].insuranceName;
                this.prevLife.policy_name = this.tempLifeArray[i].pName;
                this.prevLife.premium = this.tempLifeArray[i].premium;
                this.prevLife.policy_term = this.tempLifeArray[i].pterm;
                this.prevLife.issuer = this.tempLifeArray[i].issuer;
                this.prevLife.start_date = new FormControl(new Date(this.tempLifeArray[i].sDate));
                this.prevLife.proposer_name = this.tempLifeArray[i].premiumName;
                this.prevLife.sum = this.tempLifeArray[i].sum;
                this.prevLife.policynumber = this.tempLifeArray[i].policynumber;
                this.prevLife.premium_term = this.tempLifeArray[i].term;
                this.prevLife.premium_mode = this.tempLifeArray[i].pMode;
            }
        }
    }
    fillLifeArray(id) {
        for (let i = 0; i < this.dynamicLifeArray.length; i++) {
            if (this.dynamicLifeArray[i].id === id) {
                this.dynamicLifeArray[i].id = this.life.id;
                this.dynamicLifeArray[i].name = this.life.type;
                this.dynamicLifeArray[i].insuranceName = this.life.ins_name;
                this.dynamicLifeArray[i].pName = this.life.policy_name;
                this.dynamicLifeArray[i].premium = this.life.premium;
                this.dynamicLifeArray[i].pterm = this.life.policy_term;
                this.dynamicLifeArray[i].issuer = this.life.issuer;
                this.dynamicLifeArray[i].sDate = this.life.start_date;
                this.dynamicLifeArray[i].premiumName = this.life.proposer_name;
                this.dynamicLifeArray[i].sum = this.life.sum;
                this.dynamicLifeArray[i].policynumber = this.life.policynumber;
                this.dynamicLifeArray[i].term = this.life.premium_term;
                this.dynamicLifeArray[i].pMode = this.life.premium_mode;
            }
        }
        this.Updatelife(id);
    }
    Updatelife(id) {
        this.life.id = id;
        this.life.userid = this.uid;

        this.lifeService.PutLife(this.life, this.uid).subscribe(res => {
            this.clear();
        });
    }
}
