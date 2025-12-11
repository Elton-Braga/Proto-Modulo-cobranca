import { BeneficiarioBloqueio } from './beneficiarioBloqueio';
import { ConcessaoCredito } from './concessaoCredito';
import { Conjuge } from './conjuge';
import { DadosDeCobranca } from './DadosDeCobranca';
import { Debitos } from './debitos';
import { EnderecoCobranca } from './enderecoCobranca';
import { HistoricoPNRA } from './HistoricoPNRA';
import { Lote } from './lote';
import { Observacoes } from './obsercacoes';
import { ParcelaPagamento } from './pagamento';
import { RequerimentoFiltro } from './requerimentoFiltro';
import { titulacao } from './titulacao';
import { Titular } from './titular';
import { UnidadeFamiliar } from './unidadeFamiliar';

export interface Beneficiario {
  titular: Titular;
  conjuge: Conjuge;
  dependentes: UnidadeFamiliar[];
  bloqueios: BeneficiarioBloqueio[];
  projeto_assentamento: Lote[];
  observacoes: Observacoes[];
  historico_PNRA: HistoricoPNRA[];
  requerimento: RequerimentoFiltro[];
  endereco: EnderecoCobranca[];
  dadosDeCobranca: DadosDeCobranca[];
  pagamento: ParcelaPagamento[];
  concessao: ConcessaoCredito[];
  titulacao: titulacao[];
  debitos: Debitos[];
}
