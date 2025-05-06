import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-realizadas',
  templateUrl: './vendas-realizadas.component.html',
  styleUrls: ['./vendas-realizadas.component.css']
})
export class VendasRealizadasComponent implements OnInit {
  vendas: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.vendas.reduce((soma, venda) => soma + venda.subtotal, 0);
  }

  limparVendas(): void {
    if (confirm('Tem certeza que deseja apagar todas as vendas?')) {
      localStorage.removeItem('vendasRealizadas');
      this.vendas = [];
      this.total = 0;

      // Se tiver gráfico, chame o método aqui também
      // this.gerarGraficoLinha();
    }
  }
}
