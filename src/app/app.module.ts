import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { VendaComponent } from './components/venda/venda.component';
import { VendasRealizadasComponent } from './components/vendas-realizadas/vendas-realizadas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AbrirCaixaComponent } from './components/abrir-caixa/abrir-caixa.component';
import { FecharCaixaComponent } from './components/fechar-caixa/fechar-caixa.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    EstoqueComponent,
    VendaComponent,
    VendasRealizadasComponent,
    DashboardComponent,
    AbrirCaixaComponent,
    FecharCaixaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
