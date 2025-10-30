export interface DadosDeCobranca {
  dataAssinaturaContrato: string; // Data da assinatura do contrato
  dataMovimentacao: string; // Data da movimentação financeira
  dataVencimento: any;
  valorContrato: number; // Valor total do contrato
  valorCredito: number; // Valor do crédito concedido
  valorNaoUtilizado: number; // Valor não utilizado pelo beneficiário
  valorUtilizado: number; // Valor efetivamente utilizado
  taxaPercentual: number; // Taxa de juros ou encargo em percentual
  carenciaMeses: number; // Período de carência em meses
  quantidadePrestacoes: number; // Número total de prestações
  saldo: number; // Saldo atual da dívida
  houveDescumprimentoRegras: boolean; // Indicador de descumprimento contratual
  rebateLiquidacaoAteVencimento: number; // Percentual de rebate até o vencimento
  rebateLiquidacaoAposVencimento: number; // Percentual de rebate após o vencimento
  modalidade: string;
}
