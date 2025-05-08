import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  vendas: any[] = [];

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
  }

  ngAfterViewInit(): void {
    this.createProductSalesChart();
  }

  // Gráfico de Vendas por Produto (Linha)
  createProductSalesChart() {
    const vendasPorProduto: { [produto: string]: number } = {};

    // Agrupar vendas por produto
    for (const venda of this.vendas) {
      const produto = venda.produto || 'Produto Desconhecido'; // Nome do produto da venda
      vendasPorProduto[produto] = (vendasPorProduto[produto] || 0) + venda.valor;
    }

    const labels = Object.keys(vendasPorProduto);
    const valores = Object.values(vendasPorProduto);

    new Chart('graficoVendasProduto', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Vendas por Produto (R$)',
          data: valores,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(17, 0, 248, 0.2)',
          fill: true,
          tension: 0.3 // Suavidade na linha
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          title: {
            display: true,
            text: 'Vendas por Produto'
          }
        }
      }
    });
  }
}
