import { Component, OnInit } from '@angular/core';
import { UserContact } from 'app/sheetal/contactus/contact.model';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import * as $ from 'jquery';
@Component({
    selector: 'jhi-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.css', '../../css/universal.css']
})
export class ContactusComponent implements OnInit {
    user: UserContact = new UserContact();
    constructor(private contactService: ContactService) {}
    submitUser() {
        console.log('in contact ts', this.user.name);
        console.log('in contact ts', this.user.email);
        console.log('in contact ts', this.user.phone);
        console.log('in contact ts', this.user.msg);
        this.contactService.save(this.user).subscribe();
        alert('Thank you for your Intrest we will shortly contact you');
    }

    resetContact() {}

    ngOnInit() {
        // Validation for name
        $('#name').bind('keypress', function(event) {
            const charCode = event.which;
            if (charCode === 8 || charCode === 0) {
                return;
            } else {
                const keyChar = String.fromCharCode(charCode);
                return /[a-zA-Z\s]/.test(keyChar);
            }
        });
    }
    resetValue() {
        this.user.name = '';
        this.user.phone = '';
        this.user.email = '';
        this.user.msg = '';
    }
}
