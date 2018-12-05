import { UserContact } from 'app/sheetal/contactus/contact.model';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-refer',
    templateUrl: './refer.component.html',
    styleUrls: ['./refer.component.css', '../../css/universal.css']
})
export class ReferComponent implements OnInit {
    user: UserContact = new UserContact();
    constructor(private contactService: ContactService) {}
    // isDataSaved: Boolean = false;
    submitUser() {
        console.log('in reffer ts', this.user.name);
        console.log('in reffer ts', this.user.email);
        console.log('in reffer ts', this.user.phone);
        console.log('in reffer ts', this.user.msg);
        this.contactService.refferSave(this.user).subscribe();
        // this.isDataSaved = true;
        // alert('Thank you for your Intrest we will shortly contact you');
    }

    ngOnInit() {}
}
