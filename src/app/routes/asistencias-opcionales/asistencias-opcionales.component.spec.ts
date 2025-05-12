import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasOpcionalesComponent } from './asistencias-opcionales.component';

describe('AsistenciasOpcionalesComponent', () => {
  let component: AsistenciasOpcionalesComponent;
  let fixture: ComponentFixture<AsistenciasOpcionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasOpcionalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasOpcionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
