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
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';

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
  imprimir(): void {
    const conteudo = document.getElementById('conteudo-gru');
    if (!conteudo) {
      console.warn('Elemento #conteudo-gru não encontrado');
      return;
    }

    const janela = window.open('', '_blank', 'width=900,height=700');
    if (!janela) {
      console.warn('Não foi possível abrir nova janela (popup bloqueado?)');
      return;
    }

    const doc = janela.document;
    doc.open();

    // Tenta extrair regras CSS das folhas acessíveis (pode falhar por CORS em algumas).
    const estilosExtraidos = Array.from(document.styleSheets)
      .map((ss) => {
        try {
          const cssRules = (ss as CSSStyleSheet).cssRules;
          return Array.from(cssRules)
            .map((r) => r.cssText)
            .join('\n');
        } catch (e) {
          // folhas externas bloqueadas por CORS serão ignoradas aqui
          return '';
        }
      })
      .join('\n');

    // Monta o HTML básico com estilos inline (para garantir aparência)
    doc.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Imprimir GRU</title>
    <style>
      /* estilos extraídos */
      ${estilosExtraidos}
      /* ajustes específicos de impressão */
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    </style>
  </head>
  <body></body>
</html>`);

    doc.close();

    // Clona o elemento com conteúdo já renderizado
    const clone = conteudo.cloneNode(true) as HTMLElement;
    // Opcional: remover elementos que você não quer imprimir, ex.: botões dentro do conteudo
    // clone.querySelectorAll('.nao-imprimir').forEach(el => el.remove());

    doc.body.appendChild(clone);

    // Copiar tags <link rel="stylesheet"> que podem ser necessárias (se forem do mesmo domínio)
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach(
      (link) => {
        const href = (link as HTMLLinkElement).href;
        if (href) {
          const newLink = doc.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = href;
          doc.head.appendChild(newLink);
        }
      }
    );

    // Espera imagens carregarem antes de chamar print()
    const imgs = doc.images;
    if (imgs.length === 0) {
      janela.focus();
      janela.print();
      return;
    }

    let carregadas = 0;
    const total = imgs.length;
    const onComplete = () => {
      carregadas++;
      if (carregadas >= total) {
        janela.focus();
        // Pequeno timeout garante que as fontes também estejam aplicadas
        setTimeout(() => janela.print(), 50);
      }
    };

    for (let i = 0; i < imgs.length; i++) {
      // Se a imagem já estiver carregada, o onload pode não disparar, então verificamos readyState/complete
      const img = imgs[i];
      if ((img as HTMLImageElement).complete) {
        onComplete();
      } else {
        img.addEventListener('load', onComplete);
        img.addEventListener('error', onComplete); // prossegue mesmo se der erro
      }
    }
  }

  baixarGRU(): void {
    /* 
  const conteudo = document.getElementById('conteudo-gru');
  if (!conteudo) return;

  html2canvas(conteudo).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

    pdf.save('GRU.pdf');
  });*/
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
