import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientoLista } from './alojamiento-lista';

describe('AlojamientoLista', () => {
  let component: AlojamientoLista;
  let fixture: ComponentFixture<AlojamientoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
