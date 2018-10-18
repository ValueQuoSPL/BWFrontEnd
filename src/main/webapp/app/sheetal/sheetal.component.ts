import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-sheetal',
  templateUrl: './sheetal.component.html',
  styleUrls: ['sheetal.css']
})
export class SheetalComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'SheetalComponent message';
  }

  ngOnInit() {}
}
