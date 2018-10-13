import { Component, OnInit } from '@angular/core';
import { AccountService, Principal } from 'app/core';
import { AppointmentManageService } from 'app/admin/appointment-manage/appointment-manage.service';

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

  constructor(
    private accountService: AccountService,
    private appointmentManageService: AppointmentManageService
  ) {}

  ngOnInit() {
    this.getData();
    // this.userData();
  }

  getUserid() {
    console.log('inside get uid');
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from income userid is : ', this.uid);
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  // get service call
  getData() {
    this.appointmentManageService.getAppointmentData().subscribe(data => {
      console.log(data);
      this.tempAppointmentManage = data;
      for (let index = 0; index < this.tempAppointmentManage.length; index++) {
        const time = this.tempAppointmentManage[index].time;
        const date = this.tempAppointmentManage[index].date;
        const id = this.tempAppointmentManage[index].id;

        this.tempUserId = this.tempAppointmentManage[index].uid;
        this.appointmentManageService
          .getUserdata(this.tempUserId)
          .subscribe(res => {
            // console.log(res);
            this.userInfo = res;
            for (let i = 0; i < this.userInfo.length; i++) {
              const name = this.userInfo[i].firstName;
              const email = this.userInfo[i].email;
              this.appointmentManage.push({
                name,
                email,
                time,
                date,
                id
              });
            }
          });
      }
    });
  }
  // Delete Data
  RemoveAppointment(index, id) {
    this.appointmentManageService.deleteData(id).subscribe();
    this.appointmentManage.splice(index, 1);
  }
}
