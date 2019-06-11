import { Component, OnInit } from '@angular/core';
import { AccountService, LoginService } from 'app/core';
import { AppointmentManageService } from 'app/admin/appointment-manage/appointment-manage.service';
import { CalendarView } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { AppointmentService } from 'app/appointment/appointment.service';

export class Appointment {
    id;
    uid;
    date;
    time;
    status;
    email;
    name;
    description;
}

@Component({
    selector: 'jhi-appointment-manage',
    templateUrl: './appointment-manage.component.html',
    styles: []
})
export class AppointmentManageComponent implements OnInit {
    uid: any;
    tempUserId: any;
    tempAppointmentManage: any = [];
    appointmentManage: any = [];
    userInfo: any = [];
    account: any;
    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Day;
    CalendarView = CalendarView;
    currentTime: any;
    formatDate: any;
    closeResult;
    val: string;

    tempAppointmentData: any = [];
    _day: any;
    _time: any;
    _status: any;

    isAppointmentData;
    isAppointmentData11;
    isAppointmentData1;
    isAppointmentData3;
    isAppointmentData5;
    isAppointmentData7;
    isAppointmentData9;

    diableTimeSlot = false;
    diableTimeSlot11 = false;
    diableTimeSlot1 = false;
    diableTimeSlot3 = false;
    diableTimeSlot5 = false;
    diableTimeSlot7 = false;
    diableTimeSlot9 = false;

    date = new Date();
    currentDate: any;

    appointment: Appointment = new Appointment();

    constructor(
        private accountService: AccountService,
        private appointmentManageService: AppointmentManageService,
        private loginService: LoginService,
        private datepipe: DatePipe,
        private modalService: NgbModal,
        private appointmentService: AppointmentService
    ) {}

    ngOnInit() {
        this.getUserid();
        this.getData();
        this.today();
    }

    getUserid() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
        }
    }

    // Displaying Today's Date
    today(): void {
        this.viewDate = new Date();
        this.currentTime = this.datepipe.transform(this.viewDate, 'HH:mm:ss');
        this.formatDate = this.datepipe.transform(this.viewDate, 'yyyy-MM-dd');
        this.validation();
        this.getCalendar();
    }

    // Open Modal OF Appointment for Book
    openAppointment(appointmentModal, time, appointmentStatus) {
        this.appointment.email = '';
        this.appointment.description = '';
        // console.log(time, appointmentStatus);

        this.modalService.open(appointmentModal, { ariaLabelledBy: 'appointmentModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                // this.loading = true;
                this.postCalendar(time, appointmentStatus);
                this.clear();
                this.getCalendar();
            },
            reason => {
                // this.clear();
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
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
                    } else if (this._status === 'confirm' && this._time === '11:00 A.M') {
                        this.isAppointmentData11 = true;
                    } else if (this._status === 'confirm' && this._time === '1:00 P.M') {
                        this.isAppointmentData1 = true;
                    } else if (this._status === 'confirm' && this._time === '3:00 P.M') {
                        this.isAppointmentData3 = true;
                    } else if (this._status === 'confirm' && this._time === '5:00 P.M') {
                        this.isAppointmentData5 = true;
                    } else if (this._status === 'confirm' && this._time === '7:00 P.M') {
                        this.isAppointmentData7 = true;
                    } else if (this._status === 'confirm' && this._time === '9:00 A.M') {
                        this.isAppointmentData9 = true;
                    }
                }
            }
        });
    }

    openEditAppointment(editAppointmentManagement, l, appointmentStatus) {
        // console.log('under edit appointment', l);
        this.appointment.id = l.id;
        this.appointment.uid = l.uid;
        this.appointment.time = l.time;
        this.appointment.date = this.datepipe.transform(l.date, 'yyyy-MM-dd');
        this.appointment.name = l.name;
        this.appointment.email = l.email;
        this.appointment.description = l.description;
        this.appointment.status = appointmentStatus;
        this.modalService.open(editAppointmentManagement, { ariaLabelledBy: 'editAppointmentManagement' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                // console.log('appointment object', this.appointment);
                this.updateAppointment(this.appointment);
            },
            reason => {
                // this.clear();
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

    // post data
    postCalendar(time, appointmentStatus) {
        // console.log('under appointment management', this.appointment);
        const hour = time.split(':', 1);
        this.viewDate.setHours(hour);
        this.viewDate.setMinutes(0, 0);
        const dateTime = this.viewDate.toISOString();
        this.appointment.uid = this.uid;
        this.appointment.date = dateTime;
        this.appointment.time = time;
        this.appointment.status = appointmentStatus;
        this.appointmentService.postCalendar(this.appointment).subscribe(response => {
            this.getData();
        });
    }

    updateAppointment(appointment) {
        this.appointmentManageService.postAppointment(appointment).subscribe(response => {
            this.getData();
        });
    }

    // next day's date
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

    getData() {
        this.appointmentManage = [];
        this.appointmentManageService.getAppointmentData().subscribe(data => {
            this.tempAppointmentManage = data;
            for (let index = 0; index < this.tempAppointmentManage.length; index++) {
                const time = this.tempAppointmentManage[index].time;
                const date = this.tempAppointmentManage[index].date;
                const id = this.tempAppointmentManage[index].id;
                const email = this.tempAppointmentManage[index].email;
                const uid = this.tempAppointmentManage[index].uid;
                const description = this.tempAppointmentManage[index].description;

                this.tempUserId = this.tempAppointmentManage[index].uid;
                this.appointmentManageService.getUserdata(this.tempUserId).subscribe(res => {
                    this.userInfo = res;
                    for (let i = 0; i < this.userInfo.length; i++) {
                        const name = this.userInfo[i].firstName;
                        // const email = this.userInfo[i].email;
                        this.appointmentManage.push({
                            name,
                            email,
                            time,
                            date,
                            uid,
                            id,
                            description
                        });
                    }
                });
            }
        });
    }

    RemoveAppointment(index, id) {
        const retVal = confirm('Do you want to delete this Appointment');
        if (retVal === true) {
            this.appointmentManageService.deleteData(id).subscribe();
            this.appointmentManage.splice(index, 1);
        }
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

    clear() {
        this.appointment.email = '';
        this.appointment.description = '';
    }
}
