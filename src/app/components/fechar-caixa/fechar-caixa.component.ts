import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fechar-caixa',
  templateUrl: './fechar-caixa.component.html'
})
export class FecharCaixaComponent implements OnInit {
  totalVendidoHoje: number = 0;
  vendasHoje: any[] = [];

  ngOnInit(): void {
    this.filtrarVendasDeHoje();
  }

  filtrarVendasDeHoje(): void {
    const todasVendas = JSON.parse(localStorage.getItem('vendas') || '[]');

    const hoje = new Date().toISOString().split('T')[0];

    this.vendasHoje = todasVendas.filter((venda: any) => {
      const dataVenda = new Date(venda.data).toISOString().split('T')[0];
      return dataVenda === hoje;
    });

    this.totalVendidoHoje = this.vendasHoje.reduce((acc, venda) => acc + venda.preco, 0);
  }

  fecharCaixa(): void {
    // Marca caixa como fechado
    localStorage.setItem('caixaAberto', 'false');

    // Remove apenas as vendas de hoje
    const todasVendas = JSON.parse(localStorage.getItem('vendas') || '[]');
    const hoje = new Date().toISOString().split('T')[0];

    const vendasRestantes = todasVendas.filter((venda: any) => {
      const dataVenda = new Date(venda.data).toISOString().split('T')[0];
      return dataVenda !== hoje;
    });

    localStorage.setItem('vendas', JSON.stringify(vendasRestantes));

    alert(`✅ Caixa fechado!\nTotal vendido hoje: ${this.totalVendidoHoje.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}`);
  }
}