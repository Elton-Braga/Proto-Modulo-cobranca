import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCidadao } from './area-cidadao';

describe('AreaCidadao', () => {
  let component: AreaCidadao;
  let fixture: ComponentFixture<AreaCidadao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaCidadao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCidadao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
