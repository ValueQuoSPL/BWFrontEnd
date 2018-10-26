import { FamilyComponent } from 'app/family/family.component';
import { Route } from '@angular/router';
import { MyprofileComponent } from 'app/family/myprofile/myprofile.component';
import { AssumptionComponent } from 'app/family/assumption/assumption.component';
export const familyRoute: Route = {
    path: 'profile',
    component: FamilyComponent,
    children: [{ path: 'profile/myprofile', component: MyprofileComponent }, { path: 'profile/assumption', component: AssumptionComponent }]
};
