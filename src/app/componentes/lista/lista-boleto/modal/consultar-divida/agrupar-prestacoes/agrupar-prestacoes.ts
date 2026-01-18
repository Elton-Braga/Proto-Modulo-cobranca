import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  valorAgrupado = 0;
  origemComponente: string = 'consultarDivida'; // Valor padrão

  constructor(
    private dialogRef: MatDialogRef<AgruparPrestacoes>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Extrair a origem do componente e os débitos
    if (this.data) {
      // Se data for um array (para compatibilidade)
      if (Array.isArray(this.data)) {
        this.data = { debitos: this.data };
      }

      this.origemComponente = this.data.origem || 'consultarDivida';

      if (this.data.debitos) {
        this.calcularTotal(this.data.debitos);
        this.calcularTotalPrestacoesEmAtraso(this.data.debitos);
      }
    }
  }

  private calcularTotal(debitos: any[]): void {
    this.valorAgrupado = debitos.reduce(
      (total, debito) => total + (debito.valorTotalPrestacao ?? 0),
      0
    );
  }

  fechar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.confirmarAgrupamento = true;
  }

  salvar(): void {
    this.dialogRef.close({
      novaData: this.novaData,
      valorAgrupado: this.valorAgrupado,
    });
  }

  formataNumero(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  calcularTotalPrestacoesEmAtraso(debitos: any[]): void {
    this.valorAgrupado = debitos
      .filter((d) => d.situacao?.toLowerCase() === 'em atraso')
      .reduce((total, d) => total + (d.valorTotalPrestacao ?? 0), 0);
  }
}
