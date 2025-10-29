import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConsultarDivida } from '../consultar-divida/consultar-divida'; // ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-detalhar-divida',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './detalhar-divida.html',
  styleUrl: './detalhar-divida.scss',
})
export class DetalharDivida {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  abrirConsultarDivida(): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '70rem',
      maxHeight: '80vh',
      data: this.data, // envia o mesmo objeto recebido (beneficiário)
      panelClass: 'consultar-divida-modal',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal ConsultarDivida fechada com resultado:', result);
      }
    });
  }
}
