export interface ParcelaPagamento {
  modalidade: string;
  codigoPlano: string;
  codigoParcela: string;
  numeroParcela: number;
  valorOriginal: number;
  correcaoAnual: number; // representar como taxa (ex.: 0.045 = 4.5%)
  valorRemissao: number;
  descontoConcedido: number;
  jurosMora: number;
  valorDevido: number;
  dataVencimento: string; // ISO date string (YYYY-MM-DD); trocar para Date se desejar
}
