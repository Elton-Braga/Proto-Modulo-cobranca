import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspelhoDivida } from './espelho-divida';

describe('EspelhoDivida', () => {
  let component: EspelhoDivida;
  let fixture: ComponentFixture<EspelhoDivida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspelhoDivida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspelhoDivida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
