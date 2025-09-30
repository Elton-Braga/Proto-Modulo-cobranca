export interface Titular {
  nome: string;
  cod_beneficiario: string;
  cpf: string;
  data_nascimento: Date | null;
  estado_civil?: string;
  sexo: string;
  nome_pai?: string;
  nome_mae?: string;
  nacionalidade?: string;
  naturalidade?: string;
  numero_documento?: string;
  numero_nis?: string;
  telefone: string;
  email: string;
  numero_processo: string;
  data_processo: Date | null;
  data_homologacao: Date | null;
}
