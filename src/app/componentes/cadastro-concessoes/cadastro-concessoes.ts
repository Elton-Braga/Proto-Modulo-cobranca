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
import * as bootstrap from 'bootstrap';

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
      cpfBeneficiario: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ],
      ],
      nascimento: [''],
      idade: [''],
      qtdFilhos: [''],

      // 🏡 Campos solicitados
      numeroLote: ['', Validators.required],
      area: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      gleba: ['', Validators.required],
      dataPublicacao: ['', Validators.required],
      numeroBoletimServico: ['', Validators.required],
      dataEntrega: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      numeroProcesso: ['', Validators.required],
      codigoSNCR: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      diferencaArea: ['', Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      valorHectare: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      valorAlienacao: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      frequenciaPagamento: ['', Validators.required],
      numeroModuloFiscal: [
        '',
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      moduloFiscal: ['', Validators.required],
      tituloCancelado: ['', Validators.required], // combobox "Sim" / "Não"
      valorPrimeiraPrestacao: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      vencimentoPrimeiraPrestacao: ['', Validators.required],
      condicaoPagamento: ['', Validators.required],
      numeroPrestacoes: [
        '',
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      municipioSedeImovel: ['', Validators.required],
      tipoTermoAditivo: ['', Validators.required], // combobox com "Requerimento de Valor" / "Alterar Condição de Pagamento"

      // 🔹 Campos auxiliares do seu modelo anterior
      regularizacaoFundiaria: [false],
      publicacao: [''],
      boletimServico: [''],
      dataEntregaAntiga: [''],
      dataEmissaoAntiga: [''],
      processoAdministrativo: [''],
      valorHectareAntigo: [''],
      valorAlienacaoAntigo: [''],
      numeroSei: [''],
      frequenciaPgto: [''],
      qtdModFiscais: [''],
      codSncr: [''],
      diferencaAreaAntiga: [''],
      valorPrimeiraPrestacaoAntiga: [''],
      vencimentoPrimeiraPrestacaoAntiga: [''],
      condicoesPagamento: [''],
      numeroPrestacoesAntigas: [''],
      tituloCanceladoAntigo: [false],
      municipio: [''],
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
      console.log('✅ Dados do formulário:', this.formDados.value);
      console.log('📊 Resumo financeiro:', this.formFinanceiro.value);
      this.mostrarToast(); // <-- Mostra o toast aqui
    } else {
      this.formDados.markAllAsTouched();
      this.formFinanceiro.markAllAsTouched();
    }
  }

  mostrarToast() {
    const toastEl = document.getElementById('toastSucesso');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
