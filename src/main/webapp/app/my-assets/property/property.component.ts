import { Component, OnInit } from '@angular/core';
import { Property } from 'app/my-assets/property/property.modal';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from 'app/my-assets/property/property.service';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';

@Component({
    selector: 'jhi-property',
    templateUrl: './property.component.html',
    styles: []
})
export class PropertyComponent implements OnInit {
    user: any;
    closeResult: string;
    commonid: number;
    conformkey: boolean;
    uid: any;
    getdata: any;
    out: any;
    propertyDetail: any;
    property: Property = new Property();
    isSaving;
    prop_type: any;
    account: any;

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public propertyservice: PropertyService,
        public commonService: CommonSidebarService
    ) {}

    ngOnInit() {
        this.FetchId();
    }
    // FetchId(): Promise<any> {
    //     return this.account
    //         .get()
    //         .toPromise()
    //         .then(response => {
    //             this.user = response.body;
    //             this.property.userid = this.user.id;
    //             this.uid = this.property.userid;
    //             // this.getMyProfilebyid(this.uid);
    //             // this. getAltInvestment(this.uid)
    //             // this.getCashDetailsByuid(this.uid);
    //             this.getsavePropertyByuid(this.uid);
    //         });
    // }
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.property.userid = this.account.id;
            this.getsavePropertyByuid(this.uid);
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    openProperty(content) {
        this.resetFieldValue();
        this.modalService.open(content, { ariaLabelledBy: 'propertyModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.saveProperty();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    openEditProperty(editpropertyModal, id) {
        this.commonid = id;
        this.getPropertyById(this.commonid);
        this.modalService.open(editpropertyModal, { ariaLabelledBy: 'editpropertyModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.update(this.commonid);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    opendeleteProperty(id) {
        this.commonid = id;
        this.delete(this.commonid);
    }
    saveProperty() {
        this.property.prop_type = this.prop_type;
        this.propertyservice.PropertyDetails(this.property).subscribe(data => {
            this.getsavePropertyByuid(this.uid);
        });
    }
    getsavePropertyByuid(uid) {
        this.propertyservice.getsavePropertyByuid(this.uid).subscribe(res => {
            this.propertyDetail = res;
        });
    }
    getPropertyById(commonid) {
        this.propertyservice.getPropertyById(this.commonid).subscribe(res => {
            this.getdata = res;
            this.property.prop_name = this.getdata.prop_name;
            this.prop_type = this.getdata.prop_type;
            this.property.prop_type = this.prop_type;
            this.property.prop_details = this.getdata.prop_details;
            this.property.current_m_value = this.getdata.current_m_value;
            this.property.as_of_date = this.getdata.as_of_date;
            this.property.notes = this.getdata.notes;
        });
    }
    update(commonid) {
        // this.getStockId(this.id)
        this.property.id = this.commonid;
        // this.newid= this.stocks.id;
        // this.getStockId(this.newid);
        this.propertyservice.UpdateProperty(this.property).subscribe(data => {
            this.getsavePropertyByuid(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            // this.conformkey = 'You pressed OK!';
            // this.getStockId(this.id)
            this.property.id = this.commonid;
            this.propertyservice.DeleteProperty(this.property.id).subscribe(data => {
                this.getsavePropertyByuid(this.uid);
            });
        } else {
            this.getsavePropertyByuid(this.uid);
        }
    }
    resetFieldValue() {
        this.property.prop_name = '';
        this.property.prop_type = '';
        this.property.prop_details = '';
        this.property.current_m_value = null;
        this.property.as_of_date = '';
        this.property.notes = '';
    }
}
