import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParcelaPagamento } from '../../../../../mock/pagamento';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export type ParcelaPagamentoExtendido = ParcelaPagamento & {
  numeroReferencia?: string;
  nossoNumero?: string;
  parcela?: string | number;
  valorOriginal?: number;
  correcao?: number;
  desconto?: number;
  jurosMora?: number;
  multa?: number;
  remissao?: number;
  credito?: number;
  valorDevido?: number;
  saldoDevedor?: number;
  dataVencimento?: string;
  prorrogacao?: string;
  dataPagamento?: string;
};

export interface Debito {
  tipoReceita?: string;
  descricaoReceita?: string;
  valorOriginal?: number;
  numeroPrestacoes?: number;
  saldoDevedor?: number;
  objetoCredito?: string;
}

@Component({
  selector: 'app-consultar-divida',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './consultar-divida.html',
  styleUrls: ['./consultar-divida.scss'],
})
export class ConsultarDivida implements OnInit {
  pagamentos: ParcelaPagamentoExtendido[] = [];
  //debitos: any[] = [];
  debitos: Debito[] = [];
  /*
  displayedColumns: string[] = [
    'select',
    'tipoReceita',
    'descricaoReceita',
    'valorOriginal',
    'numeroPrestacoes',
    'saldoDevedor',
    'objetoCredito',
  ];*/

  beneficiarioNome = '';
  beneficiarioCpf = '';

  debitoSelecionado: any | null = null;
  modoEdicao = false;

  selection = new SelectionModel<ParcelaPagamentoExtendido>(true, []);

  displayedColumns: string[] = [
    'select',
    'numeroReferencia', // Nº Ref.
    'nossoNumero', // nosso número
    'parcela', // Prest.
    'dataVencimento', // Vencimento
    'prorrogacao', // Prorrogação
    'moeda', // Moeda (original)
    'valorOriginal', // Valor
    'correcao', // Correção
    'juros', // Juros
    'jurosMora', // Juros Mora
    'multa', // Multa
    'desconto', // Descontos
    'remissao', // Desc. Exced.
    'credito', // Crédito (ou dedução, pelo SNCCI)
    'valorDevido', // A pagar
    'moedaFinal', // Moeda (final)
    'baixado', // Baixado
    'numeroAvisoBaixa', // Nº Aviso Baixa
    'tipoBaixa', // Tipo de Baixa (nova coluna)
    'prestacaoUnica', // Prestação Única (nova coluna)
    'dataBaixa', // Data Baixa (nova coluna)
    'totalPagar',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConsultarDivida>
  ) {}

  ngOnInit(): void {
    console.log('displayedColumns atual:', this.displayedColumns);
    this.pagamentos = Array.isArray(this.data?.pagamento)
      ? this.data.pagamento
      : [];

    this.debitos = Array.isArray(this.data?.debitos) ? this.data.debitos : [];

    this.beneficiarioNome = this.data?.titular?.nome || '';
    this.beneficiarioCpf = this.data?.titular?.cpf || '';

    if (this.debitos.length) {
      this.debitoSelecionado = this.debitos[0];
    }
  }

  selecionarLinha(row: ParcelaPagamentoExtendido): void {
    this.selection.clear();
    this.selection.select(row);

    const index = this.pagamentos.indexOf(row);
    this.debitoSelecionado = this.debitos[index] ?? null;

    this.modoEdicao = false;
  }

  editar(): void {
    this.modoEdicao = true;
  }

  salvar(): void {
    this.modoEdicao = false;
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.pagamentos.length;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.pagamentos.forEach((row) => this.selection.select(row));
  }

  fechar(): void {
    this.dialogRef.close();
  }

  imprimir(): void {}

  baixarGRU(): void {}

  formataNumero(valor: number | null | undefined): string {
    if (valor === null || valor === undefined) return '';
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
