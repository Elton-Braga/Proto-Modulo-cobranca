import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-situacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
  ],
  templateUrl: './situacao.html',
  styleUrl: './situacao.scss',
})
export class Situacao {
  situacoes: string[] = ['baixada', 'baixada em dívida aberta', 'prescrita'];

  situacaoSelecionada: string | null = null;
  dataBaixa: Date | null = null;

  valor: string = 'R$ 12.345,67';
  tipoComprovante: string = 'Comprovante Bancário';
  numeroSEI: string = 'SEI-2024.000123/0001-11';
  numeroGRU: string = 'GRU-987654321';

  anexo: File | null = null;

  constructor(private dialogRef: MatDialogRef<Situacao>) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.anexo = input.files[0];
    }
  }

  salvar(): void {
    const payload = {
      situacao: this.situacaoSelecionada,
      dataBaixa: this.dataBaixa,
      valor: this.valor,
      tipoComprovante: this.tipoComprovante,
      numeroSEI: this.numeroSEI,
      numeroGRU: this.numeroGRU,
      anexo: this.anexo,
    };

    console.log('Dados para salvar:', payload);
    this.dialogRef.close(payload);
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
