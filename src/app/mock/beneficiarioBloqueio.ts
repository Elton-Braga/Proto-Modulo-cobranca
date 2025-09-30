export interface BeneficiarioBloqueio {
  bloqueio: string;
  codigo_beneficiario: string;
  codigo_tipo_bloqueio: string;
  descricao_bloqueio: string;
  codigo_transacao: string;
  data_bloqueio: string; // pode ser Date se quiser converter
  codigo_sub_bloqueio: string;
  descricao_sub_bloqueio: string;
  codigo_motivo_bloqueio: string;
  descricao_motivo_bloqueio: string;
  desbloqueio_atendido: string;
  situacao_analise: string;
  data_resultado: string; // pode ser Date se quiser converter
  observacoes: string;
}
