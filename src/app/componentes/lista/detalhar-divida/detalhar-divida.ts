import { Component, createPlatform, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConsultarDivida } from '../consultar-divida/consultar-divida';
import { MOCK_BENEFICIARIOS } from '../../../mock/MOCK_BENEFICIATIO';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Beneficiario } from '../lista';
import { MatSelectModule } from '@angular/material/select';
//import { MatOption } from "@angular/material/select";

@Component({
  selector: 'app-detalhar-divida',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './detalhar-divida.html',
  styleUrls: ['./detalhar-divida.scss'],
})
export class DetalharDivida implements OnInit {
  editando = false;
  form!: FormGroup;
  latitude = -22.88587129197667;
  longitude = -42.23844749254404;

  controlesProjetoAssentamento: { key: string; value: any }[] = [];
  controlesBloqueio: { key: string; value: any }[] = [];
  controlesGeolocalizacao: { key: string; value: any }[] = [];
  controlesEnderecoCobranca: { key: string; value: any }[] = [];

  camposBloqueados: string[] = [
    'nome',
    'cpf',
    'data_nascimento',
    'codigo_beneficiario',
    'nome_pai',
    'nome_mae',
    'naturalidade',
    'nacionalidade',
    'nis',
  ];

  labelsBloqueio: Record<string, string> = {
    dataBloqueio: 'Data do Bloqueio',
    situacaoBloqueio: 'Situação do Bloqueio',
    tipoSubbloqueio: 'Tipo de Subbloqueio',
    tipoTransacao: 'Tipo de Transação',
    observacaoBloqueio: 'Observação do Bloqueio',
  };

  labelsGeolocalizacao: Record<string, string> = {
    codigoSigef: 'Código SIGEF',
    /*titulacao: 'Titulação',
    documentoTitulacao: 'Documento de Titulação',
    tituloCancelado: 'Título Cancelado?',
    processoAdministrativo: 'Processo Administrativo de Titulação',
    dataPublicacao: 'Data da Publicação',
    paginaSeiDoc: 'Pág./SEI Doc',
    modulosFiscaisHa: 'Módulos Fiscais (ha)',
    codigoSncr: 'Código SNCR',
    area: 'Área',
    unidadeArea: 'Unidade de Área',
    uf: 'UF',
    codigoMunicipioIbge: 'Código Município IBGE',
    descricaoMunicipio: 'Descrição do Município',
    diferencaArea: 'Diferença de Área',
    valorHectare: 'Valor do Hectare',
    valorAlienacao: 'Valor da Alienação',
    numeroSeiAtesto: 'Nº SEI – Atesto de Não Interesse',
    numeroModulosFiscais: 'Nº de Módulos Fiscais',
    tipoTermoAditivo: 'Tipo de Termo Aditivo',
    observacoes: 'Observações',*/
  };

  labelsProjetoAssentamento: Record<string, string> = {
    nome: 'Nome do Projeto',
    codigo_contato: 'Código do Contato',
    lote_individual_contato: 'Lote Individual (Contato)',
    numero_lote: 'Número do Lote',
    nome_lote: 'Nome do Lote',
    situacao: 'Situação',
    cep: 'CEP',
    estado: 'Estado (UF)',
    municipio: 'Município',
    gleba: 'Gleba',
    regularizacao_fundiaria: 'Regularização Fundiária',
  };

  opcoesRegularizacao = [
    { value: 'S', label: 'Sim' },
    { value: 'N', label: 'Não' },
  ];

  labelsEnderecoCobranca: Record<string, string> = {
    cep: 'CEP',
    estado: 'Estado (UF)',
    municipio: 'Município',
    bairro: 'Bairro',
    logradouro: 'Logradouro',
    complemento: 'Complemento',

    numero: 'Número',
    msm_end: 'mesmo endereço do Imóvel/Gleba/PA?',
  };

