import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RequestmeetingComponent } from "app/sheetal/requestmeeting/requestmeeting.component";

describe("RequestmeetingComponent", () => {
  let component: RequestmeetingComponent;
  let fixture: ComponentFixture<RequestmeetingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RequestmeetingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
