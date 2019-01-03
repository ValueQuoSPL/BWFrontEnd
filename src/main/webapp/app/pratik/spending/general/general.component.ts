import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'app/pratik/spending/spending.service';
import { General, PrevGeneral } from 'app/pratik/spending/spending.model';
import { FormControl } from '@angular/forms';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { LoginService } from 'app/core';
import { MatDialog } from '@angular/material';
import { DocumentComponent } from 'app/document/document.component';

@Component({
    selector: 'jhi-general',
    templateUrl: './general.component.html',
    styleUrls: ['../spending.component.css']
})
export class GeneralComponent implements OnInit {
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
    tempGeneralArray: any = [];
    dynamicGeneral: any = [];
    GeneralModel: any = [];
    general: General = new General();
    prevGeneral: PrevGeneral = new PrevGeneral();
    generalDate = new FormControl(new Date());
    account: any;

    PolicyTypeArray = [
        { name: 'Child Policy' },
        { name: 'Retirement Policy' },
        { name: 'Saving Policy' },
        { name: 'Investment Policy' },
        { name: 'Term Policy' }
    ];
    PremiumTypeArray = [{ name: 'Single' }, { name: 'Monthly' }, { name: 'Quarterly' }, { name: 'Half Yearly' }, { name: 'Yearly' }];
    isFieldChanged: boolean;
    update: boolean;

    constructor(
        private generalService: GeneralService,
        private modalService: NgbModal,
        private commonService: CommonSidebarService,
        private loginService: LoginService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getUserid();
    }

