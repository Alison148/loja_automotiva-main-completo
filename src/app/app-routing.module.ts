import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { VendaComponent } from './components/venda/venda.component';
import { VendasRealizadasComponent } from './components/vendas-realizadas/vendas-realizadas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AbrirCaixaComponent } from './components/abrir-caixa/abrir-caixa.component';
import { FecharCaixaComponent } from './components/fechar-caixa/fechar-caixa.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent }, // Página inicial - login
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard] },
  { path: 'venda', component: VendaComponent, canActivate: [AuthGuard] },
  { path: 'vendas-realizadas', component: VendasRealizadasComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'abrir-caixa', component: AbrirCaixaComponent, canActivate: [AuthGuard] },
  { path: 'fechar-caixa', component: FecharCaixaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // Rota coringa redireciona para login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
