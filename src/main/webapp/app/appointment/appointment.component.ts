import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Principal, LoginModalService, AccountService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  endOfDay,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { AppointmentService } from './appointment.service';
import {
  NgbModal,
  ModalDismissReasons
} from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '../../../../../node_modules/@angular/common';

class Appointment {
  uid;
  date;
  time;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'jhi-appointment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  postData: any = [];
  form: any;
  submitted = false;
  closeResult;
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  appointment: Appointment = new Appointment();
  val: any;
  uid: any;
  tempAppointmentData: any = [];
  isAppointmentData;
  isAppointmentData11;
  isAppointmentData1;
  isAppointmentData3;
  isAppointmentData5;
  isAppointmentData7;
  isAppointmentData9;
  _day: any;
  _time: any;
  formatDate: any;
  activeDayIsOpen = true;
  modalRef: NgbModalRef;
  account: Account;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private accountService: AccountService,
    private datepipe: DatePipe,
    private principal: Principal,
    private loginModalService: LoginModalService
  ) {}

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          // this.getCalendar();
        } else {
        }
      })
      .catch(err => {});
  }

  increment(): void {
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);
    this.formatDate = this.datepipe.transform(this.viewDate, 'yyyy-MM-dd');
  }
  decrement(): void {
    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];
    this.viewDate = subFn(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
    this.formatDate = this.datepipe.transform(this.viewDate, 'yyyy-MM-dd');
    this.getCalendar();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  ngOnInit() {
    this.today();
    this.getUserid();
    this.principal.identity().then(account => {
      this.account = account;
    });
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  // Post Data
  postCalendar(time) {
    this.appointment.uid = this.uid;
    this.appointment.date = this.viewDate;
    this.appointment.time = time;
    this.appointmentService.postCalendar(this.appointment).subscribe(data => {
    });
  }

  // Get Data
  getCalendar() {
    this.appointmentService.getCalendar().subscribe(data => {
      this.tempAppointmentData = data;
      this.isAppointmentData = false;
      this.isAppointmentData11 = false;
      this.isAppointmentData1 = false;
      this.isAppointmentData3 = false;
      this.isAppointmentData5 = false;
      this.isAppointmentData7 = false;
      this.isAppointmentData9 = false;
      for (let index = 0; index < this.tempAppointmentData.length; index++) {
        this._day = this.tempAppointmentData[index].date;
        this._time = this.tempAppointmentData[index].time;
        if (this.formatDate === this._day) {
          if (this._time === '9 AM') {
            this.isAppointmentData = true;
          } else if (this._time === '11:00A.M') {
            this.isAppointmentData11 = true;
          } else if (this._time === '1:00P.M') {
            this.isAppointmentData1 = true;
          } else if (this._time === '3:00P.M') {
            this.isAppointmentData3 = true;
          } else if (this._time === '5:00P.M') {
            this.isAppointmentData5 = true;
          } else if (this._time === '7:00P.M') {
            this.isAppointmentData7 = true;
          } else if (this._time === '9:00P.M') {
            this.isAppointmentData9 = true;
          }
        }
      }
    });
  }

  openAppointment(appointmentModal, time) {
    this.modalService
      .open(appointmentModal, { ariaLabelledBy: 'appointmentModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.postCalendar(time);
          this.getCalendar();
        },
        reason => {
          this.clear();
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  clear() {}

  value() {
    this.val = '9AM';
  }
  value1() {
    this.val = '11AM';
  }
  value2() {
    this.val = '1PM';
  }
  value3() {
    this.val = '3AM';
  }
  value4() {
    this.val = '5PM';
  }
  value5() {
    this.val = '7PM';
  }
  value6() {
    this.val = '9PM';
  }
}
