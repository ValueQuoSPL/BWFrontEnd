import { UserContact } from 'app/sheetal/contactus/contact.model';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-refer',
    templateUrl: './refer.component.html',
    styleUrls: ['./refer.component.css', '../../css/universal.css']
})
export class ReferComponent implements OnInit {
    user: UserContact = new UserContact();
    constructor(private contactService: ContactService) {}
    // isDataSaved: Boolean = false;
    isDisabled: Boolean = false; // added by ranjan
    submitUser() {
        this.contactService.refferSave(this.user).subscribe();
        // this.isDataSaved = true;
        // alert('Thank you for your Intrest we will shortly contact you');
        this.isDisabled = !this.isDisabled; // added by ranjan
        alert('Thank you for reffering. Your message has been emailed to your friend'); // added by ranjan
    }

    // added by ranjan start
    ngOnInit() {
        // Validation for name
        $('#yourname').bind('keypress', function(event) {
            const charCode = event.which;
            if (charCode === 8 || charCode === 0) {
                return;
            } else {
                const keyChar = String.fromCharCode(charCode);
                return /[a-zA-Z\s]/.test(keyChar);
            }
        });
    }
    // added by ranjan  ends
}
