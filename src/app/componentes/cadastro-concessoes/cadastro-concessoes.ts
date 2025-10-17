import { Component, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
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
import { Location } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Prestacoes } from './prestacoes/prestacoes';
import { CreditosAConsiderar } from './creditos-a-considerar/creditos-a-considerar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-concessoes',
  standalone: true,
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
    MatStepperModule,
    Prestacoes,
    CreditosAConsiderar,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './cadastro-concessoes.html',
  styleUrls: ['./cadastro-concessoes.scss'],
})
export class CadastroConcessoes implements AfterViewInit {
  formDados!: FormGroup;
  formFinanceiro!: FormGroup;
  isEditable = true;
  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    // ✅ 1. Primeiro, criar os formulários
    this.criarFormularios();

    // ✅ 2. Depois, verificar se há dados vindos da navegação
    const state = this.location.getState() as any;
    if (state?.beneficiario) {
      console.log('🔹 Beneficiário recebido:', state.beneficiario);

      this.formDados.patchValue({
        beneficiario: state.beneficiario.titular?.nome || '',
        cpfBeneficiario: state.beneficiario.titular?.cpf || '',
      });
    }
  }

  private criarFormularios(): void {
    this.formDados = this.fb.group({
      imovelProjeto: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numero: ['', Validators.required],
      beneficiario: [{ value: '', disabled: true }, Validators.required],
      situacaoBeneficiario: [''],
      cpfBeneficiario: [
        { value: '', disabled: true },
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
      tituloCancelado: ['', Validators.required],
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
      tipoTermoAditivo: ['', Validators.required],
      regularizacaoFundiaria: [false],
      observacoes: [''],
      rf: [''],
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

      // ✅ Chamada corrigida
      this.mostrarToast('✅ Dados salvos com sucesso!', 'success');
    } else {
      this.formDados.markAllAsTouched();
      this.formFinanceiro.markAllAsTouched();

      // Identifica campos inválidos (opcional, pode incluir)
      const camposInvalidos: string[] = [];
      Object.keys(this.formDados.controls).forEach((key) => {
        const control = this.formDados.get(key);
        if (control?.invalid) camposInvalidos.push(key);
      });

      const msgErro =
        camposInvalidos.length > 0
          ? `❌ Os seguintes campos obrigatórios devem ser preenchidos: ${camposInvalidos
              .join(', ')
              .replace(/([A-Z])/g, ' $1')
              .toLowerCase()}.`
          : '❌ Preencha todos os campos obrigatórios.';

      // ✅ Toast de erro
      this.mostrarToast(msgErro, 'error');
    }
  }

  ngAfterViewInit(): void {
    // Garantia de inicialização após renderização do DOM
  }

  mostrarToast(mensagem: string, tipo: 'success' | 'error' = 'success'): void {
    const toastEl = document.getElementById('toastGlobal');
    const toastMsg = document.getElementById('toastMensagem');

    if (toastEl && toastMsg) {
      // Remove classes antigas
      toastEl.classList.remove('text-bg-success', 'text-bg-danger');

      // Aplica o estilo conforme o tipo
      toastEl.classList.add(
        tipo === 'success' ? 'text-bg-success' : 'text-bg-danger'
      );

      // Define a mensagem
      toastMsg.textContent = mensagem;

      // Exibe o toast
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

  /** Avança para o próximo step */
  avancarStep(stepper: MatStepper): void {
    if (stepper.selectedIndex < stepper.steps.length - 1) {
      stepper.next();
    }
  }

  /** Volta para o step anterior */
  voltarStep(stepper: MatStepper): void {
    if (stepper.selectedIndex > 0) {
      stepper.previous();
    }
  }
}
