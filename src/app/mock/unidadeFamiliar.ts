export interface UnidadeFamiliar {
  situacao_conjugal: string; // obrigatório
  data_uniao: any; // obrigatório
  data_separacao?: any; // opcional
  renda_familiar: number; // obrigatório, mínimo 0
  nome_dependente: string; // obrigatório
  tipo_dependente: string; // obrigatório
  nome: string; // obrigatório
  data_nascimento: any; // obrigatório
  data_entrada_na_familia: any; // obrigatório
  cpf_dependente: string; // obrigatório, 11 dígitos
  associacao_unidade_familiar: string; // obrigatório
}
