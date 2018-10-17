import { Directive, ContentChildren, QueryList, AfterContentInit, OnInit, forwardRef, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[jhiSortable]',
  providers: [
    DraggableDirective
  ]
})
export class SortableDirective extends DraggableDirective {
  @HostBinding('class.sortable') sortable = true;
}
