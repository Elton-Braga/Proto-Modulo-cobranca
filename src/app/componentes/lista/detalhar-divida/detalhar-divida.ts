import { Component, Inject } from '@angular/core';
//import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
//import { ConsultarDivida } from '../consultar-divida/consultar-divida';
import { SafeUrlPipe } from '../../pipe/detalhar-pipe';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConsultarDivida } from '../consultar-divida/consultar-divida';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import { SafeUrlPipe } from '../../pipes/safe-url.pipe'; // ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-detalhar-divida',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    SafeUrlPipe,
    MatDialogModule,
    NgFor,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detalhar-divida.html',
  styleUrls: ['./detalhar-divida.scss'],
})
export class DetalharDivida {
  editando = false;
  latitude = -22.88587129197667;
  longitude = -42.23844749254404;

  colunasTitular = [];
  colunasConjuge = [];
  colunasProjeto = [];
  colunasEndereco = ['estado', 'municipio', 'bairro', 'rua', 'numero'];
  colunasImpedimento = ['haImpedimento', 'motivoImpedimento'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
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

  get mapaUrl(): string {
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyD3F-vl_X-PARA_EXEMPLO_APENAS&center=${this.latitude},${this.longitude}&zoom=13&maptype=roadmap`;
  }

  getColumnDisplayName(column: string): string {
    const displayNames: { [key: string]: string } = {};
    return displayNames[column] || column;
  }

  abrirConsultarDivida(element: any): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Modal fechada com resultado:', result);
    });
  }

  getInputType(column: string): string {
    if (column === 'data_nascimento') return 'date';
    if (column === 'email') return 'email';
    if (column === 'telefone') return 'tel';
    return 'text';
  }

  habilitarEdicao() {
    this.editando = true;
  }

  salvar() {
    this.editando = false;
    console.log('Dados atualizados:', this.data);
  }

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
