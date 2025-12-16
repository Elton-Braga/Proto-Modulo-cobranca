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

  debitos: Debito[] = [];

  beneficiarioNome = '';
  beneficiarioCpf = '';

  debitoSelecionado: any | null = null;
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
    private dialogRef: MatDialogRef<ConsultarDivida>
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

    // Preencher valores iniciais para o primeiro débito
    if (this.debitos.length) {
      this.debitoSelecionado = { ...this.debitos[0] };

      this.preencherValoresIniciais(this.debitoSelecionado, 0);
    }
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
    /*if (!debito.numeroReferencia) debito.numeroReferencia = `REF-2023-00${index + 1}`;
    if (!debito.nossoNumero) debito.nossoNumero = `2023${String(index + 1).padStart(10, '0')}`;
    if (!debito.numeroRefAntigo) debito.numeroRefAntigo = `ANT-2020-${String(index + 1).padStart(4, '0')}`;
    if (!debito.prestacao) debito.prestacao = `${index * 5 + 15}/${debito.numeroPrestacoes || 60}`;
    if (!debito.vencimentoOriginal) debito.vencimentoOriginal = `15/0${index + 1}/2023`;
    if (!debito.dataParaPagamento) debito.dataParaPagamento = `20/0${index + 1}/2023`;
    if (!debito.indice) debito.indice = ['IPCA-E', 'IGP-M', 'SELIC'][index] || 'IPCA-E';
    if (!debito.mesAno) debito.mesAno = `0${index + 1}/2023`;
    if (!debito.dataEntregaGRU) debito.dataEntregaGRU = `10/0${index + 1}/2023`;
    if (!debito.formaEntregaGRU) debito.formaEntregaGRU = ['Correios', 'Pessoalmente', 'E-mail'][index] || 'Correios';
    if (!debito.motivoNaoEntregaGRU) debito.motivoNaoEntregaGRU = ['Não se aplica', 'Cliente retirou no balcão', 'GRU enviada por e-mail'][index] || 'Não se aplica';*/
  }

  selecionarLinha(row: Debito): void {
    this.selection.clear();
    this.selection.select(row);
    this.debitoSelecionado = { ...row };
    this.modoEdicao = false;
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