  controlesTitular: { key: string; value: any }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ✅ Inicialização dos grupos com controle do estado (disabled)
    this.form = this.fb.group({
      titular: this.fb.group({
        tipo: new FormControl({ value: '', disabled: true }),
        Natureza_Juridica: new FormControl({ value: '', disabled: false }),
        nome: new FormControl({ value: '', disabled: true }),
        cpf: new FormControl({ value: '', disabled: true }),
        codigo_beneficiario: new FormControl({ value: '', disabled: true }),
        nib: new FormControl({ value: '', disabled: true }),
        data_nascimento: new FormControl({ value: '', disabled: true }),
        estado_civil: new FormControl({ value: '', disabled: true }),
        sexo: new FormControl({ value: '', disabled: true }),
        nome_pai: new FormControl({ value: '', disabled: true }),
        nome_mae: new FormControl({ value: '', disabled: true }),
        nacionalidade: new FormControl({ value: '', disabled: true }),
        naturalidade: new FormControl({ value: '', disabled: true }),
        nis: new FormControl({ value: '', disabled: true }),
        telefone: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }),
        numero_processo: new FormControl({ value: '', disabled: true }),
        Data_Falecimento: new FormControl({ value: '', disabled: true }),
        data_homologacao: new FormControl({ value: '', disabled: true }),
      }),
      conjuge: this.fb.group({
        nome: new FormControl({ value: '', disabled: true }),
        cpf: new FormControl({ value: '', disabled: true }),
        data_nascimento: new FormControl({ value: '', disabled: true }),
        estado_civil: new FormControl({ value: '', disabled: true }),
        sexo: new FormControl({ value: '', disabled: true }),
        nome_pai: new FormControl({ value: '', disabled: true }),
        nome_mae: new FormControl({ value: '', disabled: true }),
        nacionalidade: new FormControl({ value: '', disabled: true }),
        naturalidade: new FormControl({ value: '', disabled: true }),
        nis: new FormControl({ value: '', disabled: true }),
        telefone: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }),
        Data_homologacao: new FormControl({ value: '', disabled: true }),
      }),

      unidadeFamiliar: this.fb.group({
        situacao_conjugal: new FormControl({ value: '', disabled: true }),
        data_uniao: new FormControl({ value: '', disabled: true }),
        data_separacao: new FormControl({ value: '', disabled: true }),
        renda_familiar: new FormControl({ value: '', disabled: true }),
        nome_dependente: new FormControl({ value: '', disabled: true }),
        // tipo_dependente: new FormControl({ value: '', disabled: true }),
        //nome: new FormControl({ value: '', disabled: true }),
        data_nascimento: new FormControl({ value: '', disabled: true }),
        //data_entrada_na_familia: new FormControl({ value: '', disabled: true }),
        cpf_dependente: new FormControl({ value: '', disabled: true }),
        //telefone: new FormControl({ value: '', disabled: true }),
        /*associacao_unidade_familiar: new FormControl({
          value: '',
          disabled: true,
        })*/
      }),
      projetoAssentamento: this.fb.group({
        nome: new FormControl({ value: '', disabled: true }),
        //codigo: new FormControl({ value: '', disabled: true }),
        //agrovila_contato: new FormControl({ value: '', disabled: true }),
        codigo_contato: new FormControl({ value: '', disabled: true }),
        lote_individual_contato: new FormControl({ value: '', disabled: true }),
        numero_lote: new FormControl({ value: '', disabled: true }),
        nome_lote: new FormControl({ value: '', disabled: true }),
        situacao: new FormControl({ value: '', disabled: true }),
        cep: new FormControl({ value: '', disabled: true }),
        estado: new FormControl({ value: '', disabled: true }),
        municipio: new FormControl({ value: '', disabled: true }),
        //codigo_municipio: new FormControl({ value: '', disabled: true }),
        gleba: new FormControl({ value: '', disabled: true }),
        //area: new FormControl({ value: '', disabled: true }),
        regularizacao_fundiaria: new FormControl({
          value: 'sim',
          disabled: false,
        }),
      }),

      bloqueio: this.fb.group({
        dataBloqueio: new FormControl({ value: '', disabled: true }),
        situacaoBloqueio: new FormControl({ value: '', disabled: true }),
        tipoSubbloqueio: new FormControl({ value: '', disabled: true }),
        tipoTransacao: new FormControl({ value: '', disabled: true }),
        observacaoBloqueio: new FormControl({ value: '', disabled: true }),
      }),
      geolocalizacao: this.fb.group({
        codigoSigef: new FormControl({ value: '', disabled: true }),
      }),

      enderecoCobranca: this.fb.group({
        cep: new FormControl({ value: '', disabled: true }),
        estado: new FormControl({ value: '', disabled: true }),
        municipio: new FormControl({ value: '', disabled: true }),
        bairro: new FormControl({ value: '', disabled: true }),
        logradouro: new FormControl({ value: '', disabled: true }),
        complemento: new FormControl({ value: '', disabled: true }),
        numero: new FormControl({ value: '', disabled: true }),
        msm_end: new FormControl({ value: '', disabled: true }),
      }),
      impedimento: this.fb.group({
        bloqueio: new FormControl({ value: '', disabled: true }),
        motivo_bloqueio: new FormControl({ value: '', disabled: true }),
      }),
      titulacao: this.fb.group({
        titulacao: new FormControl({ value: '', disabled: true }),
        documentoTitulacao: new FormControl({ value: '', disabled: true }),
        tituloCancelado: new FormControl({ value: '', disabled: true }),
        processoAdministrativo: new FormControl({ value: '', disabled: true }),
        dataPublicacao: new FormControl({ value: '', disabled: true }),
        paginaSeiDoc: new FormControl({ value: '', disabled: true }),
        modulosFiscaisHa: new FormControl({ value: '', disabled: true }),
        codigoSncr: new FormControl({ value: '', disabled: true }),
        area: new FormControl({ value: '', disabled: true }),
        unidadeArea: new FormControl({ value: '', disabled: true }),
        uf: new FormControl({ value: '', disabled: true }),
        codigoMunicipioIbge: new FormControl({ value: '', disabled: true }),
        descricaoMunicipio: new FormControl({ value: '', disabled: true }),
        diferencaArea: new FormControl({ value: '', disabled: true }),
        valorHectare: new FormControl({ value: '', disabled: true }),
        valorAlienacao: new FormControl({ value: '', disabled: true }),
        numeroSeiAtesto: new FormControl({ value: '', disabled: true }),
        numeroModulosFiscais: new FormControl({ value: '', disabled: true }),
        tipoTermoAditivo: new FormControl({ value: '', disabled: true }),
        observacoes: new FormControl({ value: '', disabled: true }),
      }),

      observacao: this.fb.group({
        observacao: new FormControl({ value: '', disabled: true }),
      }),
    });

    // ✅ Preenche os dados (mock)
    this.carregarDadosMock();

    this.controlesProjetoAssentamento = this.getControles(
      'projetoAssentamento'
    );

    this.controlesBloqueio = this.getControles('bloqueio');

    this.controlesGeolocalizacao = this.getControles('geolocalizacao');

    this.controlesEnderecoCobranca = this.getControles('enderecoCobranca');

    this.controlesTitular = Object.keys(
      (this.form.get('titular') as FormGroup).controls
    ).map((key) => ({
      key,
      value: (this.form.get('titular') as FormGroup).controls[key],
    }));
  }

  trackByKey(index: number, item: { key: string }): string {
    return item.key;
  }

  carregarDadosMock(): void {
    const beneficiario = MOCK_BENEFICIARIOS[0];
    this.form.patchValue({
      titular: beneficiario.titular,
      conjuge: beneficiario.conjuge,
      projetoAssentamento: beneficiario.projeto_assentamento[0],
      enderecoCobranca: beneficiario.endereco[0],
      titulacao: beneficiario.titulacao[0],
      concessao_credito: beneficiario.concessao[0],
      impedimento: beneficiario.bloqueios[0],
      unidadeFamiliar: beneficiario.dependentes[0],
      bloqueio: beneficiario.bloqueios[0],
      //enderecoCobranca: beneficiario.endereco[0],
      geolocalizacao: {
        latitude: this.latitude,
        longitude: this.longitude,
      },
    });
  }

  habilitarEdicao(): void {
    this.editando = true; // ✅ agora controla o estado dos botões
    Object.keys(this.form.controls).forEach((grupo) => {
      const grupoControl = this.form.get(grupo);
      if (grupoControl instanceof FormGroup) {
        Object.keys(grupoControl.controls).forEach((campo) => {
          if (!this.camposBloqueados.includes(campo)) {
            grupoControl.get(campo)?.enable();
          }
        });
      }
    });
  }

  salvar(): void {
    this.editando = false; // ✅ retorna estado inicial (salvar desabilitado, editar habilitado)
    Object.values(this.form.controls).forEach((control) => control.disable());
    console.log('✅ Dados salvos:', this.form.value);
  }

  getControles(grupo: string): { key: string; value: any }[] {
    const control = this.form.get(grupo);
    if (control instanceof FormGroup) {
      return Object.keys(control.controls).map((key) => ({
        key,
        value: control.controls[key],
      }));
    }
    return [];
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

  get mapaUrl(): string {
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyD3F-vl_X-PARA_EXEMPLO_APENAS&center=${this.latitude},${this.longitude}&zoom=13&maptype=roadmap`;
  }
}
