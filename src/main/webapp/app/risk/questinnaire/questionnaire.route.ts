import { Route } from '@angular/router';

import { QuestionnaireComponent } from 'app/risk/questinnaire/questionnaire.component';

export const questionnaireRoute: Route = {
    path: 'questionnaire',
    component:  QuestionnaireComponent,
    data: {
        authorities: [],
        pageTitle: 'questionnaire'
    }
};
