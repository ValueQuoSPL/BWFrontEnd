import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { UserService } from 'app/core';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
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

    constructor(
        private advisorService: AdvisorService,
        private CommonService: CommonSidebarService,
        private userService: UserService,
        private UserPlan: UserPlanService
    ) {}

    ngOnInit() {
        console.log('in oninit method of adviser ');
        this.getAllUsers();
        this.getAllUserPlans();
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
            console.log('data of all user', this.users);
        });
    }
    public getAllUserPlans() {
        this.UserPlan.getAllUserPlans().subscribe(data => {
            this.AllUserPlans = data;
            console.log('user plan data', this.AllUserPlans);
        });
    }
    private _filter(value: string): string[] {
        const filterValue = value;
        return this.users.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
    }
}
