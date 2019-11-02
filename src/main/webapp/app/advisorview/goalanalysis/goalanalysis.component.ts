import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/core';
import { AdvisorViewService } from '../advisorview.service';
import { MatDialog } from '@angular/material';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'jhi-goalanalysis',
    templateUrl: './goalanalysis.component.html',
    styles: []
})
export class GoalanalysisComponent implements OnInit, OnDestroy {
    goalRecommendation = {};
    uid: any;
    account: any;
    advisorId: number;
    date = new Date();
    recommend: any = [];
    authority: any;
    isRecommendData: string;

    unsubscribe = new Subject();
    constructor(
        private _route: ActivatedRoute,
        private loginService: LoginService,
        private advisorService: AdvisorViewService,
        private dialog: MatDialog
    ) {
        this.uid = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.advisorId = this.account.id;
            this.authority = this.account.authorities[0];
            this.isRecommendData = this.authority;
        }
        this.getAdvisorDetails();
    }

    getAdvisorDetails() {
        if (this.isRecommendData === 'ROLE_ADVISOR') {
            this.advisorService.getAdvisorDetails(this.uid, 'goalreco').subscribe(res => {
                this.recommend = res;
                for (let i = 0; i < this.recommend.length; i++) {
                    if (this.recommend[i].approve === 'true') {
                        this.recommend[i].approve = true;
                    } else {
                        this.recommend[i].approve = false;
                    }

                    if (this.recommend[i].reject === 'true') {
                        this.recommend[i].reject = true;
                    } else {
                        this.recommend[i].reject = false;
                    }

                    if (this.recommend[i].approve === true || this.recommend[i].reject === true) {
                        this.recommend[i].edit = true;
                    } else {
                        this.recommend[i].edit = false;
                    }
                }
            });
        } else {
            this.advisorService.showadvise(this.uid, 'goalreco').subscribe(res => {
                this.recommend = res;
                for (let i = 0; i < this.recommend.length; i++) {
                    if (this.recommend[i].approve === 'true') {
                        this.recommend[i].approve = true;
                    } else {
                        this.recommend[i].approve = false;
                    }

                    if (this.recommend[i].reject === 'true') {
                        this.recommend[i].reject = true;
                    } else {
                        this.recommend[i].reject = false;
                    }

                    if (this.recommend[i].approve === true || this.recommend[i].reject === true) {
                        this.recommend[i].edit = true;
                    } else {
                        this.recommend[i].edit = false;
                    }
                }
            });
        }
    }

    saveGoalRecommendation(): void {
        this.goalRecommendation['uid'] = this.uid;
        this.goalRecommendation['aid'] = this.advisorId;
        this.goalRecommendation['recotype'] = 'goalreco';
        this.goalRecommendation['recoby'] = this.account.firstName;
        this.goalRecommendation['recodate'] = this.date;
        const dialogRef = this.dialog.open(RecommendationComponent, {
            data: {
                type: 'save',
                recommendObject: this.goalRecommendation
            },
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAdvisorDetails();
            }
        });
    }

    saveUserComment(recmd): void {
        this.advisorService
            .saveUserComments(recmd)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {
                this.getAdvisorDetails();
            });
    }

    /**
     * create date: 03/08/2019
     * @param recmd
     */
    updateGoalRecommendation(recmd): void {
        const dialogRef = this.dialog.open(RecommendationComponent, {
            data: {
                type: 'update',
                recommendObject: recmd
            },
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAdvisorDetails();
            }
        });
    }

    updateUserComment(recmd): void {
        recmd.type = 'user';
        const dialogRef = this.dialog.open(RecommendationComponent, {
            data: {
                type: 'update',
                recommendObject: recmd
            },
            width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAdvisorDetails();
            }
        });
    }

    /**
     * create date: 03/08/2019
     * @param id : for delete the record from table
     */
    remove(id): void {
        const response = confirm('do you want to delete this record');
        if (response) {
            this.advisorService.delete(id).subscribe(res => {
                this.getAdvisorDetails();
            });
        }
    }

    removeByUser(id): void {
        id.approve = false;
        id.reject = false;
        id.usercomment = '';
        id.edit = false;
        const response = confirm('do you want to delete this record');
        if (response) {
            this.advisorService
                .updateRecommendation(id)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {});
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
