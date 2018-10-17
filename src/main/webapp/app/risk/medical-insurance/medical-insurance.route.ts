import { Route } from '@angular/router';

import { MedicalInsuranceComponent } from 'app/risk/medical-insurance/medical-insurance.component';

export const medicalRoute: Route = {
    path: 'medical',
    component:  MedicalInsuranceComponent,
    data: {
        authorities: [],
        pageTitle: 'medical-insurance'
    }
};
