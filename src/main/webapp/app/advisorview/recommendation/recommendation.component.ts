import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvisorViewService } from '../advisorview.service';

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
    constructor(
        private advisorService: AdvisorViewService,
        public dialogRef: MatDialogRef<RecommendationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {}

    saveRecommendation(): void {
        this.data.recommendObject.reco = this.recoData;
        this.advisorService.saveRecommendation(this.data.recommendObject).subscribe(res => {
            console.log(res);
        });
    }
}
