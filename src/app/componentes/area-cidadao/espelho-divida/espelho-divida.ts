import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-espelho-divida',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './espelho-divida.html',
  styleUrl: './espelho-divida.scss',
})
export class EspelhoDivida implements OnInit {
  nome!: string;
  cpf!: string;
  endereco!: string;

  debitos: any[] = [];
  dadosIdentificacao: any[] = [];

  displayedColumnsIdentificacao = [
    'receita',
    'dataOrigem',
    'valorOriginal',
    'saldoDevedor',
    'quantidadePrestacoes',
    'situacao',
  ];

  displayedColumnsParcelas = [
    'parcela',
    'pagamento',
    'vencimento',
    'valorOriginal',
    'valorAtualizado',
    'situacao',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EspelhoDivida>,
  ) {}

  ngOnInit(): void {
    this.nome = this.data.nome;
    this.cpf = this.data.cpf;
    this.endereco = this.data.endereco;

    this.debitos = this.data.debitos;

    this.dadosIdentificacao = this.debitos.map((d: any) => ({
      receita: d.descricaoReceita,
      dataOrigem: d.dataEntregaGRU,
      valorOriginal: d.valorOriginal,
      saldoDevedor: d.saldoDevedor,
      quantidadePrestacoes: d.numeroPrestacoes,
      situacao: d.situacao,
    }));
  }
  fechar(): void {
    this.dialogRef.close();
  }
}
