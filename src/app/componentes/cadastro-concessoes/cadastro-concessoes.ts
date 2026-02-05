import { CommonModule } from '@angular/common';

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
import { GRUProcessada } from './gruprocessada/gruprocessada';

@Component({
  selector: 'app-cadastro-concessoes',
  standalone: true,
  imports: [
    CommonModule, // ✅ OBRIGATÓRIO para *ngFor, *ngIf, etc.
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './cadastro-concessoes.html',
  styleUrls: ['./cadastro-concessoes.scss'],
})
export class CadastroConcessoes {
  formDados!: FormGroup;

  naturezas = ['Pessoa física', 'Pessoa jurídica'];

  descricoesNatureza = [
    'Aluguéis e arrendamentos / Serviços administrativos',
    'Outras restituições',
    'Serviços administrativos',
    'Multas e juros previstas em contratos',
    'Alienação de bens imóveis – principal (Multas/juros) assentados',
    'Amortização de Empréstimos Contratuais (Multas e juros)',
  ];

  mapaGru: Record<string, string> = {
    'Aluguéis e arrendamentos / Serviços administrativos': '28804-7',
    'Outras restituições': '28852-7',
    'Serviços administrativos': '28830-6',
    'Multas e juros previstas em contratos': '28867-5',
    'Alienação de bens imóveis – principal (Multas/juros) assentados':
      '28874-8',
    'Amortização de Empréstimos Contratuais (Multas e juros)': '48807-0',
  };

  constructor(private fb: FormBuilder) {
    this.formDados = this.fb.group({
      naturezaJuridica: ['', Validators.required],
      nomeRazaoSocial: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      identificacaoDevedor: ['', Validators.required],

      // Endereço de cobrança
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],

      descricaoNatureza: ['', Validators.required],
      codigoGru: [{ value: '', disabled: true }],

      numeroRequerimento: [''],
      dataRequerimento: [''],
      dataOrigem: [''],
      dataVencimento: [''],
      valor: [''],
      juros: [''],
      mora: [''],
      multa: [''],

      formaPagamento: ['', Validators.required],
      frequenciaPagamento: ['', Validators.required],
      numeroPrestacoes: [''],

      descricaoComplementar: [''],
    });
  }

  atualizarCodigoGru(): void {
    const descricao = this.formDados.get('descricaoNatureza')?.value;
    this.formDados.patchValue({
      codigoGru: this.mapaGru[descricao] || '',
    });
  }

  onSubmit(): void {
    if (this.formDados.valid) {
      console.log(this.formDados.getRawValue());
    } else {
      this.formDados.markAllAsTouched();
    }
  }
}
