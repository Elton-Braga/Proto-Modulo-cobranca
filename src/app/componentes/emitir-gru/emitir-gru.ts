import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-emitir-gru',
  templateUrl: './emitir-gru.html',
  styleUrls: ['./emitir-gru.scss'],
})
export class EmitirGRU {
  beneficiario: any = null;

  constructor() {
    const dado = sessionStorage.getItem('beneficiarioSelecionado');
    this.beneficiario = dado ? JSON.parse(dado) : null;
    console.log('Beneficiário carregado:', this.beneficiario);
  }

  imprimir(): void {
    const conteudo = document.querySelector('.gru-container')?.innerHTML;
    if (!conteudo) {
      console.error('Erro: não foi possível localizar a seção da GRU.');
      return;
    }

    const janela = window.open('', '_blank', 'width=900,height=900');
    janela?.document.write(`
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
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    janela?.document.close();
  }
}
