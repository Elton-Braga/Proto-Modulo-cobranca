export interface Debitos {
  objetoCredito: string;
  tipoReceita: string;
  descricaoReceita: string;
  valorConcedido: number;
  valorOriginal: number;
  numeroPrestacoes: number;
  saldoDevedor: number;
  numeroReferencia: string;
  nossoNumero: string;
  numeroRefAntigo: string;
  prestacao: string;
  vencimentoOriginal: string;
  dataParaPagamento: string;
  valorPrincipal: number;
  correcao: number;
  indice: string;
  mesAno: string;
  coeficiente: number;
  valorCorrigido: number;
  multa: number;
  jurosMora: number;
  valorComEncargos: number;
  valorTotalPrestacao: number;
  dataEntregaGRU: string;
  formaEntregaGRU: string;
  motivoNaoEntregaGRU: string;
  prazosCondicoesReembolso: string;
  regrasLegaisPrograma: string;
  tituloDominio?: string;
  contrato?: string;
  termoAditivo?: string;
  outrosDocumentos?: string[];
  descricaoObjeto: string;
  condicoesCobranca: string;
  moeda: string;
  juros: number; // juros (diferente de jurosMora)
  desconto: number;
  remissao: number;
  credito: number;
  valorDevido: number; // pode ser diferente de valorTotalPrestacao?
  moedaFinal: string;
  baixado: string; // ou boolean, mas no template estamos exibindo string
  numeroAvisoBaixa: string;
  tipoBaixa: string;
  prestacaoUnica: string;
  dataBaixa: string;
}
