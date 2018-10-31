import { Route } from '@angular/router';

import { ContactusComponent } from 'app/sheetal/contactus/contactus.component';

export const contactRoute: Route = {
    path: 'contact',
    component: ContactusComponent,
    data: {
        authorities: [],
        pageTitle: 'Contact Us'
    }
};
