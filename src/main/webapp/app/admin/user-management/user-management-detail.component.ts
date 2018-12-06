import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    uid: any;
    profileInformation: any = [];

    constructor(private route: ActivatedRoute, private MyProfileSer: MyprofileService) {}

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.uid = this.user.id;
        this.getProfile();
    }

    getProfile() {
        this.MyProfileSer.getMyProfileByUid(this.uid).subscribe(data => {
            this.profileInformation = data;
        });
    }
}
