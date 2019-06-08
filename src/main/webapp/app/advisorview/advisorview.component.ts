import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { UserService } from 'app/core';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AdvisorService } from 'app/advisor/advisor.service';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'jhi-advisorview',
    templateUrl: './advisorview.component.html',
    styleUrls: []
})
export class AdvisorViewComponent {
    panelcurrentportfolio = false;
    panelinsuranceanalysis = false;
    paneltaxanalysis = false;
    panelgoalanalysis = false;
}
