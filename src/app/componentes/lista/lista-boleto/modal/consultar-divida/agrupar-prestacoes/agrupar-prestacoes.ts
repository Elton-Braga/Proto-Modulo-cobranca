import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agrupar-prestacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './agrupar-prestacoes.html',
  styleUrl: './agrupar-prestacoes.scss',
})
export class AgruparPrestacoes {
  confirmarAgrupamento = false;
  novaData: Date | null = null;

  constructor(private dialogRef: MatDialogRef<AgruparPrestacoes>) {}

  fechar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.confirmarAgrupamento = true;
  }

  salvar(): void {
    this.dialogRef.close({
      novaData: this.novaData,
    });
  }
}
