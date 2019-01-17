import { UserContact } from 'app/sheetal/contactus/contact.model';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-refer',
    templateUrl: './refer.component.html',
    styleUrls: ['./refer.component.css', '../../css/universal.css']
})
export class ReferComponent implements OnInit {
    isDisable: Boolean = false;
    user: UserContact = new UserContact();
    constructor(private contactService: ContactService) {}
    // isDataSaved: Boolean = false;
    submitUser() {
        this.contactService.refferSave(this.user).subscribe();
        this.isDisable = !this.isDisable;
        // this.isDataSaved = true;
        // alert('Thank you for your Intrest we will shortly contact you');
    }

    ngOnInit() {}
}
