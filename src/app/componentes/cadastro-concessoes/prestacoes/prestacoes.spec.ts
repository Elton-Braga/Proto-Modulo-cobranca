import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prestacoes } from './prestacoes';

describe('Prestacoes', () => {
  let component: Prestacoes;
  let fixture: ComponentFixture<Prestacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prestacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prestacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
