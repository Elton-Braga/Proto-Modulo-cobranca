import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-cadastro-concessoes',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './cadastro-concessoes.html',
  styleUrl: './cadastro-concessoes.scss',
})
export class CadastroConcessoes {
  formDados!: FormGroup;
  formFinanceiro!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formDados = this.fb.group({
      imovelProjeto: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numero: ['', Validators.required],
      beneficiario: ['', Validators.required],
      situacaoBeneficiario: [''],
      cpfBeneficiario: ['', [Validators.required, Validators.minLength(11)]],
      nascimento: [''],
      idade: [''],
      qtdFilhos: [''],
      numeroLote: [''],
      area: [''],
      gleba: [''],
      regularizacaoFundiaria: [false],
      publicacao: [''],
      boletimServico: [''],
      dataEntrega: [''],
      dataEmissao: [''],
      processoAdministrativo: [''],
      valorHectare: [''],
      valorAlienacao: [''],
      numeroSei: [''],
      frequenciaPgto: [''],
      qtdModFiscais: [''],
      codSncr: [''],
      diferencaArea: [''],
      valorPrimeiraPrestacao: [''],
      vencimentoPrimeiraPrestacao: [''],
      condicoesPagamento: [''],
      numeroPrestacoes: [''],
      tituloCancelado: [false],
      municipio: [''],
      tipoTermoAditivo: this.fb.group({
        reenquadramentoValor: [false],
        alteracaoCondicoesPgto: [false],
      }),
      observacoes: [''],
    });

    this.formFinanceiro = this.fb.group({
      valorTotalAtualizado: ['0,00'],
      qtdPrestacoesAVencer: [0],
      valorAVencer: ['0,00'],
      qtdPrestacoesVencidas: [0],
      valorVencido: ['0,00'],
      qtdPrestacoesPagas: [0],
      valorPago: ['0,00'],
      qtdPrestacoesNaoPagas: [0],
      valorEmAberto: ['0,00'],
      diferencasGeradas: ['0,00'],
      diferencasEmAberto: ['0,00'],
      valorTotalDevido: ['0,00'],
    });
  }

  onSubmit(): void {
    if (this.formDados.valid && this.formFinanceiro.valid) {
      console.log('Dados do formulário:', this.formDados.value);
      console.log('Resumo financeiro:', this.formFinanceiro.value);
    } else {
      this.formDados.markAllAsTouched();
      this.formFinanceiro.markAllAsTouched();
    }
  }
}
