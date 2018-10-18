
import { Component } from '@angular/core';

/** @title Form field with error messages */
@Component({
  selector: 'jhi-requestmeeting',
  templateUrl: './requestmeeting.component.html',
  styleUrls: ['./requestmeeting.component.css']
})
export class RequestmeetingComponent {
  // email = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   return this.email.hasError('required')
  //     ? 'You must enter a value'
  //     : this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
