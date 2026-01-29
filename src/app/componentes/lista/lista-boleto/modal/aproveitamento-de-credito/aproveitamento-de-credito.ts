import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aproveitamento-de-credito',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './aproveitamento-de-credito.html',
  styleUrl: './aproveitamento-de-credito.scss',
})
export class AproveitamentoDeCredito implements OnInit {
  dadosTabelaPrestacoes: any = [
    {
      data: '10/01/2024',
      descricao: 'Crédito referente a pagamento indevido',
      valorOriginal: 1500,
      valorCorrigido: 1620.45,
      folhaSei: 'SEI 12345/2024',
      utilizado: false,
    },
    {
      data: '05/02/2024',
      descricao: 'Restituição administrativa',
      valorOriginal: 980.5,
      valorCorrigido: 1012.3,
      folhaSei: 'Folha 78',
      utilizado: true,
    },
    {
      data: '20/03/2024',
      descricao: 'Ajuste de cobrança',
      valorOriginal: 450,
      valorCorrigido: 470.12,
      folhaSei: 'SEI 99887/2024',
      utilizado: false,
    },
  ];
  dadosTabela = [
    {
      data: '10/01/2024',
      descricao: 'Crédito referente a pagamento indevido',
      valorOriginal: 1500,
      valorCorrigido: 1620.45,
      folhaSei: 'SEI 12345/2024',
      utilizado: false,
    },
    {
      data: '05/02/2024',
      descricao: 'Restituição administrativa',
      valorOriginal: 980.5,
      valorCorrigido: 1012.3,
      folhaSei: 'Folha 78',
      utilizado: true,
    },
    {
      data: '20/03/2024',
      descricao: 'Ajuste de cobrança',
      valorOriginal: 450,
      valorCorrigido: 470.12,
      folhaSei: 'SEI 99887/2024',
      utilizado: false,
    },
  ];

  valoresDistribuicao = {
    valorUtilizado: 0,
    proporcional: 0,
    decrescentePrimeira: 0,
    decrescenteUltima: 0,
  };

  displayedColumns: string[] = [
    'select',
    'data',
    'descricao',
    'valorOriginal',
    'valorCorrigido',
    'folhaSei',
    'utilizado',
  ];

  displayedColumnsPrestacoes: string[] = [
    'select',
    //'numeroReferencia',
    //'nossoNumero',
    'prestacao',
    'descricao',
    //'vencimento',
    //'prorrogacao',
    //'moeda',
    //'valor',
    //'correcao',
    //'juros',
    //'jurosMora',
    //'multa',
    //'descontos',
    //'descExcedente',
    //'credito',
    //'aPagar',
    'totalPagar',
    'simulacao',
  ];

  opcoesDistribuicao: string[] = [
    'Proporcionalmente',
    'Decrescentemente a partir da primeira',
    'Decrescentemente a partir da última',
  ];

  displayedColumnsCabecalho: string[] = ['coluna1', 'coluna2', 'coluna3'];
  dadosCabecalho: any[] = [];
  ngOnInit(): void {
    this.dadosCabecalho = [
      {
        nome: this.data.titular?.nome,
        cpf: this.data.titular?.cpf,
        codBeneficiario: this.data.titular?.cod_beneficiario,
        sr: this.data.titular?.sr || 'xx',
        uf: this.data.titular?.uf || 'xx',
        saldoDevedor: this.data.debitoSelecionado?.saldoDevedor || 0,
        credito: this.data.debitoSelecionado?.credito || 0,
      },
    ];

    if (Array.isArray(this.data?.debitos)) {
      this.dadosTabelaPrestacoes = this.data.debitos.map((d: any) => ({
        numeroReferencia: d.numeroReferencia,
        nossoNumero: d.nossoNumero,
        prestacao: d.prestacao,
        vencimento: d.vencimentoOriginal,
        prorrogacao: d.dataParaPagamento,
        moeda: d.moeda,
        valor: d.valorOriginal,
        correcao: d.correcao,
        juros: d.juros,
        jurosMora: d.jurosMora,
        multa: d.multa,
        descontos: d.desconto,
        descExcedente: d.remissao,
        credito: d.credito,
        aPagar: d.valorDevido,
        totalPagar: d.valorTotalPrestacao,
      }));
    } else {
      this.dadosTabelaPrestacoes = [];
    }
  }

  formaDistribuicao: string | null = null;

  selection = new SelectionModel<any>(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AproveitamentoDeCredito>,
  ) {}

  get totalCreditoDisponivel(): number {
    if (!Array.isArray(this.dadosTabela)) return 0;

    return this.dadosTabela.reduce(
      (soma, item) => soma + (item.valorCorrigido || 0),
      0,
    );
  }

  fechar(): void {
    this.dialogRef.close();
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  salvarAlteracoes(): void {
    // lógica de persistência
  }

  imprimir(): void {
    window.print();
  }
  get creditosSelecionados(): any[] {
    return this.selection.selected.filter(
      (item) => item.valorCorrigido !== undefined,
    );
  }
  calcularDistribuicao(): void {
    const creditos = this.creditosSelecionados;

    const totalCredito = creditos.reduce(
      (soma: number, c: any) => soma + (c.valorCorrigido || 0),
      0,
    );

    const totalPrestacoes = this.dadosTabelaPrestacoes.reduce(
      (soma: number, p: any) => soma + (p.totalPagar || 0),
      0,
    );

    this.valoresDistribuicao.valorUtilizado = totalCredito;

    if (!this.formaDistribuicao || totalPrestacoes === 0) {
      this.valoresDistribuicao.proporcional = 0;
      this.valoresDistribuicao.decrescentePrimeira = 0;
      this.valoresDistribuicao.decrescenteUltima = 0;
      return;
    }

    switch (this.formaDistribuicao) {
      case 'Proporcionalmente':
        this.valoresDistribuicao.proporcional = totalCredito;
        break;

      case 'Decrescentemente a partir da primeira':
        this.valoresDistribuicao.decrescentePrimeira = totalCredito;
        break;

      case 'Decrescentemente a partir da última':
        this.valoresDistribuicao.decrescenteUltima = totalCredito;
        break;
    }
  }

  onFormaDistribuicaoChange(): void {
    this.calcularDistribuicao();
  }

  desfazer(): void {
    this.selection.clear();
    this.formaDistribuicao = null;
  }
}
