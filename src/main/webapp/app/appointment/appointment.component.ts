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
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { AppointmentService } from 'app/appointment/appointment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

export class Appointment {
    id;
    uid;
    date;
    time;
    status;
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
    styleUrls: []
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
    _status: any;
    formatDate: any;
    activeDayIsOpen = true;
    modalRef: NgbModalRef;
    account: Account;
    appointmentResult: any = [];
    status: any;
    elementId: any;
    isStatus: any;
    resolveData: any;
    isBooked = false;
    diableTimeSlot = false;
    diableTimeSlot11 = false;
    diableTimeSlot1 = false;
    diableTimeSlot3 = false;
    diableTimeSlot5 = false;
    diableTimeSlot7 = false;
    diableTimeSlot9 = false;
    currentTime: any;
    currentDate: any;
    nextDate: any;
    date = new Date();

    constructor(
        private appointmentService: AppointmentService,
        private modalService: NgbModal,
        private accountService: AccountService,
        private datepipe: DatePipe,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private route: Router,
        private _route: ActivatedRoute
    ) {
        this.appointmentResult = this._route.snapshot.data['appointment'];
        for (let index = 0; index < this.appointmentResult.length; index++) {
            this.isStatus = this.appointmentResult[index].status;
        }
        if (this.isStatus === 'confirm') {
            this.isBooked = true;
        } else {
            this.isBooked = false;
        }
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    this.getCalendar();
                    // this.getCalendarByUid();
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
        this.validation();
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
        this.currentTime = this.datepipe.transform(this.viewDate, 'HH:mm:ss');
        this.formatDate = this.datepipe.transform(this.viewDate, 'yyyy-MM-dd');
        this.validation();
        this.getCalendar();
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
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
        this.validation();
    }

    validation() {
        this.currentDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
        if (this.currentDate === this.formatDate) {
            if (this.currentTime > '09:00:00 am') {
                this.diableTimeSlot = true;
            } else {
                this.diableTimeSlot = false;
            }
            if (this.currentTime > '11:00:00 a.m') {
                this.diableTimeSlot11 = true;
            } else {
                this.diableTimeSlot11 = false;
            }
            if (this.currentTime > '13:00:00 p.m') {
                this.diableTimeSlot1 = true;
            } else {
                this.diableTimeSlot1 = false;
            }
            if (this.currentTime > '15:00:00 p.m') {
                this.diableTimeSlot3 = true;
            } else {
                this.diableTimeSlot3 = false;
            }
            if (this.currentTime > '17:00:00 p.m') {
                this.diableTimeSlot5 = true;
            } else {
                this.diableTimeSlot5 = false;
            }
            if (this.currentTime > '19:00:00 p.m') {
                this.diableTimeSlot7 = true;
            } else {
                this.diableTimeSlot7 = false;
            }
            if (this.currentTime > '21:00:00 p.m') {
                this.diableTimeSlot9 = true;
            } else {
                this.diableTimeSlot9 = false;
            }
        } else {
            this.diableTimeSlot = false;
            this.diableTimeSlot11 = false;
            this.diableTimeSlot1 = false;
            this.diableTimeSlot3 = false;
            this.diableTimeSlot5 = false;
            this.diableTimeSlot7 = false;
            this.diableTimeSlot9 = false;
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    // route to appointment page
    gotoAppointment() {
        this.status = 'Reschedule';
        this.appointment.status = this.status;
        for (let index = 0; index < this.appointmentResult.length; index++) {
            this.elementId = this.appointmentResult[index].id;
        }
        this.appointment.id = this.elementId;
        this.appointmentService.updateCalendar(this.appointment).subscribe(data => {
            this.getCalendar();
        });
        this.clear();
        this.isBooked = false;
    }

    // updateStatus click on cnacel button
    updateStatus() {
        const response = confirm('Are you sure want to cancel appointment');
        if (response) {
            this.status = 'cancel';
            this.appointment.status = this.status;
            for (let index = 0; index < this.appointmentResult.length; index++) {
                this.elementId = this.appointmentResult[index].id;
            }
            this.appointment.id = this.elementId;
            this.appointmentService.updateCalendar(this.appointment).subscribe(data => {});
            this.route.navigate(['dashboard']);
        } else {
            this.isBooked = false;
        }
    }

    // Post Data
    postCalendar(time, appointmentStatus) {
        const hour = time.split(':', 1);
        this.viewDate.setHours(hour);
        this.viewDate.setMinutes(0, 0);
        const dateTime = this.viewDate.toISOString();
        this.appointment.uid = this.uid;
        this.appointment.date = dateTime;
        this.appointment.time = time;
        this.appointment.status = appointmentStatus;
        this.appointmentService.postCalendar(this.appointment).subscribe(response => {
            this.getCalendarByUid();
        });
    }

    // get by uid appointment
    getCalendarByUid() {
        this.appointmentService.getCalendarByUid().subscribe(data => {
            this.appointmentResult = data;
            for (let index = 0; index < this.appointmentResult.length; index++) {
                this.isStatus = this.appointmentResult[index].status;
            }
            if (this.isStatus === 'confirm') {
                this.isBooked = true;
            } else {
                this.isBooked = false;
            }
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
                const onlyDate = this.datepipe.transform(this._day, 'yyyy-MM-dd');
                this._status = this.tempAppointmentData[index].status;
                this._time = this.tempAppointmentData[index].time;
                if (this.formatDate === onlyDate) {
                    if (this._status === 'confirm' && this._time === '9:00 A.M') {
                        this.isAppointmentData = true;
                    } else if (this._status === 'confirm' && this._time === '11:00A.M') {
                        this.isAppointmentData11 = true;
                    } else if (this._status === 'confirm' && this._time === '1:00P.M') {
                        this.isAppointmentData1 = true;
                    } else if (this._status === 'confirm' && this._time === '3:00P.M') {
                        this.isAppointmentData3 = true;
                    } else if (this._status === 'confirm' && this._time === '5:00P.M') {
                        this.isAppointmentData5 = true;
                    } else if (this._status === 'confirm' && this._time === '7:00P.M') {
                        this.isAppointmentData7 = true;
                    } else if (this._status === 'confirm' && this._time === '9:00A.M') {
                        this.isAppointmentData9 = true;
                    }
                }
            }
        });
    }

    openAppointment(appointmentModal, time, appointmentStatus) {
        this.modalService.open(appointmentModal, { ariaLabelledBy: 'appointmentModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.postCalendar(time, appointmentStatus);
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

    clear() {
        this.appointment.id = null;
        this.appointment.date = null;
        this.appointment.time = null;
        this.appointment.status = null;
    }

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
