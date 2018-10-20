import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyComponent } from '../family/family.component';
import { familyRoute } from './family.route';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from '../family/myprofile/myprofile.component';
import { AssumptionComponent } from '../family/assumption/assumption.component';
import { MyprofileService } from './myprofile/myprofile.service';
import { FamilyprofileService } from './familyprofile/familyprofile.service';
import { CustomMaterialModule } from '../custom-material.module';
import { FamilyprofileComponent } from 'app/family/familyprofile/familyprofile.component';
import { FamilyserviceService } from 'app/family/familyservice.service';
import { CustomDirectiveModule } from 'app/pratik/directive/directive.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

@NgModule({
    imports: [
        RouterModule.forRoot([familyRoute], { useHash: true }),
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        CustomDirectiveModule,
        FontAwesomeModule
        // BsDatepickerModule.forRoot()
    ],
    declarations: [FamilyComponent, MyprofileComponent, AssumptionComponent, FamilyprofileComponent],
    entryComponents: [],
    providers: [MyprofileService, FamilyprofileService, FamilyserviceService]
})
export class FamilyModule {}
