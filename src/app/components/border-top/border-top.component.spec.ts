import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderTopComponent } from './border-top.component';

describe('BorderTopComponent', () => {
  let component: BorderTopComponent;
  let fixture: ComponentFixture<BorderTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
