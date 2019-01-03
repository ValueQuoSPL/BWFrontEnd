import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-how-do-we-do-it',
    templateUrl: './how-do-we-do-it.component.html',
    styleUrls: ['../../css/universal.css'],
    providers: [NgbCarouselConfig]
})
export class HowDoWeDoItComponent implements OnInit {
    images = [1, 2, 3].map(() => `${Math.random()}`);

    ngOnInit() {}
}
