import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientoDetalle } from './alojamiento-detalle';

describe('AlojamientoDetalle', () => {
  let component: AlojamientoDetalle;
  let fixture: ComponentFixture<AlojamientoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientoDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
