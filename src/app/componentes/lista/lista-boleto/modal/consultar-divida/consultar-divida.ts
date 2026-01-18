import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParcelaPagamento } from '../../../../../mock/pagamento';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DebtRow } from '../../lista-boleto';
import { Situacao } from './situacao/situacao';
import { AgruparPrestacoes } from './agrupar-prestacoes/agrupar-prestacoes';
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
  numeroReferencia?: string;
  nossoNumero?: string;
  numeroRefAntigo?: string;
  prestacao?: string;
  vencimentoOriginal?: string;
  dataParaPagamento?: string;
  valorPrincipal?: number;
  correcao?: number;
  indice?: string;
  mesAno?: string;
  coeficiente?: number;
  valorCorrigido?: number;
  multa?: number;
  jurosMora?: number;
  valorComEncargos?: number;
  valorTotalPrestacao?: number;
  dataEntregaGRU?: string;
  formaEntregaGRU?: string;
  motivoNaoEntregaGRU?: string;
  moeda?: string;
  juros?: number;
  desconto?: number;
  remissao?: number;
  credito?: number;
  valorDevido?: number;
  moedaFinal?: string;
  baixado?: string;
  numeroAvisoBaixa?: string;
  tipoBaixa?: string;
  prestacaoUnica?: string;
  dataBaixa?: string;
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
    MatDialogModule,
  ],
  templateUrl: './consultar-divida.html',
  styleUrls: ['./consultar-divida.scss'],
})
export class ConsultarDivida implements OnInit {
  pagamentos: ParcelaPagamentoExtendido[] = [];

  debitos: Debito[] = [];

  beneficiarioNome = '';
  beneficiarioCpf = '';

  debitoSelecionado: Debito | null = null; // Alterado para Debito | null
  modoEdicao = false;

  selection = new SelectionModel<Debito>(true, []);

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
    private dialogRef: MatDialogRef<ConsultarDivida>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pagamentos = Array.isArray(this.data?.pagamento)
      ? this.data.pagamento
      : [];

    // Transformar os dados dos débitos para incluir todos os campos necessários
    this.debitos = Array.isArray(this.data?.debitos)
      ? this.data.debitos.map((debito: any, index: number) => ({
          ...debito,
          // Mapear campos duplicados
          parcela: debito.prestacao || `0/${debito.numeroPrestacoes || 0}`,
          dataVencimento: debito.vencimentoOriginal || '',
          prorrogacao: debito.dataParaPagamento || '',
          // Inicializar campos que não existem nos dados originais
          moeda: debito.moeda || 'BRL',
          juros: debito.juros || 0,
          desconto: debito.desconto || 0,
          remissao: debito.remissao || 0,
          credito: debito.credito || 0,
          valorDevido: debito.valorTotalPrestacao || 0,
          moedaFinal: debito.moedaFinal || 'BRL',
          baixado: debito.baixado || 'Não',
          numeroAvisoBaixa:
            debito.numeroAvisoBaixa || `ABX-2023-00${index + 1}`,
          tipoBaixa:
            debito.tipoBaixa ||
            ['Normal', 'Emergencial', 'Ampliação'][index] ||
            'Normal',
          prestacaoUnica: debito.prestacaoUnica || 'Não',
          dataBaixa: debito.dataBaixa || '—',
          totalPagar: debito.valorTotalPrestacao || 0,
        }))
      : [];

    this.beneficiarioNome = this.data?.titular?.nome || '';
    this.beneficiarioCpf = this.data?.titular?.cpf || '';
  }

  private preencherValoresIniciais(debito: Debito, index: number): void {
    // Preencher campos que podem estar vazios com valores apropriados
    if (!debito.tipoReceita)
      debito.tipoReceita =
        [
          'PRONAF – Investimento',
          'Crédito Especial – Emergencial',
          'Fomento – Ampliação Produtiva',
        ][index] || 'xxxxx';
    if (!debito.descricaoReceita)
      debito.descricaoReceita =
        [
          'Investimento agrícola para fortalecimento da produção familiar',
          'Crédito emergencial para recomposição produtiva',
          'Financiamento para modernização e ampliação da infraestrutura produtiva',
        ][index] || 'xxxxx';
    if (!debito.objetoCredito)
      debito.objetoCredito =
        'Crédito destinado à recuperação produtiva da unidade familiar';
  }

  selecionarLinha(row: Debito): void {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row);
    } else {
      this.selection.select(row);
    }

    const selecionados = this.selection.selected;

    if (selecionados.length === 1) {
      // Apenas uma linha selecionada → exibe valores
      const unicoDebito = selecionados[0];
      this.debitoSelecionado = { ...unicoDebito };

      const index = this.debitos.findIndex((d) => d === unicoDebito);
      if (index !== -1 && this.debitoSelecionado) {
        this.preencherValoresIniciais(this.debitoSelecionado, index);
      }
    } else {
      // Nenhuma ou múltiplas seleções → inputs vazios
      this.debitoSelecionado = null;
    }

    this.modoEdicao = false;
    this.cdr.detectChanges();
  }

  baixarSituacaoSelecionados(): void {
    const selecionados = this.selection.selected;

    if (selecionados.length === 0) return;

    this.dialog.open(Situacao, {
      panelClass: 'situacao-dialog',
      data: selecionados,
      disableClose: false,
    });
  }

  agruparPrestacoesSelecionadas(): void {
    const selecionados = this.selection.selected;

    if (selecionados.length === 0) return;

    this.dialog.open(AgruparPrestacoes, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: {
        debitos: selecionados,
        origem: 'consultarDivida', // Adiciona a origem
      },
      disableClose: false,
    });
  }

  get possuiSelecao(): boolean {
    return this.selection.selected.length > 0;
  }

  editar(): void {
    this.modoEdicao = true;
  }

  salvar(): void {
    this.modoEdicao = false;
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.debitos.length;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.debitos.forEach((row) => this.selection.select(row));
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

  baixarSituacao(row: Debito): void {
    if (!row) return;

    const dialogRef = this.dialog.open(Situacao, {
      panelClass: 'situacao-dialog',
      data: row,
      disableClose: false,
      position: {
        //top: '50%',
        left: '50%',
      },
    });

    dialogRef.afterOpened().subscribe(() => {
      const pane = document.querySelector('.situacao-dialog') as HTMLElement;

      if (pane) {
        pane.style.transform = 'translate(-50%, -50%)';
      }
    });
  }

  agruparPrestacoes(row: Debito): void {
    if (!row) return;

    const dialogRef = this.dialog.open(AgruparPrestacoes, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: {
        debitos: [row],
        origem: 'consultarDivida', // Adiciona a origem
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Modal fechada com resultado:', result);
      }
    });
  }
}
