import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-how-do-we-do-it',
    templateUrl: './how-do-we-do-it.component.html',
    styleUrls: ['../../css/universal.css', './HowDoBackground.css'],
    providers: [NgbCarouselConfig]
})
export class HowDoWeDoItComponent {
    showNavigationArrows = false;
    // showNavigationIndicators = false;
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor(config: NgbCarouselConfig, private _http: HttpClient) {
        // customize default values of carousels used by this component tree
        config.showNavigationArrows = true;
        // config.showNavigationIndicators = true;
    }
}
