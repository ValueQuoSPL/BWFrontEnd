import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Myprofile } from 'app/family/family.model';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';
import { FormControl } from '@angular/forms';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
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
    show = true;
    account: any;
    checkNum: boolean;
    date: any;

    constructor(private MyProfileSer: MyprofileService, public commonService: CommonSidebarService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.myProfile = {};
        this.FetchId();
    }
    // FetchIdMethod to Fetch information of  by Loged User
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.getMyProfilebyid();
        });
    }
    // saveMethod to saveMyprofile
    saveDetail() {
        this.myProfile.uid = this.uid;
        this.MyProfileSer.save(this.myProfile).subscribe(data => {
            this.getMyProfilebyid();
        });
    }
    getMyProfile() {
        this.MyProfileSer.getMyProfile().subscribe(res => {
            this.output = res;
        });
    }
    // GetMethod to Fetch Myprofile by UserId
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
    // editDetail Method to edit Myprofile
    editDetail() {
        this.myProfile.uid = this.uid;
        this.isValid = false;
        this.myProfile.address = this.output[0].address;
        this.myProfile.alternateNumber = this.output[0].alternateNumber;
        this.myProfile.city = this.output[0].city;
        this.myProfile.company = this.output[0].company;
        this.myProfile.country = this.output[0].country;
        this.date = this.output[0].dob;
        const finalDate = this.datePipe.transform(this.date, 'd/M/yy');
        this.myProfile.dob = new Date(finalDate);
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
    // update Method to Update Myprofile
    update() {
        this.MyProfileSer.updateProfile(this.myProfile).subscribe(responce => {
            this.getMyProfilebyid();
        });
        this.isValid = true;
    }
    // cancel Method to cancel Myprofile
    cancel() {
        this.isValid = true;
    }
    onChange(data) {
        if (data === this.myProfile.mobileNumber) {
            this.checkNum = true;
        } else {
            this.checkNum = false;
        }
    }
}
