import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConcessoes } from './cadastro-concessoes';

describe('CadastroConcessoes', () => {
  let component: CadastroConcessoes;
  let fixture: ComponentFixture<CadastroConcessoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroConcessoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroConcessoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
