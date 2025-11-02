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
import { Beneficiario } from '../../mock/beneficiario';
import { ConsultarDivida } from './consultar-divida/consultar-divida';
import { DetalharDivida } from './detalhar-divida/detalhar-divida';

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
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
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
  ],
})
export class Lista implements OnInit, AfterViewInit {
  expandedElement: any | null = null;

  displayedColumns: string[] = [
    'select',
    'cod_beneficiario',
    'nome',
    'cpf',
    'nome_PA',
    'sr',
    'Situação',
    'Impedimento',
    'acoes',
  ];

  dataSource = new MatTableDataSource<Beneficiario>();
  selection = new SelectionModel<Beneficiario>(true, []);
  beneficiariosOriginais = [...MOCK_BENEFICIARIOS];
  formFiltro!: FormGroup;
  sr: string[] = ['01', '02', '03', '04', '05'];

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
    });

    this.dataSource.data = MOCK_BENEFICIARIOS;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleExpand(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  aplicarFiltro(): void {
    const { nome, cpf, nomePA, sr } = this.formFiltro.value;
    const filtradas = this.beneficiariosOriginais.filter((b) => {
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
      return nomeMatch && cpfMatch && paMatch && srMatch;
    });
    this.dataSource.data = filtradas;
  }

  limparFiltro(): void {
    this.formFiltro.reset();
    this.dataSource.data = this.beneficiariosOriginais;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    return numSelected === this.dataSource.data.length;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  exportar(tipo: 'pdf' | 'xls' | 'csv'): void {
    console.log(`Exportando: ${tipo.toUpperCase()}`);
  }

  abrirConsultarDivida(element: any): void {
    const dialogRef = this.dialog.open(ConsultarDivida, {
      width: '100vw', // Largura total da viewport
      height: '100vh', // Altura total da viewport
      maxWidth: '100vw', // Remove limitação de largura máxima
      maxHeight: '100vh', // Remove limitação de altura máxima
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal fechada com resultado:', result);
      }
    });
  }

  abrirDetalharDivida(element: any): void {
    const dialogRef = this.dialog.open(DetalharDivida, {
      width: '100vw', // Largura total da viewport
      height: '100vh', // Altura total da viewport
      maxWidth: '100vw', // Remove limitação de largura máxima
      maxHeight: '100vh', // Remove limitação de altura máxima
      panelClass: 'detalhar-divida-modal',
      data: element,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Modal fechada com resultado:', result);
      }
    });
  }

  abrirCadastroConcessoes(element: Beneficiario): void {
    this.router.navigate(['/cadastro-concessoes'], {
      state: { beneficiario: element },
    });
  }

  abrirMenuAcoes(event: Event, element: any): void {
    event.stopPropagation();
    console.log('Beneficiário selecionado:', element);
  }

  imprimirGRU(element: any): void {
    const novaAba = window.open('about:blank', '_blank');
    if (!novaAba) {
      alert('Permita pop-ups para imprimir a GRU.');
      return;
    }
    sessionStorage.setItem('beneficiarioSelecionado', JSON.stringify(element));
    novaAba.location.href = `${window.location.origin}/#/emitir-gru`;
  }

  toggleInnerSelection(element: any, row: any): void {
    if (!element.innerSelection) {
      element.innerSelection = new SelectionModel<any>(true, []);
    }
    element.innerSelection.toggle(row);
  }

  isAllSelectedInner(element: any): boolean {
    if (!element.innerSelection) {
      element.innerSelection = new SelectionModel<any>(true, []);
    }
    const numSelected = element.innerSelection.selected.length;
    const numRows = element.dadosDeCobranca.length;
    return numSelected === numRows;
  }

  masterToggleInner(element: any): void {
    if (!element.innerSelection) {
      element.innerSelection = new SelectionModel<any>(true, []);
    }
    this.isAllSelectedInner(element)
      ? element.innerSelection.clear()
      : element.dadosDeCobranca.forEach((row: any) =>
          element.innerSelection.select(row)
        );
  }
}
