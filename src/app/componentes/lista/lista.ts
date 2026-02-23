import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MOCK_BENEFICIARIOS } from '../../mock/MOCK_BENEFICIATIO';
import { ConsultarDivida } from './consultar-divida/consultar-divida';
import { DetalharDivida } from './detalhar-divida/detalhar-divida';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-lista',
  templateUrl: './lista.html',
  styleUrls: ['./lista.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
          opacity: 0,
          overflow: 'hidden',
        }),
      ),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
      ),
    ]),
  ],
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class Lista implements OnInit, AfterViewInit {
  expandedElement: Beneficiario | null = null;

  displayedColumns: string[] = [
    'select',
    'cod_beneficiario',
    'nome',
    'cpf',
    'nome_PA',
    'sr',

    'Situação',
    'Parcela',
    'Situação da Receita',
    'Descrição da Receita',
    'Impedimento',
    'acoes',
  ];

  dataSource = new MatTableDataSource<Beneficiario>();
  selection = new SelectionModel<Beneficiario>(true, []);
  beneficiariosOriginais: Beneficiario[] = [...MOCK_BENEFICIARIOS];
  formFiltro!: FormGroup;
  sr: string[] = ['01', '02', '03', '04', '05'];
  natureza: String[] = [
    'Todas as receitas',
    'Títulos ',
    'Concessão de Crédito',
    'Aluguéis e arrendamentos / Serviços administrativos ',
    'Outras restituições ',
    'Serviços administrativos',
    'Multas e juros previstas em contratos',
  ];
  relatorio: String[] = ['Título', 'Concessão'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.formFiltro = this.fb.group({
      ano: ['', [Validators.minLength(3)]],
      cpf: ['', [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      modalidade: [],
      nomePA: [''],
      sr: [''],
      natureza: [''],
      relatorio: [],
      situacao: [''],
      impedimento: [''],
      cod_beneficiario: [''],
      devedor: [],
      periodo: [''],
      haQD: [''],
      data: this.fb.group({
        start: [null],
        end: [null],
      }),
      numeroPrestacoes: [''],
      periodoArrecadacao: [''],
      tipoarrecadacao: [''],
      formato: [''],
      modelo: [''],
    });
    this.beneficiariosOriginais.forEach((b) => {
      b.dadosDeCobranca?.forEach((d) => {
        d.dataAssinaturaContrato = this.converterData(d.dataAssinaturaContrato);
        (d as any).dataVencimento = this.converterData(
          (d as any).dataVencimento,
        );
      });
    });

    this.dataSource.data = this.beneficiariosOriginais;
  }
  get dataFormGroup(): FormGroup {
    return this.formFiltro.get('data') as FormGroup;
  }
  private converterData(dataStr?: string): string | undefined {
    if (!dataStr) return undefined;
    const partes = dataStr.split('/');
    if (partes.length !== 3) return dataStr;
    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleExpand(element: Beneficiario): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  aplicarFiltro(): void {
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

    const filtradas = this.beneficiariosOriginais.filter((b: Beneficiario) => {
      const titular = b.titular;
      const nomeMatch =
        !nome || titular.nome.toLowerCase().includes(nome.toLowerCase());
      const cpfMatch = !cpf || titular.cpf === cpf;
      const paMatch =
        !nomePA ||
        b.historico_PNRA?.[0]?.nome_PA
          ?.toLowerCase()
          .includes(nomePA.toLowerCase());
      const srMatch =
        !sr ||
        b.requerimento?.[0]?.sr?.toLowerCase().includes(sr.toLowerCase());
      const tipoMatch =
        !tipo ||
        b.dadosDeCobranca?.some((d) =>
          d.tipo?.toLowerCase().includes(tipo.toLowerCase()),
        );
      const nossoNumeroMatch =
        !nossoNumero ||
        b.dadosDeCobranca?.some((d) =>
          d.nossoNumero?.toString().includes(nossoNumero),
        );
      const numeroReferenciaMatch =
        !numeroReferencia ||
        b.dadosDeCobranca?.some((d) =>
          d.numeroReferencia?.toString().includes(numeroReferencia),
        );
      const numeroProcessoMatch =
        !numeroProcesso ||
        b.requerimento?.[0]?.numeroProcesso
          ?.toString()
          .includes(numeroProcesso);
      const numeroDocumentoMatch =
        !numeroDocumento ||
        b.documentoTitulacao?.numero?.toString().includes(numeroDocumento);

      return (
        nomeMatch &&
        cpfMatch &&
        paMatch &&
        srMatch &&
        tipoMatch &&
        nossoNumeroMatch &&
        numeroReferenciaMatch &&
        numeroProcessoMatch &&
        numeroDocumentoMatch
      );
    });

    this.dataSource.data = filtradas;
  }

  limparFiltro(): void {
    this.formFiltro.reset();
    this.dataSource.data = this.beneficiariosOriginais;
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  exportar(tipo: 'pdf' | 'xls' | 'csv'): void {
    console.log(`Exportando: ${tipo.toUpperCase()}`);
  }

  abrirConsultarDivida(element: Beneficiario): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Modal fechada com resultado:', result);
    });
  }

  abrirDetalharDivida(element: Beneficiario): void {
    const dialogRef = this.dialog.open(DetalharDivida, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Modal fechada com resultado:', result);
    });
  }

  abrirCadastroConcessoes(element: Beneficiario): void {
    this.router.navigate(['/cadastro-concessoes'], {
      state: { beneficiario: element },
    });
  }

  cadastroConcessoes(): void {
    this.router.navigate(['/cadastro-concessoes']);
  }

  abrirMenuAcoes(event: Event, element: Beneficiario): void {
    event.stopPropagation();
    console.log('Beneficiário selecionado:', element);
  }

  // ================================
  // MÉTODO ATUALIZADO PARA ABRIR GRU
  // ================================
  imprimirGRU(element: Beneficiario): void {
    // Salva o beneficiário no sessionStorage
    sessionStorage.setItem('beneficiarioSelecionado', JSON.stringify(element));

    // Aguarda brevemente para garantir que o dado foi gravado antes de abrir a nova aba
    setTimeout(() => {
      const novaAba = window.open(
        `${window.location.origin}${window.location.pathname.replace(
          /\/$/,
          '',
        )}/#/emitir-gru`,
        '_blank',
      );
      if (!novaAba) {
        alert('Permita pop-ups para imprimir a GRU.');
      }
    }, 100);
  }

  toggleInnerSelection(element: Beneficiario, row: DadosDeCobranca): void {
    element.innerSelection ??= new SelectionModel<DadosDeCobranca>(true, []);
    element.innerSelection.toggle(row);
  }

  isAllSelectedInner(element: Beneficiario): boolean {
    element.innerSelection ??= new SelectionModel<DadosDeCobranca>(true, []);
    const numSelected = element.innerSelection.selected.length;
    const numRows = element.dadosDeCobranca?.length ?? 0;
    return numSelected === numRows;
  }

  masterToggleInner(element: Beneficiario): void {
    element.innerSelection ??= new SelectionModel<DadosDeCobranca>(true, []);
    if (this.isAllSelectedInner(element)) {
      element.innerSelection.clear();
    } else {
      element.dadosDeCobranca?.forEach((row) =>
        element.innerSelection!.select(row),
      );
    }
  }
}

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
  dataAssinaturaContrato?: string;
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
