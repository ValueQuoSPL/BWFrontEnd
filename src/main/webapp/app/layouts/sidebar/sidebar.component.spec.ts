import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('Sidebar3Component', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SidebarComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
