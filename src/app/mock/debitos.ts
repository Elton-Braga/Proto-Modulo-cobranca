export interface Debitos {
  /** Informações gerais sobre o objeto do crédito */
  objetoCredito: string;

  /** Tipo da receita vinculada ao débito */
  tipoReceita: string;

  /** Valor inicialmente concedido ao beneficiário */
  valorConcedido: number;

  /** Condições e prazos de reembolso */
  prazosCondicoesReembolso: string;

  /** Regras legais específicas aplicáveis ao programa */
  regrasLegaisPrograma: string;

  /** Documentos relacionados */
  tituloDominio?: string;
  contrato?: string;
  termoAditivo?: string;
  outrosDocumentos?: string[];

  /** Descrição textual explicativa do objeto do crédito */
  descricaoObjeto: string;

  /** Condições gerais de cobrança */
  condicoesCobranca: string;

  /** Dados financeiros da receita */
  descricaoReceita: string;
  valorOriginal: number;
  numeroPrestacoes: number;
  saldoDevedor: number;
}
