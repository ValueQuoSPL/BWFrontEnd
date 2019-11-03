import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvisorViewService } from '../advisorview.service';
import { LoginService } from 'app/core/login/login.service';

export class DialogData {
    type: string;
    recommendObject: any;
}

@Component({
    selector: 'jhi-recommendation',
    templateUrl: './recommendation.component.html',
    styles: []
})
export class RecommendationComponent implements OnInit {
    recommendation = {};
    recoData: any;
    buttonType: string;
    isRecommendData: string;
    account: any;
    authority: string;
    userComments: string;

    constructor(
        private advisorService: AdvisorViewService,
        public dialogRef: MatDialogRef<RecommendationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private loginService: LoginService
    ) {
        this.account = this.loginService.getCookie();
        this.authority = this.account.authorities[0];
        this.isRecommendData = this.authority;
    }

    ngOnInit() {
        if (this.data.type === 'save') {
            this.buttonType = this.data.type;
        } else if (this.data.type === 'update') {
            this.buttonType = this.data.type;
            if (this.data.recommendObject.type === 'user') {
                this.userComments = this.data.recommendObject.usercomment;
            } else {
                this.recoData = this.data.recommendObject.reco;
            }
        }
    }

    saveRecommendation(): void {
        if (this.recoData) {
            this.data.recommendObject.reco = this.recoData;
            this.advisorService.saveRecommendation(this.data.recommendObject).subscribe(res => {
                // console.log(res);
            });
        }
    }

    /**
     * Date: 30/07/2019
     *  update record of recommendation
     */
    updateRecommendation(): void {
        this.data.recommendObject.reco = this.recoData;
        this.advisorService.updateRecommendation(this.data.recommendObject).subscribe(res => {});
    }

    updateUserComments(): void {
        this.data.recommendObject.usercomment = this.userComments;
        this.advisorService.updateRecommendation(this.data.recommendObject).subscribe(res => {});
    }
}
