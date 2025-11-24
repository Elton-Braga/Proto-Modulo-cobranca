import { CommonModule, NgIf } from '@angular/common';
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
  documentoTitulacao?: DocumentoTitulacao;
  innerSelection?: SelectionModel<DadosDeCobranca>;
}

/* Linha que será exibida na tabela (flatten) */
export interface DebtRow {
  codigoBeneficiario: string;
  nomeDevedor: string;
  cpfDevedor: string;
  descricaoDivida?: string;
  numeroParcela?: string;
  vencimento?: Date; // <-- agora Date | undefined
  valor?: number;
  situacao?: string;
  beneficiarioIndex?: number;
  cobrancaIndex?: number;
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

  // Tabela / seleção
  displayedColumns: string[] = [
    'select',
    'codigo',
    'nome',
    'cpf',
    'descricao',
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
      nossoNumero: [''],
      numeroReferencia: [''],
      numeroProcesso: [''],
      numeroDocumento: [''],
      situacao_receita: [''],
      situacao_PA: [''],
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
  private buildDebtRows(): DebtRow[] {
    const rows: DebtRow[] = [];

    this.beneficiariosOriginais.forEach((b, bi) => {
      const codigo = b.titular?.cod_beneficiario || '';
      const nome = b.titular?.nome || '';
      const cpf = b.titular?.cpf || '';

      if (b.dadosDeCobranca && b.dadosDeCobranca.length > 0) {
        b.dadosDeCobranca.forEach((d, di) => {
          const row: DebtRow = {
            codigoBeneficiario: codigo,
            nomeDevedor: nome,
            cpfDevedor: cpf,
            descricaoDivida: d.descricao || d.modalidade || d.tipo,
            numeroParcela:
              d.numeroParcela || d.numeroReferencia || d.nossoNumero,
            vencimento: this.parseDate(d.dataAssinaturaContrato),
            valor: d.valorContrato ?? undefined,
            situacao:
              d.situacao || b.historico_PNRA?.[0]?.situacao || undefined,
            beneficiarioIndex: bi,
            cobrancaIndex: di,
          };
          rows.push(row);
        });
      } else {
        // Caso não haja dadosDeCobranca, adicionar linha "vazia"
        const row: DebtRow = {
          codigoBeneficiario: codigo,
          nomeDevedor: nome,
          cpfDevedor: cpf,
          descricaoDivida: undefined,
          numeroParcela: undefined,
          vencimento: undefined,
          valor: undefined,
          situacao: b.historico_PNRA?.[0]?.situacao,
          beneficiarioIndex: bi,
          cobrancaIndex: -1,
        };
        rows.push(row);
      }
    });

    return rows;
  }

  /** Tenta converter várias formas comuns em Date. Retorna undefined se inválido */
  private parseDate(value: string | number | undefined): Date | undefined {
    if (value == null || value === '') return undefined;

    // se for número (timestamp em ms)
    if (typeof value === 'number') {
      const dtNum = new Date(value);
      return isNaN(dtNum.getTime()) ? undefined : dtNum;
    }

    // se já for string: tenta new Date()
    if (typeof value === 'string') {
      // tentativa direta (ISO, etc.)
      const tryIso = new Date(value);
      if (!isNaN(tryIso.getTime())) return tryIso;

      // tenta dd/MM/yyyy
      const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const m = value.match(ddmmyyyy);
      if (m) {
        const dia = parseInt(m[1], 10);
        const mes = parseInt(m[2], 10) - 1;
        const ano = parseInt(m[3], 10);
        const dt = new Date(ano, mes, dia);
        return isNaN(dt.getTime()) ? undefined : dt;
      }

      // outras formatações podem ser adicionadas aqui
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
}
