import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirGRU } from './emitir-gru';

describe('EmitirGRU', () => {
  let component: EmitirGRU;
  let fixture: ComponentFixture<EmitirGRU>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitirGRU]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmitirGRU);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
