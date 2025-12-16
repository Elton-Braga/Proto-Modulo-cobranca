export interface Debitos {
  /** Informações gerais sobre o objeto do crédito */
  objetoCredito: string;

  /** Tipo da receita vinculada ao débito */
  tipoReceita: string;

  /** Descrição da receita */
  descricaoReceita: string;

  /** Valor inicialmente concedido ao beneficiário */
  valorConcedido: number;

  /** Valor original do débito */
  valorOriginal: number;

  /** Número de prestações */
  numeroPrestacoes: number;

  /** Saldo devedor */
  saldoDevedor: number;

  /** Número de referência */
  numeroReferencia: string;

  /** Nosso número */
  nossoNumero: string;

  /** Número de referência antigo */
  numeroRefAntigo: string;

  /** Prestação atual */
  prestacao: string;

  /** Vencimento original */
  vencimentoOriginal: string;

  /** Data para pagamento */
  dataParaPagamento: string;

  /** Valor principal */
  valorPrincipal: number;

  /** Correção monetária */
  correcao: number;

  /** Índice de correção */
  indice: string;

  /** Mês/ano de referência */
  mesAno: string;

  /** Coeficiente de correção */
  coeficiente: number;

  /** Valor corrigido */
  valorCorrigido: number;

  /** Multa aplicada */
  multa: number;

  /** Juros de mora */
  jurosMora: number;

  /** Valor com encargos */
  valorComEncargos: number;

  /** Valor total da prestação */
  valorTotalPrestacao: number;

  /** Data de entrega da GRU */
  dataEntregaGRU: string;

  /** Forma de entrega da GRU */
  formaEntregaGRU: string;

  /** Motivo de não entrega da GRU */
  motivoNaoEntregaGRU: string;

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
}
