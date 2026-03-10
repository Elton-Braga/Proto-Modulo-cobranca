import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Certidao } from './certidao/certidao';
import { RouterLink } from '@angular/router';

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
  ],
  templateUrl: './area-cidadao.html',
  styleUrl: './area-cidadao.scss',
})
export class AreaCidadao implements OnInit, AfterViewInit {
  beneficiario!: Beneficiario;

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
}
