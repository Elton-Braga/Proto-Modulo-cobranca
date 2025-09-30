export interface RequerimentoFiltro {
  //check: any;
  numerosDoRequerimento: string[];
  dataRequerimento: Date | string;
  codigoBeneficiario: string;
  cpfBeneficiario: string;
  nomeBeneficiario: string;
  solicitante: string;
  sr: string;
  uf: string;
  projetoAssentamento: string;
  tipoDeServico: string;
  perfilDoSolicitante: string;
  status: string;
  detalhar: string;
}
