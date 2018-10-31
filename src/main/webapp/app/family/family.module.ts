import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyComponent } from 'app/family/family.component';
import { familyRoute } from 'app/family/family.route';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from 'app/family/myprofile/myprofile.component';
import { AssumptionComponent } from 'app/family/assumption/assumption.component';
import { MyprofileService } from 'app/family/myprofile/myprofile.service';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';
import { CustomMaterialModule } from 'app/custom-material.module';
import { FamilyprofileComponent } from 'app/family/familyprofile/familyprofile.component';
import { FamilyserviceService } from 'app/family/familyservice.service';
import { CustomDirectiveModule } from '../pratik/directive/directive.module';
// import { MyprofileRouteService } from 'app/family/myprofile/myprofileRoute.service';

@NgModule({
    imports: [
        RouterModule.forRoot([familyRoute], { useHash: true }),
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        CustomDirectiveModule
        // BsDatepickerModule.forRoot()
    ],
    declarations: [FamilyComponent, MyprofileComponent, AssumptionComponent, FamilyprofileComponent],
    entryComponents: [],
    providers: [MyprofileService, FamilyprofileService, FamilyserviceService]
})
export class FamilyModule {}
