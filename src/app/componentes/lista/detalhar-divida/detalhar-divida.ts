import { Component, createPlatform, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConsultarDivida } from '../consultar-divida/consultar-divida';
import { MOCK_BENEFICIARIOS } from '../../../mock/MOCK_BENEFICIATIO';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Beneficiario } from '../lista';

@Component({
  selector: 'app-detalhar-divida',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detalhar-divida.html',
  styleUrls: ['./detalhar-divida.scss'],
})
export class DetalharDivida implements OnInit {
  editando = false;
  form!: FormGroup;
  latitude = -22.88587129197667;
  longitude = -42.23844749254404;

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ✅ Inicialização dos grupos com controle do estado (disabled)
    this.form = this.fb.group({
      titular: this.fb.group({
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
        data_entrada_processo: new FormControl({ value: '', disabled: true }),
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
      }),

      unidadeFamiliar: this.fb.group({
        situacao_conjugal: new FormControl({ value: '', disabled: true }),
        data_uniao: new FormControl({ value: '', disabled: true }),
        data_separacao: new FormControl({ value: '', disabled: true }),
        renda_familiar: new FormControl({ value: '', disabled: true }),
        nome_dependente: new FormControl({ value: '', disabled: true }),
        tipo_dependente: new FormControl({ value: '', disabled: true }),
        nome: new FormControl({ value: '', disabled: true }),
        data_nascimento: new FormControl({ value: '', disabled: true }),
        data_entrada_na_familia: new FormControl({ value: '', disabled: true }),
        cpf_dependente: new FormControl({ value: '', disabled: true }),
        telefone: new FormControl({ value: '', disabled: true }),
        associacao_unidade_familiar: new FormControl({
          value: '',
          disabled: true,
        }),
      }),
      projetoAssentamento: this.fb.group({
        nome_projeto: new FormControl({ value: '', disabled: true }),
        codigo_projeto: new FormControl({ value: '', disabled: true }),
        agrovila_contato: new FormControl({ value: '', disabled: true }),
        codigo_contato: new FormControl({ value: '', disabled: true }),
        lote_individual_contato: new FormControl({ value: '', disabled: true }),
        numero_lote: new FormControl({ value: '', disabled: true }),
        nome_lote: new FormControl({ value: '', disabled: true }),
        estado: new FormControl({ value: '', disabled: true }),
        municipio: new FormControl({ value: '', disabled: true }),
        codigo_municipio: new FormControl({ value: '', disabled: true }),
        gleba: new FormControl({ value: '', disabled: true }),
        area: new FormControl({ value: '', disabled: true }),
        regularizacao_fundiaria: new FormControl({ value: '', disabled: true }),
      }),

      bloqueio: this.fb.group({
        bloqueio: new FormControl({ value: '', disabled: true }),
        codigo_beneficiario: new FormControl({ value: '', disabled: true }),
        codigo_tipo_bloqueio: new FormControl({ value: '', disabled: true }),
        descricao_bloqueio: new FormControl({ value: '', disabled: true }),
        codigo_transacao: new FormControl({ value: '', disabled: true }),
        data_bloqueio: new FormControl({ value: '', disabled: true }),
        codigo_sub_bloqueio: new FormControl({ value: '', disabled: true }),
        descricao_sub_bloqueio: new FormControl({ value: '', disabled: true }),
        descricao_motivo_bloqueio: new FormControl({
          value: '',
          disabled: true,
        }),
        desbloqueio_atendido: new FormControl({ value: '', disabled: true }),
        situacao_analise: new FormControl({ value: '', disabled: true }),
        data_resultado: new FormControl({ value: '', disabled: true }),
        observacoes: new FormControl({ value: '', disabled: true }),
      }),
      geolocalizacao: this.fb.group({
        latitude: new FormControl({ value: this.latitude, disabled: true }),
        longitude: new FormControl({ value: this.longitude, disabled: true }),
      }),
      enderecoCobranca: this.fb.group({
        estado: new FormControl({ value: '', disabled: true }),
        municipio: new FormControl({ value: '', disabled: true }),
        bairro: new FormControl({ value: '', disabled: true }),
        logradouro: new FormControl({ value: '', disabled: true }),
        complemento: new FormControl({ value: '', disabled: true }),
        cep: new FormControl({ value: '', disabled: true }),
        numero: new FormControl({ value: '', disabled: true }),
      }),
      impedimento: this.fb.group({
        bloqueio: new FormControl({ value: '', disabled: true }),
        motivo_bloqueio: new FormControl({ value: '', disabled: true }),
      }),
      titulacao: this.fb.group({
        n_processo: new FormControl({ value: '', disabled: true }),
        doc_titulacao: new FormControl({ value: '', disabled: true }),

        tituloCancelado: new FormControl({ value: '', disabled: true }),
        valorPrimeiraPrestacao: new FormControl({ value: '', disabled: true }),
        vencimentoPrimeiraPrestacao: new FormControl({
          value: '',
          disabled: true,
        }),
        condicaoPagamento: new FormControl({ value: '', disabled: true }),
        numeroPrestacoes: new FormControl({ value: '', disabled: true }),
        municipioSedeImovel: new FormControl({ value: '', disabled: true }),
        tipoTermoAditivo: new FormControl({ value: '', disabled: true }),
      }),

      concessao_credito: this.fb.group({
        n_processo: new FormControl({ value: '', disabled: true }),
        modalidade: new FormControl({ value: '', disabled: true }),
      }),

      observacao: this.fb.group({
        observacao: new FormControl({ value: '', disabled: true }),
      }),
    });

    // ✅ Preenche os dados (mock)
    this.carregarDadosMock();
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
