import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prestacoes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
  ],
  templateUrl: './prestacoes.html',
  styleUrls: ['./prestacoes.scss'],
})
export class Prestacoes implements OnInit {
  formPrestacoes!: FormGroup;
  displayedColumns: string[] = [
    'prestacao',
    'vencimentoOriginal',
    'dataPagamento',
    'numRefAntigo',
    'tipoComprovante',
    'numProcessoSei',
    'numRegistroGru',
    'dataBaixa',
    'valorBaixado',
  ];
  dadosTabela: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formPrestacoes = this.fb.group({
      // 🔹 BLOCO 1
      paImovelGleba: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      beneficiario: ['', Validators.required],
      numeroReferenciaGru: ['', Validators.required],

      // 🔹 BLOCO 2
      prestacao: ['', Validators.required],
      vencimentoOriginal: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      numRefAntigo: [''],
      tipoComprovante: [''],
      numProcessoSei: [''],
      numRegistroGru: [''],
      dataBaixa: [''],
      valorBaixado: [''],

      // 🔹 BLOCO 3 - Valores e Encargos
      valorPrincipal: [''],
      correcaoMonetariaIndice: [''],
      correcaoMonetariaMesAno: [''],
      correcaoMonetariaCoeficiente: [''],
      jurosPercentual: [''],
      jurosDesconto: [''],
      valorCorrigido: [''],
      descontoValorCorrigido: [''],
      multa: [''],
      descontoMulta: [''],
      jurosMora: [''],
      descontoJurosMora: [''],
      valorComEncargos: [''],
      descontoExcedente: [''],
      valorTotalPrestacao: [''],

      // 🔹 BLOCO 4
      dataRequerimentoGru: [''],
      numSei: [''],
      dataEntregaGru: [''],
      formaEntregaGru: [''],
      motivoNaoEntrega: [''],
      observacoes: [''],
    });
  }

  onSubmit(): void {
    if (this.formPrestacoes.valid) {
      console.log('✅ Dados do formulário:', this.formPrestacoes.value);
    } else {
      this.formPrestacoes.markAllAsTouched();
      console.warn('⚠️ Preencha todos os campos obrigatórios.');
    }
  }
}
