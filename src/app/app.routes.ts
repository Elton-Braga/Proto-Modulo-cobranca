import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Lista } from './componentes/lista/lista';
import { CadastroConcessoes } from './componentes/cadastro-concessoes/cadastro-concessoes';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full', // garante correspondência exata do caminho vazio
  },
  {
    path: 'lista', // rota para acessar o componente Lista
    component: Lista,
  },
  { path: 'cadastro-concessoes', component: CadastroConcessoes },
  {
    path: '**', //Rota coringa ('**') → redirecionamento para a Home
    redirectTo: '',
    pathMatch: 'full',
  },
];
