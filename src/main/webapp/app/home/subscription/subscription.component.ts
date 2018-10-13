import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: [
    './subscription.component.css',
    '../../css/universal.css'
  ]
})
export class SubscriptionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pay() {
    this.router.navigate(['subscriber']);
  }

}
