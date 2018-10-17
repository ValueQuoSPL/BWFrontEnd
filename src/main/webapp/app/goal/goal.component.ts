import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-goal',
  templateUrl: './goal.component.html',
  styles: []
})
export class GoalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  selectgoals() {
    this.router.navigate(['goalselect']);
  }
}
