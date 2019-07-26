import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/core';
import { AdvisorService } from 'app/advisor/advisor.service';
import { AdvisorViewService } from '../advisorview.service';

@Component({
    selector: 'jhi-currentportfolio',
    templateUrl: './currentportfolio.component.html',
    styles: []
})
export class CurrentportfolioComponent implements OnInit {
    uid: any;
    recommend: any = [];
    newRecord: any = {};
    isRecommendData = false;
    recommendation = {};
    account: any;
    advisorId: any;
    date = new Date();

    constructor(private _route: ActivatedRoute, private loginService: LoginService, private advisorService: AdvisorViewService) {
        this.uid = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.newRecord = { reco: '' };
        this.recommend.push(this.newRecord);
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.advisorId = this.account.id;
        } else {
            // this.login();
        }
        this.getAdvisorDetails();
    }

    getAdvisorDetails() {
        this.advisorService.getAdvisorDetails(this.advisorId).subscribe(res => {
            this.recommend = res;
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

    saveRecommendation(): void {
        this.recommendation['uid'] = this.uid;
        this.recommendation['aid'] = this.advisorId;
        this.recommendation['recotype'] = 'Portfolio';
        this.recommendation['reco'] = this.recommend;
        this.recommendation['recoby'] = this.account.firstName;
        this.recommendation['recodate'] = this.date;
        this.advisorService.saveRecommendation(this.recommendation).subscribe(res => {
            console.log(res);
            this.getAdvisorDetails();
        });
    }
}
