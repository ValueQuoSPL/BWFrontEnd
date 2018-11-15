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
        console.log('resolve construct');

        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            console.log('get uid construct resolve', this.uid);
        });
    }
    ngOnInit() {
        console.log('resolve init');

        this.commonService.account.subscribe(account => {
            console.log('get uid resolve init', this.uid);
            this.account = account;
            this.uid = this.account.id;
        });
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log('resolve');
        return this.goalselectService.getGoal(this.uid);
    }
}
