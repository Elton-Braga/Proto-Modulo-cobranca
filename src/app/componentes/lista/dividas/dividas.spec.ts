import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dividas } from './dividas';

describe('Dividas', () => {
  let component: Dividas;
  let fixture: ComponentFixture<Dividas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dividas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dividas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
