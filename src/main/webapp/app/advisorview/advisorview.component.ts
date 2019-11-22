import { Component } from '@angular/core';
import { LoginService } from 'app/core';

@Component({
    selector: 'jhi-advisorview',
    templateUrl: './advisorview.component.html',
    styleUrls: []
})
export class AdvisorViewComponent {
    account: any;
    authority: any;
    title: any;
    panelcurrentportfolio = false;
    panelinsuranceanalysis = false;
    paneltaxanalysis = false;
    panelgoalanalysis = false;

    constructor(private loginService: LoginService) {
        this.account = this.loginService.getCookie();
        this.authority = this.account.authorities[0];

        if (this.authority === 'ROLE_ADVISOR' || this.authority === 'ROLE_ADMIN') {
            this.title = 'Advisor Recomend Here';
        } else {
            this.title = 'Advice';
        }
    }
}
