import { Component, OnInit } from '@angular/core';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

class UserAccount {
    plan;
    applyDate;
    expiryDate;
}

@Component({
    selector: 'jhi-accountprofile',
    templateUrl: './accountprofile.component.html',
    styles: []
})
export class AccountprofileComponent implements OnInit {
    account: any;
    uid: any;
    userAccount: UserAccount = new UserAccount();
    profile: Object;
    constructor(private userPlanService: UserPlanService, private commonService: CommonSidebarService) {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            console.log('inside contructor');
        });
    }

    ngOnInit() {
        this.userAccount.plan = 0;
        this.userAccount.applyDate = 0;
        this.userAccount.expiryDate = 0;
        this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
            if (data) {
                this.profile = data;
                this.userAccount.plan = this.profile[0].plan;
                this.userAccount.applyDate = this.profile[0].applyDate;
                this.userAccount.expiryDate = this.profile[0].expiryDate;
            }
            console.log('inside ngOninit', data);
        });
    }
}
