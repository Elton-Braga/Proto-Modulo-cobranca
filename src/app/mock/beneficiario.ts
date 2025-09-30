import { BeneficiarioBloqueio } from './beneficiarioBloqueio';
import { Conjuge } from './conjuge';
import { HistoricoPNRA } from './HistoricoPNRA';
import { Lote } from './lote';
import { Observacoes } from './obsercacoes';
import { RequerimentoFiltro } from './requerimentoFiltro';
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
}
