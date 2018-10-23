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
        console.log('inside family profile');
        this.FetchId();

        // this.getFamilyProfile();
    }
    clear() {}

    saveFamilyProfile() {
        console.log('in family profile');
        this.familyProfile.uid = this.uid;
        this.familyProfile.earncheck = this.earncheck;
        console.log('save ' + this.familyProfile.uid);
        console.log('save ' + this.familyProfile.earncheck);

        this.Familypro.save(this.familyProfile).subscribe(responce => console.log(responce), error => console.log(error));
        this.getFamilyProfilebyid(this.uid);
    }
    getFamilyProfile() {
        this.Familypro.getFamilyProfile().subscribe(res => {
            console.log(res);
            this.output = res;
            console.log('responce of familyprofile service', this.output);
        });
    }
    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                console.log('user info of family', this.user);
                this.uid = this.user.id;
                console.log('in fetchid method', this.uid);
                this.getFamilyProfilebyid(this.uid);
            });
    }
    getFamilyProfilebyid(uid) {
        console.log('in getFamilyProfilebyid method', this.uid);
        this.Familypro.getFamilyProfileByUid(this.uid).subscribe(res => {
            console.log('output of result', res);
            this.output = res;
            console.log('output of output', this.output);
            console.log('responce of familyprofile service', this.output[0].uid);
            if (this.output[0].uid != null) {
                this.isValid = true;
                console.log(this.isValid);
            } else {
                this.isValid = false;
                console.log(this.isValid);
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
        console.log('update call');
        this.Familypro.updateProfile(this.familyProfile).subscribe(responce => console.log(responce), error => console.log(error));
        this.getFamilyProfilebyid(this.uid);
    }
    formpage() {
        this.isValid = false;
        console.log('in formpage()', this.isValid);
    }
    viewpage() {
        this.isValid = true;
        console.log('in viewpage()', this.isValid);
    }
}
