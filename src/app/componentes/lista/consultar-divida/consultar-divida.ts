import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';

@Component({
  selector: 'app-consultar-divida',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './consultar-divida.html',
  styleUrl: './consultar-divida.scss',
})
export class ConsultarDivida {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConsultarDivida>
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
