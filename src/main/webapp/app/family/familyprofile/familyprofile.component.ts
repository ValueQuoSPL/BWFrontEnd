import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import { FamilyprofileService } from './familyprofile.service';
import { AccountService, LoginModalService, Principal } from 'app/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'jhi-familyprofile',
    templateUrl: './familyprofile.component.html',
    styleUrls: []
})
export class FamilyprofileComponent implements OnInit {
    familyProfile: any;
    output: any = [];
    user: any;
    uid: number;
    isValid: boolean;
    show = true;
    earncheck = 'notearning';
    date = new FormControl(new Date());

    constructor(private Familypro: FamilyprofileService, private account: AccountService) {}

    ngOnInit() {
        this.familyProfile = {};
        this.FetchId();

        // this.getFamilyProfile();
    }
    clear() {}

    saveFamilyProfile() {
        this.familyProfile.uid = this.uid;
        this.familyProfile.earncheck = this.earncheck;

        this.getFamilyProfilebyid(this.uid);
    }
    getFamilyProfile() {
        this.Familypro.getFamilyProfile().subscribe(res => {
            this.output = res;
        });
    }
    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.uid = this.user.id;
                this.getFamilyProfilebyid(this.uid);
            });
    }
    getFamilyProfilebyid(uid) {
        this.Familypro.getFamilyProfileByUid(this.uid).subscribe(res => {
            this.output = res;
            if (this.output[0].uid != null) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        });
    }
    newFunction() {
        this.earncheck = 'Earning';
    }
    editDetail() {
        this.isValid = false;
        this.familyProfile.relationship = this.output[0].relationship;
        this.familyProfile.firstname = this.output[0].firstname;
        this.familyProfile.middlename = this.output[0].middlename;
        this.familyProfile.lastname = this.output[0].lastname;
        this.familyProfile.dateOfBirth = this.output[0].dateOfBirth;
        this.familyProfile.email = this.output[0].email;
        this.familyProfile.phonenumber = this.output[0].phonenumber;
        this.familyProfile.uid = this.uid;
        this.show = false;
    }
    update() {
        this.getFamilyProfilebyid(this.uid);
    }
    formpage() {
        this.isValid = false;
    }
    viewpage() {
        this.isValid = true;
    }
}
