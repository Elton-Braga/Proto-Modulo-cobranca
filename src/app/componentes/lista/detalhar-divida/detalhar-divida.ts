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

  // ================== COLUNAS ==================
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

  colunasEndereco = ['estado', 'municipio', 'bairro', 'rua', 'numero'];
  colunasImpedimento = ['haImpedimento', 'motivoImpedimento'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    // Inicializações seguras
    this.data = this.data || {};
    this.data.titular = this.data.titular || {};
    this.data.conjuge = this.data.conjuge || {};
    this.data.projeto_assentamento = this.data.projeto_assentamento || [{}];
    this.data.endereco = this.data.endereco || [{}];
    this.data.impedimento = this.data.impedimento || {
      haImpedimento: '',
      motivoImpedimento: '',
    };
  }

  // ================== NOMES DE EXIBIÇÃO ==================
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
      motivoImpedimento: 'Motivo do Impedimento',
    };

    return displayNames[column] || column;
  }

  // ================== CONSULTAR DÍVIDA ==================
  abrirConsultarDivida(element: any): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '100vw', // Largura total da viewport
      height: '100vh', // Altura total da viewport
      maxWidth: '100vw', // Remove limitação de largura máxima
      maxHeight: '100vh', // Remove limitação de altura máxima
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal fechada com resultado:', result);
      }
    });
  }

  // ================== TIPO DE INPUT ==================
  getInputType(column: string): string {
    if (column === 'data_nascimento') return 'date';
    if (column === 'email') return 'email';
    if (column === 'telefone') return 'tel';
    return 'text';
  }

  // ================== CONTROLE DE EDIÇÃO ==================
  habilitarEdicao() {
    this.editando = true;
  }

  salvar() {
    this.editando = false;
    console.log('Dados atualizados:', this.data);
  }

  // ================== REGRAS DE CAMPOS EDITÁVEIS ==================
  isCampoEditavel(secao: string, campo: string): boolean {
    if (!this.editando) return false;

    switch (secao) {
      case 'titular':
      case 'conjuge':
        return campo === 'telefone' || campo === 'email';
      case 'endereco':
      case 'impedimento':
        return true;
      default:
        return false;
    }
  }
}
