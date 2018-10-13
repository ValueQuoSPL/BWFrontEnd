import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-banner',
  templateUrl: './banner.component.html',
  styleUrls: [
    './banner.component.css',
    '../../css/universal.css'
  ]
})
export class BannerComponent implements OnInit {
  myVar;
  constructor() { }

  ngOnInit() {
  }

}
