import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-emitir-gru',
  templateUrl: './emitir-gru.html',
  styleUrls: ['./emitir-gru.scss'],
  imports: [NgFor, MatIconModule, MatButtonModule, MatMenuModule],
})
export class EmitirGRU implements OnInit {
  beneficiarios: any[] = [];
  dataHoraAtual!: string;

  ngOnInit(): void {
    this.dataHoraAtual = new Date().toLocaleString('pt-BR');

    // Tenta recuperar a lista de beneficiários (relatório geral)
    const dadoLista = sessionStorage.getItem('relatorioBeneficiarios');
    if (dadoLista && dadoLista !== 'undefined' && dadoLista !== 'null') {
      try {
        this.beneficiarios = JSON.parse(dadoLista);
      } catch (erro) {
        console.error('Erro ao interpretar a lista de beneficiários:', erro);
        this.beneficiarios = [];
      }
    } else {
      // Se não houver lista, tenta recuperar um único beneficiário (visualização individual)
      const dadoUnico = sessionStorage.getItem('beneficiarioSelecionado');
      if (dadoUnico && dadoUnico !== 'undefined' && dadoUnico !== 'null') {
        try {
          const unico = JSON.parse(dadoUnico);
          this.beneficiarios = [unico];
        } catch (erro) {
          console.error('Erro ao interpretar o beneficiário único:', erro);
          this.beneficiarios = [];
        }
      } else {
        this.beneficiarios = [];
        console.warn('Nenhum dado de beneficiário encontrado.');
      }
    }

    // Garante que cada beneficiário tenha um array de débitos (prestações)
    this.beneficiarios.forEach((b) => {
      if (!b.debitos) {
        // Se não houver a propriedade 'debitos', tenta criar a partir de 'dadosDeCobranca' (mock)
        if (b.dadosDeCobranca && b.dadosDeCobranca.length > 0) {
          b.debitos = b.dadosDeCobranca.map((dc: any, index: number) => ({
            numeroDaPrestacao: (index + 1).toString(),
            vencimentoOriginal:
              dc.dataVencimento || dc.dataAssinaturaContrato || '',
            valorPrincipal: dc.valorContrato || 0,
            dataParaPagamento: dc.dataVencimento || '',
            jurosMora: 0,
            multa: 0,
            desconto: 0,
            credito: 0,
            valorTotalPrestacao: dc.valorContrato || 0,
            valorDevido: dc.valorContrato || 0,
          }));
        } else {
          b.debitos = [];
        }
      }
    });
  }

  exportar(tipo: 'xls' | 'csv' | 'pdf') {
    console.log('Exportando para:', tipo);

    switch (tipo) {
      case 'xls':
        // lógica XLS
        break;

      case 'csv':
        // lógica CSV
        break;

      case 'pdf':
        // lógica PDF
        break;
    }
  }

  // O método imprimir() permanece inalterado
  imprimir(): void {
    const conteudo = document.querySelector('.gru-container')?.innerHTML;
    if (!conteudo) {
      console.error('Erro: não foi possível localizar a seção da GRU.');
      return;
    }
    const janela = window.open('', '_blank', 'width=900,height=900');
    if (!janela) {
      alert('Permita pop-ups para imprimir a GRU.');
      return;
    }
    janela.document.write(`
      <html>
        <head>
          <title>Impressão da GRU</title>
          <style>
            /* (mantenha os estilos atuais) */
          </style>
        </head>
        <body>
          ${conteudo}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          <\/script>
        </body>
      </html>
    `);
    janela.document.close();
  }
}
