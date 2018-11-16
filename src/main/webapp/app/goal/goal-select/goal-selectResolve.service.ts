import { GoalselectService } from './goalselect.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '../../../../../../node_modules/@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Injectable()
export class GoalResolveService implements OnInit, Resolve<any> {
    account: any;
    uid: any;
    constructor(private goalselectService: GoalselectService, private commonService: CommonSidebarService) {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });
    }
    ngOnInit() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.goalselectService.getGoal(this.uid);
    }
}
