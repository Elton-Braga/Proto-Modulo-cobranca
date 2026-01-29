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
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AproveitamentoDeCredito } from '../aproveitamento-de-credito/aproveitamento-de-credito';
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
    MatMenuModule,
    MatDividerModule,
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
    private dialog: MatDialog,
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
          moeda: debito.moeda || 'R$',
          juros: debito.juros || 0,
          desconto: debito.desconto || 0,
          remissao: debito.remissao || 0,
          credito: debito.credito || 0,
          valorDevido: debito.valorTotalPrestacao || 0,
          moedaFinal: debito.moedaFinal || 'R$',
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

    // Sai do modo de edição sempre que a seleção muda
    this.modoEdicao = false;
    this.cdr.detectChanges();
  }

  baixarSituacaoSelecionados(): void {
    const selecionados = this.selection.selected;

    if (selecionados.length === 0) return;

    this.dialog.open(Situacao, {
      width: '60vw',
      height: '60vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
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
        origem: 'consultarDivida',
        quantidadePrestacoes: selecionados.length,
      },
      disableClose: false,
    });
  }

  get possuiSelecao(): boolean {
    return this.selection.selected.length > 0;
  }

  editar(): void {
    if (this.exatamenteUmaSelecao) {
      this.modoEdicao = true;
    }
  }

  salvar(): void {
    if (this.modoEdicao && this.debitoSelecionado) {
      // Aqui você pode adicionar a lógica para salvar as alterações
      // Por exemplo, atualizar o débito na lista de débitos
      const index = this.debitos.findIndex(
        (d) => d.numeroReferencia === this.debitoSelecionado?.numeroReferencia,
      );

      if (index !== -1) {
        // Atualiza o débito na lista
        this.debitos[index] = { ...this.debitoSelecionado };
      }

      // Sai do modo de edição
      this.modoEdicao = false;

      // Exibe mensagem de sucesso (opcional)
      console.log('Alterações salvas com sucesso!');

      this.cdr.detectChanges();
    }
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

  imprimir(): void {
    if (this.possuiSelecao) {
      // Implemente a lógica de impressão aqui
      // Por exemplo, abrir uma nova janela com os dados para impressão
      const dadosParaImpressao = {
        beneficiario: {
          nome: this.beneficiarioNome,
          cpf: this.beneficiarioCpf,
        },
        debitosSelecionados: this.selection.selected,
        dataImpressao: new Date().toLocaleDateString(),
      };

      console.log('Imprimindo:', dadosParaImpressao);

      // Alternativa: usar window.print() para imprimir a página atual
      // window.print();

      // Ou abrir uma nova rota/componente para impressão
    }
  }

  abrirModalAproveitamentoCredito(): void {
    //if (!this.exatamenteUmaSelecao) return;

    const debito = this.selection.selected[0];

    this.dialog.open(AproveitamentoDeCredito, {
      width: '90vw',
      maxWidth: '1200px',
      disableClose: false,
      autoFocus: false,
      data: {
        titular: this.data?.titular,
        debitos: this.debitos,
        debitoSelecionado: debito,
      },
    });
  }

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

  get exatamenteUmaSelecao(): boolean {
    return this.selection.selected.length === 1;
  }

  cancelarEdicao(): void {
    if (this.modoEdicao) {
      this.modoEdicao = false;

      // Restaura os valores originais se necessário
      const selecionados = this.selection.selected;
      if (selecionados.length === 1) {
        const original = selecionados[0];
        this.debitoSelecionado = { ...original };
      }

      this.cdr.detectChanges();
    }
  }

  emitirGRU(): void {
    if (this.exatamenteUmaSelecao) {
      const debito = this.selection.selected[0];
      console.log('Emitir GRU para o débito:', debito);
      // Aqui você implementaria a lógica para emitir GRU
      // Por exemplo: abrir um modal de emissão de GRU

      // Exemplo de implementação:
      // this.dialog.open(EmitirGRUComponent, {
      //   data: { debito: debito },
      //   width: '600px'
      // });
    }
  }

  excluirDebito(): void {
    if (this.exatamenteUmaSelecao) {
      const confirmar = window.confirm(
        'Tem certeza que deseja excluir este débito? Esta ação não pode ser desfeita.',
      );

      if (confirmar) {
        const debito = this.selection.selected[0];

        // Remove o débito da lista
        this.debitos = this.debitos.filter((d) => d !== debito);

        // Limpa a seleção
        this.selection.clear();

        // Limpa o débito selecionado
        this.debitoSelecionado = null;

        console.log('Débito excluído:', debito);

        // Atualiza a view
        this.cdr.detectChanges();
      }
    }
  }
}
