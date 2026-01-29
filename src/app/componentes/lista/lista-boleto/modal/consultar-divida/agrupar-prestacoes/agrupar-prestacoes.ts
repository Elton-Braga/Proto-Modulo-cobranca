import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
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
    NgIf,
  ],
  templateUrl: './agrupar-prestacoes.html',
  styleUrl: './agrupar-prestacoes.scss',
})
export class AgruparPrestacoes {
  confirmarAgrupamento = false;
  novaData: Date | null = null;
  valorAgrupado = 0;
  origemComponente: string = 'consultarDivida'; // Valor padrão
  numeroRequerimento: string = '1111111111111';
  dataRequerimento: string = '15/12/2010';
  quantidadePrestacoes = 0;
  dadosCabecalho: any;
  dadosTabelaPrestacoes: any;
  constructor(
    private dialogRef: MatDialogRef<AgruparPrestacoes>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.dadosCabecalho = [
      {
        nome: this.data.titular?.nome,
        cpf: this.data.titular?.cpf,
        codBeneficiario: this.data.titular?.cod_beneficiario,
        sr: this.data.titular?.sr || 'xx',
        uf: this.data.titular?.uf || 'xx',
        saldoDevedor: this.data.debitos?.reduce(
          (acc: number, d: any) => acc + (d.saldoDevedor || 0),
          0,
        ),
        credito: this.data.debitos?.reduce(
          (acc: number, d: any) => acc + (d.credito || 0),
          0,
        ),
      },
    ];

    this.dadosTabelaPrestacoes = Array.isArray(this.data?.debitos)
      ? this.data.debitos.map((d: any) => ({
          numeroReferencia: d.numeroReferencia,
          nossoNumero: d.nossoNumero,
          prestacao: d.prestacao,
          vencimento: d.vencimentoOriginal,
          prorrogacao: d.dataParaPagamento,
          moeda: d.moeda,
          valor: d.valorOriginal,
          correcao: d.correcao,
          juros: d.juros,
          jurosMora: d.jurosMora,
          multa: d.multa,
          descontos: d.desconto,
          descExcedente: d.remissao,
          credito: d.credito,
          aPagar: d.valorDevido,
          totalPagar: d.valorTotalPrestacao,
          moedaFinal: d.moedaFinal,
          baixado: d.baixado,
          numeroAvisoBaixa: d.numeroAvisoBaixa,
          tipoBaixa: d.tipoBaixa,
          prestacaoUnica: d.prestacaoUnica,
          dataBaixa: d.dataBaixa,
        }))
      : [];
    /*if (this.data) {
      if (Array.isArray(this.data)) {
        this.data = { debitos: this.data };
      }

      this.origemComponente = this.data.origem || 'consultarDivida';

      if (this.data.debitos) {
        this.calcularTotal(this.data.debitos);
      }

      this.quantidadePrestacoes = this.data.quantidadePrestacoes ?? 0;
    }*/
  }

  private calcularTotal(debitos: any[]): void {
    this.valorAgrupado = debitos.reduce(
      (total, debito) => total + (debito.valorTotalPrestacao ?? 0),
      0,
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
