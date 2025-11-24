import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBoleto } from './lista-boleto';

describe('ListaBoleto', () => {
  let component: ListaBoleto;
  let fixture: ComponentFixture<ListaBoleto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaBoleto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBoleto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
