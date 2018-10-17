import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-assumption',
  templateUrl: './assumption.component.html',
  styles: []
})
export class AssumptionComponent implements OnInit {
  assumption: any;

  constructor() {}

  ngOnInit() {
    this.assumption = {};
  }
}
