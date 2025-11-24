import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login/login.component').then(c => c.LoginComponent)
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes.component').then(c => c.ClientesComponent)
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/pedidos/pedidos.component').then(c => c.PedidosComponent)
      },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
