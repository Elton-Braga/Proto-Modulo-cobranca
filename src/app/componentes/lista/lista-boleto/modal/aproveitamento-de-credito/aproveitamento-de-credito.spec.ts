import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproveitamentoDeCredito } from './aproveitamento-de-credito';

describe('AproveitamentoDeCredito', () => {
  let component: AproveitamentoDeCredito;
  let fixture: ComponentFixture<AproveitamentoDeCredito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproveitamentoDeCredito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproveitamentoDeCredito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
