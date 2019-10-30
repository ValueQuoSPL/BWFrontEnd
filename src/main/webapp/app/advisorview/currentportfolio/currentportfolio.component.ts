import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/core';
import { AdvisorViewService } from '../advisorview.service';
import { MatDialog } from '@angular/material/dialog';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { truncate } from 'fs';

@Component({
    selector: 'jhi-currentportfolio',
    templateUrl: './currentportfolio.component.html',
    styles: []
})
export class CurrentportfolioComponent implements OnInit, OnDestroy {
    uid: any;
    recommend: any = [];
    newRecord: any = {};
    isRecommendData: string;
    recommendation = {};
    account: any;
    advisorId: any;
    authority: string;
    date = new Date();
    saveOrEdit: boolean;

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
        this.newRecord = { reco: '' };
        this.recommend.push(this.newRecord);
        this.account = this.loginService.getCookie();
        this.authority = this.account.authorities[0];
        this.isRecommendData = this.authority;
        if (this.account) {
            this.advisorId = this.account.id;
        } else {
        }
        this.getAdvisorDetails();
    }

    getAdvisorDetails() {
        this.advisorService.getAdvisorDetails(this.uid, 'Portfolio').subscribe(res => {
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

    addRecommendation(index) {
        this.newRecord = { reco: '' };
        this.recommend.push(this.newRecord);
        return true;
    }

    remove(i) {
        this.recommend.splice(i, 1);
        const response = confirm('do you want to delete this record');
        if (response) {
            this.advisorService.delete(i).subscribe(res => {
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

    /**
     *  Date: 27/07/2019
     *  Save recommendation
     */
    saveRecommendation(): void {
        this.recommendation['uid'] = this.uid;
        this.recommendation['aid'] = this.advisorId;
        this.recommendation['recotype'] = 'Portfolio';
        this.recommendation['recoby'] = this.account.firstName;
        this.recommendation['recodate'] = this.date;
        const dialogRef = this.dialog.open(RecommendationComponent, {
            data: {
                type: 'save',
                recommendObject: this.recommendation
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
     *  Date: 30/07/2019
     *  update recommendation
     * @param recmd: for update Object.
     */
    updateRecommendation(recmd): void {
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

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
