import { Route } from '@angular/router';

import { JhiDocsComponent } from 'app/admin/docs/docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: JhiDocsComponent,
    data: {
        pageTitle: 'API'
    }
};
