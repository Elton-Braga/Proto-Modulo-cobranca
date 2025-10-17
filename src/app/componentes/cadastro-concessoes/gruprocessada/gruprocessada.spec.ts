import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRUProcessada } from './gruprocessada';

describe('GRUProcessada', () => {
  let component: GRUProcessada;
  let fixture: ComponentFixture<GRUProcessada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GRUProcessada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GRUProcessada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
