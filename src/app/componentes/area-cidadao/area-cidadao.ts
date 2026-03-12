import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MOCK_BENEFICIARIOS } from '../../mock/MOCK_BENEFICIATIO';
import { Beneficiario } from '../../mock/beneficiario';
import { Debitos } from '../../mock/debitos';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Certidao } from './certidao/certidao';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AgruparPrestacoes } from '../lista/lista-boleto/modal/consultar-divida/agrupar-prestacoes/agrupar-prestacoes';
import { AproveitamentoDeCredito } from '../lista/lista-boleto/modal/aproveitamento-de-credito/aproveitamento-de-credito';
import { Debito } from '../lista/lista-boleto/modal/consultar-divida/consultar-divida';

@Component({
  selector: 'app-area-cidadao',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './area-cidadao.html',
  styleUrl: './area-cidadao.scss',
})
export class AreaCidadao implements OnInit, AfterViewInit {
  beneficiario!: Beneficiario;
  debitos: Debito[] = [];
  nome!: string;
  cpf!: string;
  enderecoCobranca!: string;

  displayedColumns: string[] = [
    'select',
    'descricaoReceita',
    'numeroPrestacao',
    'pagamento',
    'vencimento',
    'valor',
    'situacao',
    'acao',
  ];

  dataSource = new MatTableDataSource<Debitos>();
  constructor(private dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<Debitos>(true, []);
  ngOnInit(): void {
    this.beneficiario = MOCK_BENEFICIARIOS[0];

    this.nome = this.beneficiario.titular.nome;
    this.cpf = this.beneficiario.titular.cpf;

    const endereco = this.beneficiario.endereco[0];

    this.enderecoCobranca = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.municipio} - ${endereco.estado}`;

    this.dataSource.data = this.beneficiario.debitos;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  abrirCertidao(): void {
    this.dialog.open(Certidao, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: false,
      data: {
        nome: this.nome,
        cpf: this.cpf,
      },
    });
  }

  baixarSegundaVia(debito: Debitos): void {
    console.log('Baixando 2ª via da prestação:', debito);

    // futura chamada de API ou geração de boleto
  }

  atualizarPrestacao(debito: Debitos): void {
    console.log('Atualizando prestação:', debito);

    // futura chamada para recalcular juros/multa
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

  abrirModalAproveitamentoCredito(): void {
    const debito = this.selection.selected[0];

    this.dialog.open(AproveitamentoDeCredito, {
      width: '90vw',
      maxWidth: '1200px',
      disableClose: false,
      autoFocus: false,
      data: {
        titular: this.beneficiario.titular,
        debitos: this.beneficiario.debitos,
        debitoSelecionado: debito,
      },
    });
  }

  get receitaSelecionada(): string {
    const selecionados = this.selection.selected;

    if (selecionados.length === 0) return '';

    // se todos tiverem a mesma receita mostra o nome
    const receitas = [...new Set(selecionados.map((d) => d.descricaoReceita))];

    return receitas.length === 1 ? receitas[0] : 'Receitas diversas';
  }

  get valorTotalSelecionado(): number {
    return this.selection.selected.reduce(
      (total, debito) => total + (debito.valorTotalPrestacao || 0),
      0,
    );
  }

  get saldoDevedorSelecionado(): number {
    return this.selection.selected.reduce(
      (total, debito) => total + (debito.saldoDevedor || 0),
      0,
    );
  }
}
