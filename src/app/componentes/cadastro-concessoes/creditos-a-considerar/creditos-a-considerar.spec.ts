import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosAConsiderar } from './creditos-a-considerar';

describe('CreditosAConsiderar', () => {
  let component: CreditosAConsiderar;
  let fixture: ComponentFixture<CreditosAConsiderar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditosAConsiderar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditosAConsiderar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
