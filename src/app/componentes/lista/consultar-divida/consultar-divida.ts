import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParcelaPagamento } from '../../../mock/pagamento';

export type ParcelaPagamentoExtendido = ParcelaPagamento & {
  tipoReceita?: string;
  descricaoReceita?: string;
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
  dataPagamentoAposVencimento?: string;
  dataPagamento?: string;
  dataRequerimento?: string;
  prorrogacao?: string;
  situacao?: string;
};

@Component({
  selector: 'app-consultar-divida',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './consultar-divida.html',
  styleUrls: ['./consultar-divida.scss'],
})
export class ConsultarDivida implements OnInit {
  pagamentos: ParcelaPagamentoExtendido[] = [];
  beneficiarioNome: string = '';
  beneficiarioCpf: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConsultarDivida>
  ) {}

  ngOnInit(): void {
    this.data = this.data || {};
    this.pagamentos = Array.isArray(this.data.pagamento)
      ? this.data.pagamento
      : [];
    this.beneficiarioNome = this.data?.titular?.nome || '';
    this.beneficiarioCpf = this.data?.titular?.cpf || '';
  }

  /** ===================== AÇÕES ===================== **/
  imprimirGRU(element?: ParcelaPagamentoExtendido): void {
    if (element) {
      sessionStorage.setItem(
        'beneficiarioSelecionado',
        JSON.stringify(element)
      );
    }

    const novaAba = window.open('about:blank', '_blank');
    if (!novaAba) {
      alert('Permita pop-ups para imprimir a GRU.');
      return;
    }

    // Ajusta o caminho para projetos hospedados no GitHub Pages
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    novaAba.location.href = `${baseUrl}#/emitir-gru`;
  }

  fechar(): void {
    this.dialogRef.close();
  }

  /** ===================== FORMATADORES ===================== **/
  formataNumero(valor: number | undefined | null): string {
    if (valor === null || valor === undefined) return '';
    return Number(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formataPercentual(valor: number | undefined | null): string {
    if (valor === null || valor === undefined) return '';
    const pct = valor < 1 ? valor * 100 : valor;
    return `${pct.toFixed(2)}%`;
  }
}
