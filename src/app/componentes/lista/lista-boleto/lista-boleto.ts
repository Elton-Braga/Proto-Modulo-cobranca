import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
// import { Beneficiario } from '../../../mock/beneficiario';
import { MOCK_BENEFICIARIOS } from '../../../mock/MOCK_BENEFICIATIO';
import { SelectionModel } from '@angular/cdk/collections';
import { DetalharDivida } from '../detalhar-divida/detalhar-divida';
//import { ConsultarDivida } from '../consultar-divida/consultar-divida';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConsultarDivida } from './modal/consultar-divida/consultar-divida';
import { AgruparPrestacoes } from './modal/consultar-divida/agrupar-prestacoes/agrupar-prestacoes';
import { AlertDialogComponent } from './modal/mensagem/mensagem';
//import { Debitos } from '../../../mock/debitos';

/* =======================================================
   ==== INTERFACES ESTRUTURADAS E TIPADAS CORRETAMENTE ====
   ======================================================= */

export interface DocumentoTitulacao {
  numero?: string;
  tipo?: string;
}

export interface Requerimento {
  sr?: string;
  numeroProcesso?: string;
}

export interface DadosDeCobranca {
  tipo?: string;
  nossoNumero?: string;
  numeroReferencia?: string;
  modalidade?: string;
  valorContrato?: number;
  dataAssinaturaContrato?: string; // usado como vencimento quando aplicável
  situacao?: string;
  descricao?: string; // caso exista
  numeroParcela?: string; // caso exista
}

export interface Beneficiario {
  titular: {
    cod_beneficiario: string;
    nome: string;
    cpf: string;
  };
  historico_PNRA?: { nome_PA?: string; situacao?: string }[];
  bloqueios?: { bloqueio?: string }[];
  requerimento?: Requerimento[];
  dadosDeCobranca?: DadosDeCobranca[];
  debitos?: Debitos[]; // ADICIONE ESTA LINHA
  documentoTitulacao?: DocumentoTitulacao;
  innerSelection?: SelectionModel<DadosDeCobranca>;
}

// Adicione a interface Debitos localmente ou importe do seu mock
export interface Debitos {
  descricaoReceita?: string;
  prestacao?: string;
  vencimentoOriginal?: string;
  valorDevido?: number;
  situacao?: string;
  numeroDaPrestacao?: string;
  // Adicione outros campos conforme necessário
}

/* Linha que será exibida na tabela (flatten) */
export interface DebtRow {
  codigoBeneficiario: string;
  nomeDevedor: string;
  cpfDevedor: string;
  descricaoDivida?: string;
  numeroParcela?: string; // "1/12"
  vencimento?: Date;
  valor?: number;
  situacao?: string;
  beneficiarioIndex?: number;
  cobrancaIndex?: number;
  numeroDaPrestacao?: string;
}

@Component({
  selector: 'app-lista-boleto',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    NgIf,
    RouterLink,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor,
    //AlertDialogComponent,
  ],
  templateUrl: './lista-boleto.html',
  styleUrls: ['./lista-boleto.scss'],
})
export class ListaBoleto implements AfterViewInit {
  formFiltro!: FormGroup;

  // Cast do mock para o tipo local Beneficiario[] para evitar conflitos de nome
  beneficiariosOriginais: Beneficiario[] =
    MOCK_BENEFICIARIOS as unknown as Beneficiario[];

  sr: string[] = ['01', '02', '03', '04', '05'];
  tipos: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  situacao_prestacao: String[] = [
    'em atraso',
    'em aberto',
    'Prorrogada',
    'Baixada',
    'baixada em dívida aberta',
    'Prescrita',
  ];

  tipo_receita: String[] = [
    'Crédito concedido',
    'Documento de Titulação ',
    'Receitas diversas ',
  ];

  descricao_receita: String[] = [
    'Fomento',
    'Apoio Inicial',
    'Título Original/Principal ',
    'Termo Aditivo Renegociação ',
    'Termo Aditivo Enquadramento',
    'Termo Aditivo Alteração',
    'Termo Aditivo Reenquadramento',
  ];

