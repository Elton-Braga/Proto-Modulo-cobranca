import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDivida } from './consultar-divida';

describe('ConsultarDivida', () => {
  let component: ConsultarDivida;
  let fixture: ComponentFixture<ConsultarDivida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarDivida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDivida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
