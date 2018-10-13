import { log } from "util";
import { DraggableDirective } from "app/shared/draggable/draggable.directive";
import {
  Directive,
  QueryList,
  ContentChildren,
  AfterContentInit,
  OnInit
} from "@angular/core";

@Directive({
  selector: "[jhiSortableList]"
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(DraggableDirective) sortables: QueryList<DraggableDirective>;

  private clientRects: ClientRect[];

  constructor() {}

  ngAfterContentInit(): void {
    console.log("hi");
    console.log(`Got ${this.sortables.length} sortable items`);

    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe(() => this.detectSorting());
    });
  }

  private measureClientRects(): any {
    // this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(): any {
    console.log("Detect Sorting...");
  }
}