  // Tabela / seleção
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nome',
    'cpf',
    'descricaoD',
    //'descricaoP',
    'parcela',
    'vencimento',
    'valor',
    'situacao',
    'acao',
  ];
  dataSource = new MatTableDataSource<DebtRow>([]);
  selection = new SelectionModel<DebtRow>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formFiltro = this.fb.group({
      nome: ['', [Validators.minLength(3)]],
      cpf: ['', [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      nomePA: [''],
      sr: [''],
      situacao: [''],
      impedimento: [''],
      cod_beneficiario: [''],
      modalidade: [''],
      tipo: [''],
      n_processo: [],
      nossoNumero: [''],
      numeroReferencia: [''],
      numeroProcesso: [''],
      numeroDocumento: [''],
      situacao_receita: [''],
      DescricaoReceita: [''],
      situacaoP: [],
      vencimentoPeriodo: this.fb.group({
        start: [null],
        end: [null],
      }),
    });

    // Monta as linhas da tabela ao inicializar (flatten de beneficiários -> cobranças)
    this.dataSource.data = this.buildDebtRows();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  limparFiltro(): void {
    this.formFiltro.reset();
    //this.dataSource.data = this.beneficiariosOriginais;
  }

  aplicarFiltro(): void {
    // Mantive seu filtro original (se quiser que a tabela reflita o filtro, aplique aqui sobre buildDebtRows())
    const {
      nome,
      cpf,
      nomePA,
      sr,
      tipo,
      nossoNumero,
      numeroReferencia,
      numeroProcesso,
      numeroDocumento,
    } = this.formFiltro.value;

    // Exemplo: refiltrar as linhas da tabela com base no filtro atual
    const allRows = this.buildDebtRows();
    const filtradas = allRows.filter((r) => {
      const nomeMatch =
        !nome || r.nomeDevedor?.toLowerCase().includes(nome.toLowerCase());
      const cpfMatch = !cpf || r.cpfDevedor === cpf;
      const srMatch =
        !sr || r.codigoBeneficiario?.toLowerCase().includes(sr.toLowerCase());
      const tipoMatch =
        !tipo ||
        (r.descricaoDivida || '').toLowerCase().includes(tipo.toLowerCase());
      const nossoNumeroMatch =
        !nossoNumero ||
        (r.numeroParcela || '').toString().includes(nossoNumero);
      const numeroReferenciaMatch =
        !numeroReferencia ||
        (r.numeroParcela || '').toString().includes(numeroReferencia);
      const numeroProcessoMatch =
        !numeroProcesso ||
        (r.beneficiarioIndex?.toString() || '').includes(numeroProcesso);
      const numeroDocumentoMatch =
        !numeroDocumento ||
        (r.numeroParcela || '').toString().includes(numeroDocumento);

      return (
        nomeMatch &&
        cpfMatch &&
        srMatch &&
        tipoMatch &&
        nossoNumeroMatch &&
        numeroReferenciaMatch &&
        numeroProcessoMatch &&
        numeroDocumentoMatch
      );
    });

    this.dataSource.data = filtradas;
    // reset seleção ao aplicar filtro
    this.selection.clear();
  }

  /**
   * Converte o array de beneficiários em linhas planas (uma linha por cobrança encontrada).
   * Observações:
   * - Assumi que cada item de `dadosDeCobranca` representa uma parcela/dívida.
   * - Usei campos aproximados: dataAssinaturaContrato => vencimento; valorContrato => valor;
   *   numeroReferencia / nossoNumero / numeroParcela => número de parcela (quando disponível).
   * Ajuste conforme formato real do mock.
   */
  // Corrija a função buildDebtRows para percorrer o array debitos em vez de dadosDeCobranca
  private buildDebtRows(): DebtRow[] {
    const rows: DebtRow[] = [];

    this.beneficiariosOriginais.forEach((b, bi) => {
      const codigo = b.titular.cod_beneficiario;
      const nome = b.titular.nome;
      const cpf = b.titular.cpf;

      if (!b.debitos || b.debitos.length === 0) {
        return;
      }

      b.debitos.forEach((d: Debitos, di: number) => {
        const row: DebtRow = {
          codigoBeneficiario: codigo,
          nomeDevedor: nome,
          cpfDevedor: cpf,

          // Use os campos do objeto Debitos
          descricaoDivida: d.descricaoReceita,
          numeroParcela: d.prestacao, // "1/12", "2/12", etc.
          vencimento: this.parseDate(d.vencimentoOriginal), // String no formato "dd/MM/yyyy"
          valor: d.valorDevido,

          // Agora sim, a situação virá do array debitos
          situacao: d.situacao,

          beneficiarioIndex: bi,
          cobrancaIndex: di,

          // Adicione o número da prestação
          numeroDaPrestacao: d.numeroDaPrestacao,
        };

        rows.push(row);
      });
    });

    return rows;
  }

  /** Tenta converter várias formas comuns em Date. Retorna undefined se inválido */
  private parseDate(value: string | number | undefined): Date | undefined {
    if (value == null || value === '') return undefined;

    if (typeof value === 'number') {
      const dtNum = new Date(value);
      return isNaN(dtNum.getTime()) ? undefined : dtNum;
    }

    if (typeof value === 'string') {
      // Tenta o formato dd/MM/yyyy primeiro (que é o formato no JSON)
      const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const m = value.match(ddmmyyyy);
      if (m) {
        const dia = parseInt(m[1], 10);
        const mes = parseInt(m[2], 10) - 1;
        const ano = parseInt(m[3], 10);
        const dt = new Date(ano, mes, dia);
        return isNaN(dt.getTime()) ? undefined : dt;
      }

      // Tenta outros formatos (ISO, etc.)
      const tryIso = new Date(value);
      if (!isNaN(tryIso.getTime())) return tryIso;
    }

    return undefined;
  }

  /* ===========================
     Seleção (SelectionModel)
     =========================== */

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  toggleRow(row: DebtRow): void {
    this.selection.toggle(row);
  }

  checkboxLabel(row?: DebtRow): string {
    if (!row) {
      return `${this.isAllSelected() ? 'desmarcar' : 'marcar'} todas`;
    }
    return `${this.selection.isSelected(row) ? 'desmarcar' : 'marcar'} linha`;
  }

  limparSelecao(): void {
    this.selection.clear();
  }

  /* ===========================
     Ações
     =========================== */

  verDetalhes(row: DebtRow): void {
    // exemplo: abrir diálogo com detalhes da dívida
    console.log('Visualizar detalhes de', row);
    // implementar dialog.open(...) se desejar
  }

  baixarDocumento(row: DebtRow): void {
    // exemplo: acionar download / geração de boleto / GRU, etc.
    console.log('Baixar documento para', row);
    // lógica real de download aqui
  }

  /** Emitir GRU para uma única linha (acionada pelo menu de ações da linha) */
  emitirGRU(row: DebtRow): void {
    if (!row) return;
    const id = row.codigoBeneficiario ?? row.beneficiarioIndex;
    // Aqui você chamaria o serviço que solicita a GRU para essa cobrança
    console.log('Emitir GRU (único) para', id, row);
    // Exemplo: this.gruService.emitir([id]).subscribe(...)
  }

  /** Abrir detalhamento da dívida (pode abrir dialog) */
  detalharDivida(row: DebtRow): void {
    if (!row) return;
    console.log('Detalhar dívida', row);
    const dialogRef = this.dialog.open(DetalharDivida, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: row,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Modal fechada com resultado:', result);
    });
  }

  /** Abrir detalhamento do devedor (pode abrir dialog ou rota) */
  detalharReceita(row: DebtRow): void {
    if (!row) return;

    const beneficiario = MOCK_BENEFICIARIOS.find(
      (b) => b.titular.cod_beneficiario === row.codigoBeneficiario
    );

    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: {
        ...beneficiario,
        pagamento: [
          {
            tipoReceita: 'Receita X',
            descricaoReceita: row.descricaoDivida,
            numeroReferencia: 'REF123',
            valorOriginal: row.valor,
            dataVencimento: row.vencimento?.toLocaleDateString('pt-BR'),
            situacao: row.situacao,
          },
        ],
      },
    });
  }

  /** Atualizar parcela (abrir formulário/modal de edição) */
  atualizarParcela(row: DebtRow): void {
    if (!row) return;

    // Regra geral: somente em atraso
    if (row.situacao?.toLowerCase() !== 'em atraso') {
      return;
    }

    const nome = row.nomeDevedor?.toLowerCase();

    /* ===============================
     CASO JOANA – BLOQUEIO TOTAL
     =============================== */
    if (nome?.includes('joana')) {
      //alert('Para atualizar esta prestação, procure a área responsável');

      this.dialog.open(AlertDialogComponent, {
        width: '420px',
        data: {
          title: 'Acesso restrito',
          message: 'Para atualizar esta prestação, procure a área responsável',
        },
      });

      return;
    }

    /* ===============================
     CASO FRANCISCO / MATEUS
     =============================== */

    const prestacoesEmAtraso = this.dataSource.data.filter(
      (r) =>
        r.codigoBeneficiario === row.codigoBeneficiario &&
        r.situacao?.toLowerCase() === 'em atraso'
    );

    const dialogRef = this.dialog.open(AgruparPrestacoes, {
      width: '480px',
      disableClose: true,
      data: prestacoesEmAtraso.map((p) => ({
        ...p,
        valorTotalPrestacao: p.valor ?? 0,
      })),
    });

    /* ===============================
     CASO MATEUS – CONFIRMAÇÃO PÓS-MODAL
     =============================== */
    if (nome?.includes('mateus')) {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.dialog
            .open(AlertDialogComponent, {
              width: '420px',
              data: {
                title: 'Confirmação',
                message: 'Deseja emitir a GRU?',
                confirmText: 'Sim',
                cancelText: 'Não',
                showCancel: true,
              },
            })
            .afterClosed()
            .subscribe((confirmou) => {
              if (confirmou) {
                console.log('Emitir GRU confirmada');
                // chamada real do serviço aqui
              }
            });
        }
      });
    }
  }

  /** Exporta seleção atual como CSV (utiliza ponto e vírgula como separador) */
  exportarCSV(): void {
    const rows = this.selection.selected;
    if (!rows || rows.length === 0) {
      console.warn('Nenhuma linha selecionada para exportar CSV.');
      return;
    }

    const headers = [
      'codigoBeneficiario',
      'nomeDevedor',
      'cpfDevedor',
      'numeroParcela',
      'vencimento',
      'valor',
    ];
    const csvLines: string[] = [];

    // Cabeçalho legível (opcional: deixar como chaves)
    csvLines.push(headers.join(';'));

    for (const r of rows) {
      const values = headers.map((h) => {
        let v: any = (r as any)[h];
        if (h === 'vencimento' && v) {
          v =
            v instanceof Date
              ? v.toLocaleDateString('pt-BR')
              : new Date(v).toLocaleDateString('pt-BR');
        }
        if (v === null || v === undefined) v = '';
        // escape básico
        return `"${String(v).replace(/"/g, '""').replace(/;/g, ',')}"`;
      });
      csvLines.push(values.join(';'));
    }

    const csvContent = csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export_selecionados_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /** Exporta seleção abrindo uma nova janela com tabela HTML e chamando print (solução simples) */
  exportarPDF(): void {
    const rows = this.selection.selected;
    if (!rows || rows.length === 0) {
      console.warn('Nenhuma linha selecionada para exportar PDF.');
      return;
    }

    const headers = ['Código', 'Nome', 'CPF', 'Parcela', 'Vencimento', 'Valor'];
    const columns = [
      'codigoBeneficiario',
      'nomeDevedor',
      'cpfDevedor',
      'numeroParcela',
      'vencimento',
      'valor',
    ];

    let html = `<html><head><title>Exportação PDF</title><style>
      table{width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif}
      th,td{border:1px solid #ccc;padding:6px;font-size:12px}
      th{background:#f5f5f5}
      </style></head><body>`;
    html += `<h3>Itens selecionados</h3>`;
    html +=
      '<table><thead><tr>' +
      headers.map((h) => `<th>${h}</th>`).join('') +
      '</tr></thead><tbody>';

    for (const r of rows) {
      html += '<tr>';
      for (const col of columns) {
        let v: any = (r as any)[col];
        if (col === 'vencimento' && v) {
          v =
            v instanceof Date
              ? v.toLocaleDateString('pt-BR')
              : new Date(v).toLocaleDateString('pt-BR');
        }
        html += `<td>${v ?? ''}</td>`;
      }
      html += '</tr>';
    }

    html += '</tbody></table></body></html>';

    const w = window.open('', '_blank');
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      // chama print; o usuário pode salvar como PDF no diálogo de impressão
      w.print();
    } else {
      console.warn(
        'Popup bloqueado: não foi possível abrir janela para exportar PDF.'
      );
    }
  }

  /**
   * Emitir GRU para as linhas selecionadas (botão "Emitir GRU" da toolbar).
   * Recebe opcionalmente o evento do clique para impedir propagação.
   */
  emitirGRUSelecionadas(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    const rows = this.selection.selected;
    if (!rows || rows.length === 0) {
      console.warn('Nenhuma linha selecionada para emissão de GRU.');
      return;
    }

    const ids = rows
      .map(
        (r) =>
          r.codigoBeneficiario ?? `${r.beneficiarioIndex}:${r.cobrancaIndex}`
      )
      .filter(Boolean);

    console.log('Emitir GRU para IDs:', ids);
    // Aqui você chamaria um serviço que gera as GRUs em lote:
    // this.gruService.emitirPara(ids).subscribe(res => { ... });

    // Exemplo de feedback (se usar MatSnackBar, descomente e injete no construtor)
    // this.snackBar.open(`${rows.length} GRU(s) preparada(s) para emissão.`, 'Fechar', { duration: 3000 });
  }
}
