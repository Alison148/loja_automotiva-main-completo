import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Importado aqui
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
import { AuthComponent } from './components/auth/auth.component';

// Corrigindo a importação do Chart.js
import { Chart } from 'chart.js';

// ✅ Importa o módulo onde o CupomFiscalComponent já está declarado
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
    AuthComponent // ✅ Incluído o AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Importado aqui para usar formGroup, formControlName, etc.
    CommonModule,
    AppRoutingModule,
    CupomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
