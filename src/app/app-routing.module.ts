import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { VendaComponent } from './components/venda/venda.component';
import { VendasRealizadasComponent } from './components/vendas-realizadas/vendas-realizadas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AbrirCaixaComponent } from './components/abrir-caixa/abrir-caixa.component';
import { FecharCaixaComponent } from './components/fechar-caixa/fechar-caixa.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'venda', component: VendaComponent },
  { path: 'vendas-realizadas', component: VendasRealizadasComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'abrir-caixa', component: AbrirCaixaComponent },
  { path: 'fechar-caixa', component: FecharCaixaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Página inicial como login
  { path: '**', redirectTo: 'login' } // Rota coringa
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
