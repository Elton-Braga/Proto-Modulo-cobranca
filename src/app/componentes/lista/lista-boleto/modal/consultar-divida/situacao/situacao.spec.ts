import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Situacao } from './situacao';

describe('Situacao', () => {
  let component: Situacao;
  let fixture: ComponentFixture<Situacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Situacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Situacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
