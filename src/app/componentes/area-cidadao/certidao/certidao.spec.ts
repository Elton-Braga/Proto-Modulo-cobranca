import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certidao } from './certidao';

describe('Certidao', () => {
  let component: Certidao;
  let fixture: ComponentFixture<Certidao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certidao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Certidao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
