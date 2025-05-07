import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vendas: any[] = [];

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];

    this.gerarGrafico();
  }

  gerarGrafico(): void {
    const vendasPorDia: { [data: string]: number } = {};

    for (const venda of this.vendas) {
      const dataFormatada = new Date(venda.data).toLocaleDateString('pt-BR');
      vendasPorDia[dataFormatada] = (vendasPorDia[dataFormatada] || 0) + venda.valor;
    }

    const labels = Object.keys(vendasPorDia);
    const valores = Object.values(vendasPorDia);

    new Chart('graficoVendas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '💰 Vendas por Dia (R$)',
          data: valores,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}