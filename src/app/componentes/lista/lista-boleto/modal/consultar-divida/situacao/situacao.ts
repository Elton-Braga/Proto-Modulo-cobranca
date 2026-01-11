import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

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
  ],
  templateUrl: './situacao.html',
  styleUrl: './situacao.scss',
})
export class Situacao {
  /** Array com as situações */
  situacoes: string[] = ['baixada', 'baixada em dívida aberta', 'prescrita'];

  /** Campos do formulário */
  situacaoSelecionada: string | null = null;
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
      anexo: this.anexo,
    };

    console.log('Dados para salvar:', payload);
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
