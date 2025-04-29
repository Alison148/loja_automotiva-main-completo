import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fechar-caixa',
  templateUrl: './fechar-caixa.component.html'
})
export class FecharCaixaComponent implements OnInit {
  vendasHoje: any[] = [];
  totalVendidoHoje: number = 0;
  totalItensVendidosHoje: number = 0;

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

    // Agora calcula total de dinheiro e total de itens
    this.totalVendidoHoje = this.vendasHoje.reduce((acc, venda) => acc + (venda.preco * venda.quantidade), 0);
    this.totalItensVendidosHoje = this.vendasHoje.reduce((acc, venda) => acc + venda.quantidade, 0);
  }

  fecharCaixa(): void {
    // Fecha o caixa e apaga as vendas de hoje
    localStorage.setItem('caixaAberto', 'false');

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
    })}\nTotal de itens vendidos: ${this.totalItensVendidosHoje}`);
  }
}
