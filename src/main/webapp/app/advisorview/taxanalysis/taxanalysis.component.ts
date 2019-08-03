import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/core';
import { AdvisorViewService } from '../advisorview.service';
import { MatDialog } from '@angular/material';
import { RecommendationComponent } from '../recommendation/recommendation.component';

@Component({
    selector: 'jhi-taxanalysis',
    templateUrl: './taxanalysis.component.html',
    styles: []
})
export class TaxanalysisComponent implements OnInit {
    goalRecommendation = {};
    uid: any;
    account: any;
    advisorId: number;
    date = new Date();
    recommend: any = [];

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
        }
        this.getAdvisorDetails();
    }

    getAdvisorDetails() {
        this.advisorService.getAdvisorDetails(this.advisorId, this.uid, 'Tax Recommendation').subscribe(res => {
            this.recommend = res;
        });
    }

    saveTaxRecommendation(): void {
        this.goalRecommendation['uid'] = this.uid;
        this.goalRecommendation['aid'] = this.advisorId;
        this.goalRecommendation['recotype'] = 'Tax Recommendation';
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

    /**
     * create date: 03/08/2019
     * @param recmd
     */
    updateTaxRecommendation(recmd): void {
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
}
