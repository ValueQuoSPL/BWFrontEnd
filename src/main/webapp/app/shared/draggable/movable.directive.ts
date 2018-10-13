import {
  Directive,
  OnInit,
  HostListener,
  HostBinding,
  Input,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { DraggableDirective } from 'app/shared/draggable/draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[jhiMovable]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('class.movable') movable = true;

  public position: Position = { x: 0, y: 0 };
  private startPosition: Position;

  // tslint:disable-next-line:no-input-rename
  @Input('appMovableReset') reset = false;
  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    super();
  }

  @HostBinding('style.transform')
  get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
    // console.log('start');
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    // console.log('moving...');
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event) {
    if (this.reset) {
      this.position = { x: 0, y: 0 };
    }
    // console.log('end');
  }
}