    getUserid() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
            this.onGetGeneral();
        }
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';

        this.general.generalModelArray = '';
        this.general.ins_obj = '';
        this.general.issuer = '';
        this.general.policy_name = '';
        this.general.policy_no = '';
        this.general.policy_term = '';
        this.general.premium = '';
        this.general.proposer = '';
        this.general.premium_mode = '';
        this.general.start_date = '';
        this.general.sum = '';
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

    openGeneral(generalModal) {
        this.clear();
        this.update = false;
        this.modalService.open(generalModal, { ariaLabelledBy: 'generalModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddGeneral();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    AddGeneral() {
        this.dynamicGeneral.push({
            insureName: this.general.ins_obj,
            policyName: this.general.policy_name,
            premium: this.general.premium,
            issuer: this.general.issuer,
            premiumTerm: this.general.policy_term,
            policyDate: this.generalDate.value,
            sum: this.general.sum,
            policyNumber: this.general.policy_no,
            proposer: this.general.proposer,
            premiumName: this.general.premium_mode,
            userid: this.uid
        });

        // this.general.generalModelArray = this.dynamicGeneral;
        // if (this.general.generalModelArray.length > 0) {
        //     this.general.generalModelArray.pop();
        // }
        this.GeneralModel.push({
            iName: this.general.ins_obj,
            pName: this.general.policy_name,
            prName: this.general.premium_mode,
            premium: this.general.premium,
            issuer: this.general.issuer,
            pterm: this.general.policy_term,
            pdate: this.generalDate.value,
            sum: this.general.sum,
            poNo: this.general.policy_no,
            proposer: this.general.proposer,
            userid: this.uid
        });

        this.general.generalModelArray = this.GeneralModel;
        this.onGeneralSave();
        this.clear();
    }
    RemoveGeneral(index, id) {
        const res = confirm('Are you sure?');
        if (res) {
            this.generalService.DeleteGeneral(id).subscribe(responce => {});
            this.dynamicGeneral.splice(index, 1);
        }
    }
    onGeneralSave(): void {
        this.general.userid = this.uid;
        this.generalService.PostGeneral(this.general.generalModelArray).subscribe(data => {
            this.general.generalModelArray = [];
            this.GeneralModel = [];

            this.onGetGeneral();
        });
    }
    onGetGeneral(): void {
        this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
            this.dynamicGeneral = response;
        });
    }
    onEditGeneral(id, generalModal) {
        this.update = true;
        this.isFieldChanged = false;
        this.fillModal(id);

        this.modalService.open(generalModal, { ariaLabelledBy: 'generalModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillgeneralArray(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    fillModal(id) {
        this.tempGeneralArray = this.dynamicGeneral;
        for (let i = 0; i < this.tempGeneralArray.length; i++) {
            if (this.tempGeneralArray[i].id === id) {
                this.general.policy_name = this.tempGeneralArray[i].policyName;
                this.general.premium = this.tempGeneralArray[i].premium;
                this.general.policy_term = this.tempGeneralArray[i].premiumTerm;
                this.general.issuer = this.tempGeneralArray[i].issuer;
                this.general.start_date = this.tempGeneralArray[i].policyDate;
                this.general.proposer = this.tempGeneralArray[i].proposer;
                this.general.sum = this.tempGeneralArray[i].sum;
                this.general.policy_no = this.tempGeneralArray[i].policyNumber;
                this.general.premium_mode = this.tempGeneralArray[i].premiumName;
                this.general.ins_obj = this.tempGeneralArray[i].insureName;

                this.prevGeneral.premium_mode = this.tempGeneralArray[i].premiumName;
                this.prevGeneral.ins_obj = this.tempGeneralArray[i].insureName;
                this.prevGeneral.policy_name = this.tempGeneralArray[i].policyName;
                this.prevGeneral.premium = this.tempGeneralArray[i].premium;
                this.prevGeneral.policy_term = this.tempGeneralArray[i].pterm;
                this.prevGeneral.issuer = this.tempGeneralArray[i].issuer;
                this.prevGeneral.start_date = new FormControl(new Date(this.tempGeneralArray[i].policyDate));
                this.prevGeneral.proposer = this.tempGeneralArray[i].proposer;
                this.prevGeneral.sum = this.tempGeneralArray[i].sum;
                this.prevGeneral.policy_no = this.tempGeneralArray[i].policyNumber;
                this.prevGeneral.policy_term = this.tempGeneralArray[i].premiumTerm;
                this.prevGeneral.premium_mode = this.tempGeneralArray[i].pMode;
            }
        }
    }
    fillgeneralArray(id) {
        for (let i = 0; i < this.dynamicGeneral.length; i++) {
            if (this.dynamicGeneral[i].id === id) {
                this.dynamicGeneral[i].id = this.general.id;
                this.dynamicGeneral[i].policyName = this.general.policy_name;
                this.dynamicGeneral[i].premium = this.general.premium;
                this.dynamicGeneral[i].premiumTerm = this.general.policy_term;
                this.dynamicGeneral[i].issuer = this.general.issuer;
                this.dynamicGeneral[i].policyDate = this.general.start_date;
                this.dynamicGeneral[i].proposer = this.general.proposer;
                this.dynamicGeneral[i].sum = this.general.sum;
                this.dynamicGeneral[i].policyNumber = this.general.policy_no;
                this.dynamicGeneral[i].premiumName = this.general.premium_mode;
                this.dynamicGeneral[i].insureName = this.general.ins_obj;
            }
        }
        this.Updategeneral(id);
    }
    Updategeneral(id) {
        this.general.id = id;
        this.general.userid = this.uid;
        this.generalService.PutGeneral(this.general, this.uid).subscribe(res => {
            this.clear();
        });
    }
    ChangeDetector(event, from) {
        if (from === 'number') {
            if (this.prevGeneral.policy_no !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'issuer') {
            if (this.prevGeneral.issuer !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'insured') {
            if (this.prevGeneral.ins_obj !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'proposer') {
            if (this.prevGeneral.proposer !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'date') {
            const prevdate = new Date(this.prevGeneral.start_date.value);
            prevdate.setHours(0);
            prevdate.setMinutes(0);
            prevdate.setSeconds(0);

            const newdate = new Date(this.generalDate.value);
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
            if (this.prevGeneral.policy_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'mode') {
            if (this.prevGeneral.premium_mode !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'policy') {
            if (this.prevGeneral.policy_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'sum') {
            if (this.prevGeneral.sum !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premium') {
            if (this.prevGeneral.premium !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premiumterm') {
            if (this.prevGeneral.policy_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        }
    }

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}
