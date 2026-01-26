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
  /** Array com as situações */
  situacoes: string[] = ['baixada', 'baixada em dívida aberta', 'prescrita'];
  valor: string = 'R$ 0.000,00';
  /** Campos do formulário */
  situacaoSelecionada: string | null = null;
  dataBaixa: Date | null = null;
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
      anexo: this.anexo,
    };

    console.log('Dados para salvar:', payload);
    this.dialogRef.close();
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
