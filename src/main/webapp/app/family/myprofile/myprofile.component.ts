import { Component, OnInit } from '@angular/core';
import { Myprofile } from '../family.model';
import { MyprofileService } from './myprofile.service';
import { AccountService, LoginModalService, Principal } from 'app/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'jhi-myprofile',
    templateUrl: './myprofile.component.html',
    styleUrls: []
})
export class MyprofileComponent implements OnInit {
    myProfile: any;
    output: any = [];
    user: any;
    uid: any;
    isValid: boolean;
    date = new FormControl(new Date());
    show = true;

    constructor(private principal: Principal, private MyProfileSer: MyprofileService, private account: AccountService) {}

    ngOnInit() {
        this.myProfile = {};
        this.FetchId();
    }
    saveDetail() {
        this.myProfile.uid = this.uid;
        this.MyProfileSer.save(this.myProfile).subscribe();
        this.getMyProfilebyid();
    }
    getMyProfile() {
        this.MyProfileSer.getMyProfile().subscribe(res => {
            this.output = res;
        });
    }
    getMyProfilebyid() {
        this.MyProfileSer.getMyProfileByUid(this.uid).subscribe(res => {
            this.output = res;
            // for (let i = 0; i < this.output.length; i++) {
            //   const element = this.output[i];
            //   if (element.uid === 0) {
            //     this.isValid = false;
            //   } else {
            //     this.isValid = true;
            //   }
            // }
            if (this.output.length === 0) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        });
    }
    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.uid = this.user.id;
                this.getMyProfilebyid();
            });
    }
    editDetail() {
        this.myProfile.uid = this.uid;
        this.isValid = false;
        this.myProfile.address = this.output[0].address;
        this.myProfile.alternateNumber = this.output[0].alternateNumber;
        this.myProfile.city = this.output[0].city;
        this.myProfile.company = this.output[0].company;
        this.myProfile.country = this.output[0].country;
        this.myProfile.dob = this.output[0].dob;
        this.myProfile.emailId = this.output[0].emailId;
        this.myProfile.firstName = this.output[0].firstName;
        this.myProfile.gender = this.output[0].gender;
        this.myProfile.maritalStatus = this.output[0].maritalStatus;
        this.myProfile.howDidYouKnow = this.output[0].howDidYouKnow;
        this.myProfile.middleName = this.output[0].middleName;
        this.myProfile.lastName = this.output[0].lastName;
        this.myProfile.mobileNumber = this.output[0].mobileNumber;
        this.myProfile.occupation = this.output[0].occupation;
        this.myProfile.pan = this.output[0].pan;
        this.myProfile.pin = this.output[0].pin;
        this.myProfile.state = this.output[0].state;
        this.myProfile.uid = this.uid;
        this.show = false;
    }
    update() {
        this.MyProfileSer.updateProfile(this.myProfile).subscribe(responce => {
            this.getMyProfilebyid();
        });
        this.isValid = true;
    }
    cencel() {
        this.isValid = true;
    }
}
