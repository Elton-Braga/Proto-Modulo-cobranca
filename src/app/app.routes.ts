import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Lista } from './componentes/lista/lista';

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
  {
    path: '**', //Rota coringa ('**') → redirecionamento para a Home
    redirectTo: '',
    pathMatch: 'full',
  },
];
