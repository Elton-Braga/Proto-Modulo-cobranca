import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MOCK_BENEFICIARIOS } from '../../mock/MOCK_BENEFICIATIO';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Beneficiario } from '../../mock/beneficiario';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  selector: 'app-lista',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit, AfterViewInit {
  beneficiariosOriginais = [...MOCK_BENEFICIARIOS];
  formFiltro!: FormGroup;
  displayedColumns: string[] = [
    'select',
    'cod_beneficiario',
    'nome',
    'cpf',
    'nome_PA',
    'sr',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Beneficiario>();
  selection = new SelectionModel<Beneficiario>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Reactive form with validations
    this.formFiltro = this.fb.group({
      nome: ['', [Validators.minLength(3)]],
      cpf: ['', [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      nomePA: [''],
      sr: [''],
    });

    // load mock data
    this.dataSource.data = MOCK_BENEFICIARIOS;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /** Filtra pelos campos do formulário. */
  aplicarFiltro(): void {
    const { nome, cpf, nomePA, sr } = this.formFiltro.value;
    const filtro = { nome, cpf, nomePA, sr };

    // Transform dataset em linhas planas para a tabela (ex.: extrair titular e campos úteis)
    const linhas = MOCK_BENEFICIARIOS.map(
      (b) =>
        ({
          beneficiario: b,
          cod_beneficiario: b.titular?.cod_beneficiario || '',
          nome: b.titular?.nome || '',
          cpf: b.titular?.cpf || '',
          nome_PA: b.historico_PNRA?.[0]?.nome_PA || '',
          sr: b.requerimento?.[0]?.sr || '',
        } as any)
    );

    // aplicar filtro por cada propriedade não vazia
    const filtradas = linhas.filter((l) => {
      if (
        filtro.nome &&
        !l.nome.toLowerCase().includes(filtro.nome.toLowerCase())
      )
        return false;
      if (filtro.cpf && l.cpf !== filtro.cpf) return false;
      if (
        filtro.nomePA &&
        !l.nome_PA.toLowerCase().includes(filtro.nomePA.toLowerCase())
      )
        return false;
      if (filtro.sr && !l.sr.toLowerCase().includes(filtro.sr.toLowerCase()))
        return false;
      return true;
    });

    // Atualizar datasource com o formato esperado pela tabela
    this.dataSource.data = filtradas.map((f) => f.beneficiario);
  }

  limparFiltro(): void {
    // Limpa o formulário
    this.formFiltro.reset();

    // Restaura o dataSource para os dados originais (caso você tenha armazenado o mock completo)
    this.dataSource.data = this.beneficiariosOriginais;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  abrirMenuAcoes(element: any): void {
    // Caso deseje manipular o elemento selecionado ao abrir o menu de ações
    console.log('Beneficiário selecionado:', element);
  }
}
