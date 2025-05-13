import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Importado aqui

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
import { AuthComponent } from './components/auth/auth.component';

// Chart.js
import { Chart } from 'chart.js';

// Cupom Fiscal Module
import { CupomModule } from './components/cupom-fiscal/cupom.module';

@NgModule({
  declarations: [ 
    AppComponent, 
    CadastroComponent,
    EstoqueComponent,
    VendaComponent,
    VendasRealizadasComponent,
    DashboardComponent,
    AbrirCaixaComponent,
    FecharCaixaComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule, // ✅ Adicionado aqui
    AppRoutingModule,
    CupomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
