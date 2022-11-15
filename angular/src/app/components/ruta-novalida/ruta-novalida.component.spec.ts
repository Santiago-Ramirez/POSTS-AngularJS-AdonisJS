import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNovalidaComponent } from './ruta-novalida.component';

describe('RutaNovalidaComponent', () => {
  let component: RutaNovalidaComponent;
  let fixture: ComponentFixture<RutaNovalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaNovalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaNovalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
