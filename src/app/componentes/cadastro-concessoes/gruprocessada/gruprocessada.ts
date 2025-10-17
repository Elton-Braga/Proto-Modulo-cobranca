import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ConcessaoData } from './ConcessaoData';

@Component({
  selector: 'app-gruprocessada',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './gruprocessada.html',
  styleUrl: './gruprocessada.scss',
})
export class GRUProcessada {
  displayedColumns: string[] = [
    'parcelas',
    'numeroDocumento',
    'idRegGru',
    'ugEmitente',
    'ugArrecadadora',
    'dataPgto',
    'dataProcesso',
    'ra',
    'codReconhecimento',
    'descricao',
    'cpfContribuinte',
    'numeroReferencia',
    'valor',
    'situacao',
    'avisoBaixa',
  ];

  dataSource = new MatTableDataSource<ConcessaoData>([
    {
      parcelas: 3,
      numeroDocumento: 'DOC123456',
      idRegGru: 'GRU001',
      ugEmitente: '160001',
      ugArrecadadora: '170002',
      dataPgto: '2025-10-01',
      dataProcesso: '2025-10-05',
      ra: 'RA123',
      codReconhecimento: 'CRED01',
      descricao: 'Pagamento referente a crédito rural',
      cpfContribuinte: '123.456.789-00',
      numeroReferencia: 'REF001',
      valor: 15230.75,
      situacao: 'Quitado',
      avisoBaixa: 'Baixa automática confirmada',
    },
    {
      parcelas: 5,
      numeroDocumento: 'DOC654321',
      idRegGru: 'GRU002',
      ugEmitente: '160002',
      ugArrecadadora: '170003',
      dataPgto: '2025-09-12',
      dataProcesso: '2025-09-18',
      ra: 'RA456',
      codReconhecimento: 'CRED02',
      descricao: 'Crédito de indenização',
      cpfContribuinte: '987.654.321-00',
      numeroReferencia: 'REF002',
      valor: 8450.0,
      situacao: 'Pendente',
      avisoBaixa: 'Aguardando confirmação',
    },
  ]);
}
