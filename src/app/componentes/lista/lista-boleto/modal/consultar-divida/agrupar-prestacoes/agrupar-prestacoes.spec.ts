import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgruparPrestacoes } from './agrupar-prestacoes';

describe('AgruparPrestacoes', () => {
  let component: AgruparPrestacoes;
  let fixture: ComponentFixture<AgruparPrestacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgruparPrestacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgruparPrestacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
