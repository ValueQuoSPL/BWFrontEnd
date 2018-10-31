import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from 'app/pratik/draggable/draggable.directive';
import { DraggableRxDirective } from 'app/pratik/draggable/draggable-rx.directive';
import { MovableDirective } from 'app/pratik/draggable/movable.directive';
import { MovableAreaDirective } from 'app/pratik/draggable/movable-area.directive';
import { DraggableHelperDirective } from 'app/pratik/draggable/draggable-helper.directive';
import { SortableDirective } from 'app/pratik/draggable/sortable.directive';
import { SortableListDirective } from 'app/pratik/draggable/sortable-list.directive';

@NgModule({
    imports: [CommonModule, BrowserModule],
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
    providers: []
})
export class DraggableModule {}
