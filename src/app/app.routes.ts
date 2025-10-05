import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full', // garante correspondência exata do caminho vazio
  },
  {
    path: '**', //Rota coringa ('**') → redirecionamento para a Home
    redirectTo: '',
    pathMatch: 'full',
  },
];
