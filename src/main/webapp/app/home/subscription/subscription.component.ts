import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserPlanService } from '../subscriber/userplan.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'jhi-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.css', '../../css/universal.css']
})
export class SubscriptionComponent implements OnInit {
    successMessage: string;
    istrial: any;
    userplan: any;
    isDataSaved = false;

    constructor(private router: Router, private userPlan: PlanService, private userPlanService: UserPlanService) {}

    ngOnInit() {
        this.userPlanService.data.subscribe(INIT_DATA => {
            this.userplan = INIT_DATA;
            if (this.userplan === 'expire') {
                window.location.reload();
            }
        });
        this.userPlan.isTrial.subscribe(data => {
            console.log(data);
            this.istrial = data;
        });
        // this.userPlan.isExpire.subscribe( data => {
        //   this.isDataSaved = data;
        // });
    }

    pay() {
        this.router.navigate(['subscriber']);
    }
}
