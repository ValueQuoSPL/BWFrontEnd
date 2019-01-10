import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';

class UserAccount {
    plan;
    applyDate;
    expiryDate;
}
@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    uid: any;
    accountDetail: Object;
    userAccount: UserAccount = new UserAccount();
    profileInformation: any = [];

    constructor(private route: ActivatedRoute, private MyProfileSer: MyprofileService, private userPlanService: UserPlanService) {}

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.uid = this.user.id;
        this.getProfile();
        this.getAccountDetail();
    }

    getProfile() {
        this.MyProfileSer.getMyProfileByUid(this.uid).subscribe(data => {
            this.profileInformation = data;
        });
    }
    getAccountDetail() {
        this.userAccount.plan = 0;
        this.userAccount.applyDate = 0;
        this.userAccount.expiryDate = 0;
        this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
            if (data) {
                this.accountDetail = data;
                this.userAccount.plan = this.accountDetail[0].plan;
                this.userAccount.applyDate = this.accountDetail[0].applyDate;
                this.userAccount.expiryDate = this.accountDetail[0].expiryDate;
            }
        });
    }
}
