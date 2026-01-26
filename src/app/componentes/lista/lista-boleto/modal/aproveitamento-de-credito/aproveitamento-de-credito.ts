import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-aproveitamento-de-credito',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './aproveitamento-de-credito.html',
  styleUrl: './aproveitamento-de-credito.scss',
})
export class AproveitamentoDeCredito {
  displayedColumns: string[] = [
    'select',
    'id',
    'origem',
    'data',
    'valor',
    'situacao',
  ];

  selection = new SelectionModel<any>(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AproveitamentoDeCredito>,
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
