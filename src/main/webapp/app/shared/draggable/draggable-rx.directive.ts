import {
  Directive,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
  OnInit
} from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, takeUntil, repeat, take } from "rxjs/operators";

@Directive({
  selector: "[jhiDraggableRx]"
})
export class DraggableRxDirective implements OnInit {
  @HostBinding("class.draggable") draggable = true;
  @HostBinding("class.dragging") dragging = false;

  @Output() dragStart = new EventEmitter();
  @Output() dragMove = new EventEmitter();
  @Output() dragEnd = new EventEmitter();

  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();

  @HostListener("mousedown", ["$event"])
  onPointerDown(event) {
    this.pointerDown.next(event);
  }

  @HostListener("document:mousemove", ["$event"])
  onPointerMove(event) {
    this.pointerMove.next(event);
  }

  @HostListener("document:mouseup", ["$event"])
  onPointerUp(event) {
    this.pointerUp.next(event);
  }

  ngOnInit() {
    // for drag start
    this.pointerDown.asObservable().subscribe(event => {
      this.dragging = true;
      this.dragStart.emit(event);
    });

    // for drag move
    this.pointerDown
      .pipe(
        switchMap(() => this.pointerMove),
        takeUntil(this.pointerUp),
        repeat()
      )
      .subscribe(event => this.dragMove.emit(event));

    // for drag end
    this.pointerDown
      .pipe(switchMap(() => this.pointerUp.pipe(take(1))))
      .subscribe(event => {
        this.dragging = false;
        this.dragEnd.emit(event);
      });
  }
}
