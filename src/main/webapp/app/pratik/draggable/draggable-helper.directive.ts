import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jhiDraggableHelper]',
  exportAs: 'jhiDraggableHelper'
})
export class DraggableHelperDirective {

  constructor(public templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  onDragStart() {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
  onDragEnd() {
    this.viewContainerRef.clear();
  }

}
