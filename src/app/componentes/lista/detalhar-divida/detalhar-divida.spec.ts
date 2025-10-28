import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharDivida } from './detalhar-divida';

describe('DetalharDivida', () => {
  let component: DetalharDivida;
  let fixture: ComponentFixture<DetalharDivida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharDivida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharDivida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
