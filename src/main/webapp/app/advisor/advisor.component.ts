import { Component, OnInit } from '@angular/core';
import { AdvisorService } from 'app/advisor/advisor.service';

@Component({
    selector: 'jhi-appointment',
    templateUrl: './advisor.component.html',
    styleUrls: []
})
export class AdvisorComponent implements OnInit {
    searchName: string;
    paymentData: any = [];

    constructor(private advisorService: AdvisorService) {}

    ngOnInit() {
        this.getPaymentDetail();
    }

    getPaymentDetail() {
        this.advisorService.getPaymentDetailUser().subscribe(data => {
            this.paymentData = data;
        });
    }
}
