import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-creditos-a-considerar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
  ],
  templateUrl: './creditos-a-considerar.html',
  styleUrl: './creditos-a-considerar.scss',
})
export class CreditosAConsiderar {
  formPrincipal: FormGroup;

  displayedColumns: string[] = [
    'data',
    'descricao',
    'valorOriginal',
    'valorCorrigido',
    'sei',
    'jaUtilizado',
    'numRefDistrito',
  ];

  dataSource = [
    {
      data: '10/10/2025',
      descricao: 'Crédito Inicial',
      valorOriginal: 1000,
      valorCorrigido: 1120,
      sei: '0001',
      jaUtilizado: 'Não',
      numRefDistrito: '12',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.formPrincipal = this.fb.group({
      // Bloco 1
      paImovelGleba: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      beneficiario: ['', Validators.required],

      // Bloco 2
      creditos: this.fb.array([this.criarCredito()]),
    });
  }

  // Getter para array de créditos
  get creditos(): FormArray {
    return this.formPrincipal.get('creditos') as FormArray;
  }

  // Cria novo grupo de campos de crédito
  criarCredito(): FormGroup {
    return this.fb.group({
      descricaoOrigem: ['', Validators.required],
      dataBaixa: ['', Validators.required],
      valorOriginal: ['', Validators.required],
      processoSei: ['', Validators.required],
    });
  }

  adicionarCredito(): void {
    this.creditos.push(this.criarCredito());
  }

  // Apenas demonstração (exemplo de submit unificado)
  onSubmit(): void {
    console.log('Dados do formulário:', this.formPrincipal.value);
  }
}
