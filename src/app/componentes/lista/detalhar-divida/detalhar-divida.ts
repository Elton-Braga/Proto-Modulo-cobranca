import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ConsultarDivida } from '../consultar-divida/consultar-divida';

@Component({
  selector: 'app-detalhar-divida',
  standalone: true,
  templateUrl: './detalhar-divida.html',
  styleUrls: ['./detalhar-divida.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class DetalharDivida {
  editando = false;

  colunasTitular = [
    'nome',
    'cpf',
    'cod_beneficiario',
    'data_nascimento',
    'estado_civil',
    'sexo',
    'nome_pai',
    'nome_mae',
    'nacionalidade',
    'naturalidade',
    'numero_nis',
    'telefone',
    'email',
    'codigo_nib',
  ];

  colunasConjuge = [
    'nome',
    'cpf',
    'cod_beneficiario',
    'data_nascimento',
    'estado_civil',
    'sexo',
    'nome_pai',
    'nome_mae',
    'nacionalidade',
    'naturalidade',
    'numero_nis',
    'telefone',
    'email',
  ];

  colunasProjeto = [
    'codigoProjeto',
    'nomeProjeto',
    'agrovilaContato',
    'codigoContato',
    'loteIndividualContato',
    'numeroLote',
    'nomeLote',
    'codigoMunicipioComunincra',
  ];

  colunasEndereco = [
    'estado',
    'municipio',
    'bairro',
    'rua',
    'numero',
    'haImpedimento',
    'motivoImpedimento',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  // Método para obter nomes amigáveis para as colunas
  getColumnDisplayName(column: string): string {
    const displayNames: { [key: string]: string } = {
      nome: 'Nome',
      cpf: 'CPF',
      cod_beneficiario: 'Cód. Beneficiário',
      data_nascimento: 'Data Nascimento',
      estado_civil: 'Estado Civil',
      sexo: 'Sexo',
      nome_pai: 'Nome do Pai',
      nome_mae: 'Nome da Mãe',
      nacionalidade: 'Nacionalidade',
      naturalidade: 'Naturalidade',
      numero_nis: 'Nº NIS',
      telefone: 'Telefone',
      email: 'Email',
      codigo_nib: 'Cód. NIB',
      codigoProjeto: 'Código Projeto',
      nomeProjeto: 'Nome Projeto',
      agrovilaContato: 'Agrovila',
      codigoContato: 'Código Contato',
      loteIndividualContato: 'Lote Individual',
      numeroLote: 'Nº Lote',
      nomeLote: 'Nome Lote',
      codigoMunicipioComunincra: 'Cód. Município',
      estado: 'Estado',
      municipio: 'Município',
      bairro: 'Bairro',
      rua: 'Rua',
      numero: 'Número',
      haImpedimento: 'Impedimento',
      motivoImpedimento: 'Motivo Impedimento',
    };

    return displayNames[column] || column;
  }

  abrirConsultarDivida(element: any): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '900px',
      maxHeight: '50rem',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal fechada com resultado:', result);
      }
    });
  }

  // Método para determinar o tipo de input
  getInputType(column: string): string {
    if (column === 'data_nascimento') {
      return 'date';
    }
    if (column === 'email') {
      return 'email';
    }
    if (column === 'telefone') {
      return 'tel';
    }
    return 'text';
  }

  habilitarEdicao() {
    this.editando = true;
  }

  salvar() {
    this.editando = false;
    console.log('Dados atualizados:', this.data);
  }
}
