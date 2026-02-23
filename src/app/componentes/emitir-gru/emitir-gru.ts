import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-emitir-gru',
  templateUrl: './emitir-gru.html',
  styleUrls: ['./emitir-gru.scss'],
  imports: [NgFor, MatIconModule],
})
export class EmitirGRU implements OnInit {
  beneficiario: any = null;
  dataHoraAtual!: string;

  ngOnInit(): void {
    this.dataHoraAtual = new Date().toLocaleString('pt-BR');

    const dado = sessionStorage.getItem('beneficiarioSelecionado');

    if (!dado || dado === 'undefined' || dado === 'null') {
      console.warn('Nenhum beneficiário válido encontrado no sessionStorage.');
      this.beneficiario = null;
      return;
    }

    try {
      this.beneficiario = JSON.parse(dado);
      console.log('Beneficiário carregado:', this.beneficiario);
    } catch (erro) {
      console.error('Erro ao interpretar o dado do beneficiário:', erro);
      this.beneficiario = null;
    }
  }

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
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            td {
              border: 1px solid #000;
              padding: 6px;
              vertical-align: top;
            }
            .cabecalho {
              text-align: center;
              font-size: 14px;
              border: none;
            }
            .titulo {
              text-align: center;
              font-weight: bold;
              background-color: #eee;
            }
            .direita {
              text-align: right;
            }
            .instrucoes {
              font-size: 12px;
            }
            .rodape {
              text-align: center;
              font-size: 12px;
              border-top: 2px solid #000;
            }
            .linha-digitavel {
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              letter-spacing: 2px;
            }
            .codigo-barras {
              text-align: center;
            }
            img {
              margin-top: 5px;
            }
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
          </script>
        </body>
      </html>
    `);

    janela.document.close();
  }
}
