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

@Component({
  selector: 'app-consultar-divida',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './consultar-divida.html',
  styleUrls: ['./consultar-divida.scss'],
})
export class ConsultarDivida implements OnInit {
  pagamentos: ParcelaPagamento[] = [];
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
  imprimirGRU(): void {
    const printableTitle = `GRU - ${
      this.beneficiarioNome || 'Consulta Dívida'
    }`;

    const style = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; margin: 16px; color: #222; }
        h1 { font-size: 18px; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
        th { background: #f3f6fb; font-weight: 600; }
      </style>
    `;

    const rowsHtml = this.pagamentos
      .map(
        (p) => `
      <tr>
        <td>${p.modalidade ?? ''}</td>
        <td>${p.codigoPlano ?? ''}</td>
        <td>${p.codigoParcela ?? ''}</td>
        <td style="text-align:right">${p.numeroParcela ?? ''}</td>
        <td style="text-align:right">${this.formataNumero(p.valorOriginal)}</td>
        <td style="text-align:right">${this.formataPercentual(
          p.correcaoAnual
        )}</td>
        <td style="text-align:right">${this.formataNumero(p.valorRemissao)}</td>
        <td style="text-align:right">${this.formataNumero(
          p.descontoConcedido
        )}</td>
        <td style="text-align:right">${this.formataNumero(p.jurosMora)}</td>
        <td style="text-align:right">${this.formataNumero(p.valorDevido)}</td>
        <td>${p.dataVencimento ?? ''}</td>
      </tr>
    `
      )
      .join('');

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>${printableTitle}</title>
          ${style}
        </head>
        <body>
          <h1>${printableTitle}</h1>
          <div><strong>Beneficiário:</strong> ${this.beneficiarioNome}</div>
          <div><strong>CPF:</strong> ${this.beneficiarioCpf}</div>
          <table>
            <thead>
              <tr>
                <th>Modalidade</th>
                <th>Código do Plano</th>
                <th>Código da Parcela</th>
                <th>Nº Parcela</th>
                <th>Valor Original</th>
                <th>Correção Anual</th>
                <th>Valor Remissão</th>
                <th>Desconto Concedido</th>
                <th>Juros de Mora</th>
                <th>Valor Devido</th>
                <th>Data de Vencimento</th>
              </tr>
            </thead>
            <tbody>
              ${
                rowsHtml ||
                `<tr><td colspan="11" style="text-align:center">Nenhum registro de pagamento encontrado.</td></tr>`
              }
            </tbody>
          </table>
        </body>
      </html>
    `;

    const win = window.open('', '_blank', 'noopener');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 300);
    } else {
      window.print();
    }
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
