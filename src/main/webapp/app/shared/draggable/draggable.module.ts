import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from 'app/shared/draggable/draggable.directive';
import { DraggableRxDirective } from 'app/shared/draggable/draggable-rx.directive';
import { MovableDirective } from 'app/shared/draggable/movable.directive';
import { MovableAreaDirective } from 'app/shared/draggable/movable-area.directive';
import { DraggableHelperDirective } from 'app/shared/draggable/draggable-helper.directive';
import { SortableDirective } from 'app/shared/draggable/sortable.directive';
import { SortableListDirective } from 'app/shared/draggable/sortable-list.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableDirective,
    SortableListDirective
  ],
  providers: [
  ]
})
export class DraggableModule { }
