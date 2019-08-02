import { Component, OnInit } from '@angular/core';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { UserService } from 'app/core';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AdvisorService } from 'app/advisor/advisor.service';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'jhi-advisor',
    templateUrl: './advisor.component.html',
    styleUrls: []
})
export class AdvisorComponent implements OnInit {
    users: any = [];
    AllUserPlans: any = [];
    filteredOptions: Observable<string[]>;
    myControl = new FormControl();
    userPlanDetails: any = [];
    userName: any;

    constructor(
        private advisorService: AdvisorService,
        private CommonService: CommonSidebarService,
        private userService: UserService,
        private UserPlan: UserPlanService
    ) {}

    ngOnInit() {
        this.getAllUsers();
        // this.CommonService.allUserdata.subscribe(data => {
        //     this.users = data;
        //     console.log('all users data ', this.users);
        // });
        this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    }
    public getAllUsers() {
        // this.advisorService.getAllUser().subscribe(res => {
        //     this.users = res;
        // });
        this.userService.getAllUsers().subscribe(res => {
            this.users = res;
            this.getAllUserPlans();
        });
    }

    /**
     *
     * @param option: user name detail
     */
    getsearchName(option): void {
        this.userName = option;
    }

    /**
     * Date: 01/07/2019
     */
    public getUserDetailBySearch(): void {
        let userPlan: any = [];
        this.UserPlan.GetUserPlan(this.userName.id).subscribe(data => {
            userPlan = data;
            if (userPlan[0].uid === this.userName.id) {
                this.userPlanDetails = [];
                this.userPlanDetails.push({
                    firstName: this.userName.firstName,
                    lastName: this.userName.lastName,
                    plan: userPlan[0].plan,
                    reviewDate: userPlan[0].expiryDate,
                    uid: userPlan[0].uid
                });
            }
        });
    }

    public getAllUserPlans() {
        this.UserPlan.getAllUserPlans().subscribe(data => {
            this.AllUserPlans = data;
            for (let i = 0; i < this.users.length; i++) {
                for (let j = 0; j < this.AllUserPlans.length; j++) {
                    if (this.AllUserPlans[j].uid === this.users[i].id) {
                        this.userPlanDetails.push({
                            firstName: this.users[i].firstName,
                            lastName: this.users[i].lastName,
                            plan: this.AllUserPlans[j].plan,
                            reviewDate: this.AllUserPlans[j].expiryDate,
                            uid: this.AllUserPlans[j].uid
                        });
                    }
                }
            }
        });
    }
    private _filter(value: string): string[] {
        const filterValue = value;
        return this.users.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
    }
}
