import { Directive, ContentChildren, QueryList, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { MovableDirective } from 'app/shared/draggable/movable.directive';
import { Subscription } from 'rxjs';

export interface Boundaries {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

@Directive({
  selector: '[jhiMovableArea]'
})
export class MovableAreaDirective implements OnInit, AfterContentInit {

  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.movables.changes.subscribe( () => {

      this.subscriptions.forEach(s => s.unsubscribe());

      this.movables.forEach( movable => {
        this.subscriptions.push(movable.dragStart.subscribe( () => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe( () => this.maintainBoundaries(movable)));
      });
    });

    this.movables.notifyOnChanges();
  }

  private measureBoundaries(movable: MovableDirective) {
    // measure boundaries here
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y
    };

    // console.log('boundaries : ', this.boundaries);
  }
  private maintainBoundaries(movable: MovableDirective) {
    // maintain boundaries here
    // movable.position.x = movable.position.x < this.boundaries.minX ? this.boundaries.minX : movable.position.x;

    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }

}
